module.exports = packet => {
  if (!packet.mapped['S_ABNORMALITY_BEGIN']) {
    return false;
  }

  let prev = packet.prev('S_ABNORMALITY_BEGIN');

  return prev &&
    packet.parsed.target === prev.parsed.target &&
    packet.parsed.id == prev.parsed.id;
}