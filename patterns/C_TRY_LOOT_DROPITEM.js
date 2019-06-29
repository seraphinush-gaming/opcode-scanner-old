module.exports = packet => { // 4
  if (!packet.mapped['S_SPAWN_DROPITEM']) {
    return false;
  }

  for (let i = packet.index - 1; i >= 0; i--) {
    let prev = packet.history[i]

    if (prev.name() === 'S_SPAWN_DROPITEM' &&
      packet.parsed.gameId === prev.parsed.gameId) {
      return true;
    }
  }

  return false;
}