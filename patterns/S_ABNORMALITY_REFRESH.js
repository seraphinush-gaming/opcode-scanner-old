module.exports = packet => { // 1
  if (!packet.mapped['S_ABNORMALITY_BEGIN']) {
    return false;
  }

  let prev = packet.prev('S_ABNORMALITY_BEGIN');

  return prev &&
    packet.parsed.target === prev.parsed.target &&
    packet.parsed.id === prev.parsed.id &&
    packet.parsed.duration >= prev.parsed.duration;
}