module.exports = packet => { // 13
  if (!packet.mapped['S_ACTION_STAGE']) {
    return false;
  }

  let prev = packet.prev('S_ACTION_STAGE');

  return prev &&
    (packet.parsed.owner !== 0 ? packet.parsed.owner : packet.parsed.source) === prev.parsed.gameId &&
    packet.parsed.templateId === prev.parsed.templateId &&
    packet.parsed.skill === prev.parsed.skill &&
    packet.parsed.id === prev.parsed.id;
}