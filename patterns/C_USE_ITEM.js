module.exports = packet => { // 3
  let prev = packet.prev('S_LOGIN');

  return prev &&
    packet.parsed.gameId === prev.parsed.gameId &&
    packet.parsed.amount === 1 &&
    packet.parsed.unk4;
}