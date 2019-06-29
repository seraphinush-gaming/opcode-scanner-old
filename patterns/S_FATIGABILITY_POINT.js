module.exports = packet => {
  let prev = packet.prev('S_LOAD_TOPO');

  return prev &&
    packet.parsed.maxPp >= 4000 &&
    packet.parsed.curPp <= packet.parsed.maxPp;
}