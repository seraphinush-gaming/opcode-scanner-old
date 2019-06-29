module.exports = pak => {
	let prev = pak.prev('C_SELECT_USER')

	return prev && pak.parse() && pak.parsed.playerId === prev.parsed.id
}