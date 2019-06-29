module.exports = packet => {
	let prev = packet.prev()

	return prev && prev.name() === 'C_GET_USER_LIST';
}