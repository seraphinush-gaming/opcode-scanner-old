module.exports = packet => {
	let prev = packet.prev();

	return prev &&
		prev.name() === 'S_LOGIN_ACCOUNT_INFO' &&
		packet.parsed.range >= 1000 &&
		packet.parsed.range <= 2500;
}