module.exports = packet => {
    if (!packet.mapped['S_DUNGEON_COOL_TIME_LIST'] ||
        !packet.mapped['S_DUNGEON_CLEAR_COUNT_LIST']) {
        return false;
    }

    let s_cool_time = packet.next('S_DUNGEON_COOL_TIME_LIST'),
        s_clear_count = packet.next('S_DUNGEON_CLEAR_COUNT_LIST'),
        prev = packet.prev('S_LOGIN');

    return s_cool_time &&
        s_clear_count &&
        s_cool_time.index - packet.index === 2 &&
        s_clear_count.index - packet.index === 4 &&
        packet.parsed.name === prev.parsed.name;
}