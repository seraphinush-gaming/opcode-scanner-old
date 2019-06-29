module.exports = packet => { // 5
  if (!packet.mapped['S_ACTION_STAGE']) {
    return false;
  }

  let prev = packet.prev('S_ACTION_STAGE');

  return prev &&
    packet.parsed.gameId === prev.parsed.gameId &&
    packet.parsed.skill.id === prev.parsed.skill.id &&
    packet.parsed.id === prev.parsed.id
}