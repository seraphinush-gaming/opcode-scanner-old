module.exports = packet => {
  let prev = null;

  if (packet.mapped['S_DUNGEON_COOL_TIME_LIST']) {
    prev = packet.prev('S_DUNGEON_COOL_TIME_LIST');

    return prev &&
      packet.time - prev.time < 200 &&
      packet.index - prev.index === 2;
  }

  prev = packet.prev('S_LOGIN');

  if (!prev) {
    return false;
  }

  if (packet.parsed.pid === prev.parsed.playerId) {
    for (let i = 0; i < packet.parsed.dungeons.length; i++) {
      let dungeon = packet.parsed.dungeons[0]

      if (dungeon.clears < 5 && dungeon.rookie === 1) {
        return false;
      }

      if (dungeon.clears > 5 && dungeon.rookie === 0) {
        return false;
      }
    }

    return true;
  }

  return false;
}