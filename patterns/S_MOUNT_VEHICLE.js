module.exports = packet => {
  let prev = packet.prev('S_SPAWN_ME');

  return prev &&
    packet.parsed.skill === 117003 &&
    packet.parsed.gameId === prev.parsed.gameId;
}