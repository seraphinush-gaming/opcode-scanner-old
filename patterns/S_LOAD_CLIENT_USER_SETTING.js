module.exports = packet => { // 1
	let prev = packet.prev();

	return prev && 
		prev.name() === 'S_LOAD_CLIENT_ACCOUNT_SETTING';
}