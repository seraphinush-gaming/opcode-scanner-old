module.exports = packet => { // 18
  let prev = packet.prev('S_LOGIN');

  return prev &&
    packet.order - prev.order <= 2 &&
    packet.parsed.gameId === prev.parsed.gameId;
}