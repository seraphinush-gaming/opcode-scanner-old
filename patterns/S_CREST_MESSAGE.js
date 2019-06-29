module.exports = packet => {
  if (!packet.mapped['C_START_SKILL']) {
    return false;
  }

  let prev = packet.prev('C_START_SKILL');

  return prev &&
    packet.parsed.unk === 0 &&
    packet.parsed.type === 6
}