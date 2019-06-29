module.exports = packet => { // 4
  let prev = null;

  if (packet.mapped['C_HIT_USER_PROJECTILE']) {
    prev = packet.prev('C_HIT_USER_PROJECTILE')
    return prev &&
      packet.parsed.id === prev.parsed.id;
  } else {
    prev = packet.prev('S_START_USER_PROJECTILE')
    return prev &&
      packet.parsed.id === prev.parsed.id;
  }
}