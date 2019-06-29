module.exports = packet => {
  let prev = packet.prev('S_LOGIN');

  return prev &&
    packet.parsed.curHp === packet.parsed.maxHp &&
    packet.parsed.target === prev.parsed.gameId;
}