module.exports = packet => {
	let next = packet.next();

	return next && next.name() === 'S_PREPARE_RETURN_TO_LOBBY';
}