module.exports = packet => { // 13
  let prev = packet.prev('C_SELECT_USER');

  return prev &&
    packet.parsed.playerId === prev.parsed.id;
}