module.exports = packet => { // 3
  let prev = packet.prev('S_LOGIN');

  return prev &&
    packet.parsed.channel >>> 0 < 300 &&
    packet.parsed.gameId === prev.parsed.gameId &&
    packet.parsed.name == prev.parsed.name &&
    packet.parsed.message.startsWith('<FONT');
}