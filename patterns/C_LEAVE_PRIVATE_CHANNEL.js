module.exports = packet => {
  let prev = packet.prev('S_JOIN_PRIVATE_CHANNEL');

  return prev &&
    packet.parsed.index <= 7 &&
    packet.parsed.index === prev.parsed.index;
}