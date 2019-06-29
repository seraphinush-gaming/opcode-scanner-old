module.exports = packet => {
	let prev = packet.prev();

	return prev &&
		prev.name() === 'S_REQUEST_SECOND_PASSWORD_AUTH';
		// && /^[0-9a-f]{512}$/.test(packet.parsed.hash);
}