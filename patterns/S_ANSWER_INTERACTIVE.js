module.exports = packet => { // 2
  let prev = packet.prev('S_LOGIN');

  return prev &&
    packet.model > 10000 &&
    packet.parsed.level <= 70 &&
    packet.parsed.serverId === prev.parsed.serverId;
}