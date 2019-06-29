module.exports = packet => { // 9
  let prev = packet.prev('S_LOGIN');

  return prev &&
    packet.parsed.gameId === prev.parsed.gameId &&
    packet.parsed.templateId === prev.parsed.templateId;
}