module.exports = packet => { // 1
  let prev = packet.prev('S_SPAWN_ME');

  return prev &&
    packet.parsed.name.startsWith('ylennia') &&
    packet.parsed.message.length > 3;
}