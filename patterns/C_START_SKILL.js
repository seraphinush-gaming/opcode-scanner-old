module.exports = packet => { // 7
  let prev = packet.prev('C_PLAYER_LOCATION');

	return prev &&
		packet.parsed.skill.id === 60100 && // backstep
		typeof packet.parsed.unk == 'boolean' &&
		dist3D(packet.parsed.loc, prev.parsed.loc) < 250;
}

function dist3D(loc1, loc2) {
	return Math.sqrt(Math.pow(loc2.x - loc1.x, 2) + Math.pow(loc2.y - loc1.y, 2) + Math.pow(loc2.z - loc1.z, 2));
}