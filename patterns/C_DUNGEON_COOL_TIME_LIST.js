module.exports = packet => {
  if (!packet.mapped['C_DUNGEON_CLEAR_COUNT_LIST'] ||
    !packet.mapped['S_DUNGEON_COOL_TIME_LIST'] ||
    !packet.mapped['S_DUNGEON_CLEAR_COUNT_LIST']) {
    return false;
  }

  let c_clear_count = packet.next('C_DUNGEON_CLEAR_COUNT_LIST'),
    s_cool_time = packet.next('S_DUNGEON_COOL_TIME_LIST'),
    s_clear_count = packet.next('S_DUNGEON_CLEAR_COUNT_LIST');

  return c_clear_count &&
    s_cool_time &&
    s_clear_count &&
    c_clear_count.index - packet.index === 2 &&
    s_cool_time.index - packet.index === 4 &&
    s_clear_count.index - packet.index === 6;
}