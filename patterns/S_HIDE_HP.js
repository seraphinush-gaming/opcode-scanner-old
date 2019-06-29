module.exports = packet => { // 2
  let prev = packet.prev();

  return prev.name() === 'S_CHANGE_RELATION' &&
    packet.parsed.gameId === prev.parsed.target;
}