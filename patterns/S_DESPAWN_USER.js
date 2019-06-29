module.exports = packet => { // 3
  if (!packet.mapped['S_CHANGE_RELATION']) {
    return false;
  }

  if (packet.parsed.type > 1) {
    return false;
  }

  for (let i = packet.index - 1; i >= 0; i--) {
    let prev = packet.history[i]

    if (prev.name() === 'S_SPAWN_USER' &&
      packet.parsed.gameId === prev.parsed.gameId) {
      return true;
    }
  }

  return false;
}