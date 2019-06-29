module.exports = packet => {  // 2
  let prev = packet.prev('S_ANSWER_INTERACTIVE');

  return prev &&
    prev.index - packet.index < 5 &&
    packet.parsed.unk === 1 &&
    prev.parsed.name == packet.parsed.name &&
    prev.parsed.serverId == packet.parsed.serverId;
}