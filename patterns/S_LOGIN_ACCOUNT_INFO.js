module.exports = packet => {
  let prev = packet.prev();

  return prev &&
    prev.name() === 'S_LOGIN_ARBITER' &&
    packet.parsed.serverName.endsWith('GameDB');
}