module.exports = packet => {
	let prev = packet.prev('S_CURRENT_CHANNEL');

	return prev &&
		packet.parsed.unk === 1 &&
		packet.parsed.zone === prev.parsed.zone;
}