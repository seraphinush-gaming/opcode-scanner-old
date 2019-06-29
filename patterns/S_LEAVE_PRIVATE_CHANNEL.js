module.exports = packet => {
  if (!packet.mapped['S_JOIN_PRIVATE_CHANNEL']) {
    return false;
  }

  let prev = packet.prev('S_JOIN_PRIVATE_CHANNEL');

  return prev &&
    packet.parsed.channelId === prev.parsed.channelId;
}