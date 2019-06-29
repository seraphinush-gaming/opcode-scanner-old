module.exports = packet => {
  if (!packet.mapped['S_SPAWN_NPC']) {
    return false;
  }

  if (packet.parsed.time === 0) {
    return false;
  }

  for (let i = packet.history.length - 1; i > 20; i--) {
    let prev = packet.history[i];

    if (prev.parse() && prev.name() === 'S_SPAWN_NPC' &&
      packet.parsed.gameId === prev.parsed.gameId) {
      return true;
    }
  }

  return false;
}