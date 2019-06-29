module.exports = packet => { // 3
  let prev = packet.prev('S_LOGIN');

  return prev &&
    packet.parsed.source === prev.parsed.gameId &&
    packet.parsed.stacks === 1 &&
    packet.parsed.unk3 === 0;
}