module.exports = packet => {
  if (!packet.mapped['S_CHAT'] ||
    packet.parsed.channel >>> 0 >= 300) {
    return false;
  }

  for (let i = packet.index + 1; i < packet.history.length; i++) {
    let next = packet.history[i];

    if (next.name() === 'S_CHAT' &&
      next.time - packet.time < 500 &&
      packet.parsed.channel === next.parsed.channel &&
      packet.parsed.message === next.parsed.message) {
      return true;
    }
  }

  return false;
}