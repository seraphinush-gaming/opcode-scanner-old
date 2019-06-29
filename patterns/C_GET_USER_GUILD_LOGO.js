module.exports = packet => {
  let next = packet.next();

  return next &&
    next.name() === 'S_GET_USER_GUILD_LOGO' &&
    packet.parsed.playerId === next.parsed.playerId &&
    packet.parsed.guildId === next.parsed.guildId;
}

/* module.exports = packet => {
	let prev = packet.prev('S_GET_USER_LIST');

	if (!prev || !packet.parse()) {
		return false;
	}

	for (let character of prev.parsed.characters) {
		if (packet.parsed.playerId === character.id && packet.parsed.guildId === character.guildId) {
			return true;
		}
	}

	return false;
} */