module.exports = packet => {
  let prev = packet.prev('S_LOAD_TOPO');

  return prev &&
    packet.parsed.zone === prev.parsed.zone &&
    packet.parsed.channel >>> 0 < 50 &&
    packet.parsed.density >>> 0 < 3 &&
    packet.parsed.type >= 1 && packet.parsed.type <= 3;
}