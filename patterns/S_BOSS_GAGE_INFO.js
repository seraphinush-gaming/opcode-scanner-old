module.exports = packet => { // 3
  if (!packet.mapped['S_SPAWN_NPC']) {
    return false;
  }

  return packet.parsed.curHp <= packet.parsed.maxHp &&
    packet.parsed.unk3 === 1;
}