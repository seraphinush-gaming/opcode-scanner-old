module.exports = packet => { // 3
  let prev;

  if (packet.mapped['S_BOSS_GAGE_INFO']) {
    prev = packet.prev('S_BOSS_GAGE_INFO');

    return prev &&
      packet.parsed.gameId === prev.parsed.id &&
      (packet.parsed.type === 1 || packet.parsed.type === 5) &&
      packet.parsed.unk === 0;
  }
  else if (packet.mapped['S_CREATURE_CHANGE_HP']) {
    prev = packet.prev('S_CREATURE_CHANGE_HP');

    return prev &&
      packet.parsed.gameId === prev.parsed.target &&
      (packet.parsed.type === 1 || packet.parsed.type === 5) &&
      packet.parsed.unk === 0;
  }

  return false;
}