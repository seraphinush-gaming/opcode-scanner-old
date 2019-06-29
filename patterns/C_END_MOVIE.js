module.exports = packet => { // 1
	let prev = packet.prev('S_PLAY_MOVIE');

	return prev &&
		packet.parsed.movie === prev.parsed.movie;
}