module.exports = pak => {
	let prev = pak.prev('S_LOGIN')

	return prev && pak.parse() && pak.parsed.id.equals(prev.parsed.cid)
}