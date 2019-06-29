module.exports = packet => { // 1
  let prev = packet.prev('C_LIST_CHANNEL');

  return prev &&
    packet.parsed.unk === 1 &&
    packet.parsed.zone === prev.parsed.zone &&
    packet.parsed.channels.every(c => c.density >>> 0 < 3);
}