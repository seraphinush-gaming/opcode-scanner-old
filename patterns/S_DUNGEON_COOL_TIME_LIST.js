module.exports = packet => {
  if (!packet.mapped['S_DUNGEON_CLEAR_COUNT_LIST']) {
    return false;
  }

  let next = packet.next('S_DUNGEON_CLEAR_COUNT_LIST');

  return next &&
    next.time - packet.time < 100 &&
    next.index - packet.index === 2;
}