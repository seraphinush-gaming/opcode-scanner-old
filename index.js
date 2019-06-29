const fs = require('fs'),
	path = require('path'),
	{protocol} = require('tera-data-parser')

class PacketInfo {
	constructor(info) {
		Object.assign(this, info)
	}

	parse() {
		this.triedParse = true
		this.parsed = null
		this.parsedLength = 0

		let name = this.parseName || this.name(),
			msg = protocol.messages.get(name)

		if(msg)
			try {
				msg = msg.get(Math.max(...msg.keys()))

				this.parsed = protocol.parse(this.version, msg, this.data, name)
				this.parsedLength = protocol.write(this.version, msg, '*', this.parsed, null, name, this.code).length
			}
			catch(e) {}

		if(this.parsed) return true

		this.parsed = null
		this.parsedLength = 0
		return false
	}

	first(name) {
		for(let packet of this.history)
			if(packet.name() === name)
				return packet
	}

	prev(name) {
		if(!name) return this.history[this.index - 1]

		for(let i = this.index - 1; i >= 0; i--) {
			let packet = this.history[i]

			if(packet.name() === name)
				return packet
		}
	}

	name() {
		return this.map[this.code]
	}
}

module.exports = function OpcodeScanner(dispatch) {
	let patterns = {}

	{
		let files = fs.readdirSync(path.join(__dirname, 'patterns')).filter(name => name.endsWith('.js'))

		for(let name of files) patterns[name.slice(0, name.indexOf('.'))] = require('./patterns/' + name)
	}

	console.log('Opcode scanner initialized, loaded ' + Object.keys(patterns).length + ' pattern(s).')

	let version = 0,
		map = {},
		history = [],
		index = 0,
		clientOrder = 0,
		serverOrder = 0

	dispatch.hook('*', 'raw', {order: -999999999}, (code, data, fromServer) => {
		version = dispatch.base.protocolVersion

		let info = new PacketInfo({
			code,
			data,
			fromServer,
			version,
			map,
			history,
			index,
			order: fromServer ? serverOrder : clientOrder,
			time: Date.now()
		})

		history.push(info)

		if(map[code]) info.parse()
		else scan(info)

		index++
		if(fromServer) serverOrder++
		else clientOrder++
	})

	function scan(info) {
		for(let name in patterns)
			if(name.startsWith(info.fromServer ? 'S_' : 'C_')) {
				info.parseName = name

				if(patterns[name](info)) {
					if(!info.triedParse) info.parse()

					if(info.parsedLength === info.data.length) {
						console.log('Opcode found: ' + name + ' = ' + info.code)
						map[info.code] = name
						writeMap()
						delete patterns[name]
						break
					}
					else console.log('Pattern matches but length is wrong: ' + name + ' = ' + info.code + ', ' + info.parsedLength + ' != ' + info.data.length)
				}

				delete info.parseName
				delete info.triedParse
			}
	}

	function writeMap() {
		let out = []

		for(let code in map) out.push([map[code], code])
		out.sort((a, b) => a[0] - b[0])
		for(let i in out) out[i] = out[i].join(' = ')

		fs.writeFileSync(path.join(__dirname, 'protocol.' + version + '.map'), out.join('\n'))
	}
}