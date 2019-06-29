module.exports = pak => {
	let prev = pak.prev('C_GET_USER_GUILD_LOGO')

	return prev && pak.parse() && pak.parsed.playerId == prev.parsed.playerId && pak.parsed.guildId == prev.parsed.guildId
}