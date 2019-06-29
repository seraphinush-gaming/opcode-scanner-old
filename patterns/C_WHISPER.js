module.exports = packet => { // 1
  let prev = packet.prev('S_LOGIN');

  if (!prev || !packet.mapped['S_WHISPER']) {
    return false;
  }

  for (let i = packet.index + 1; i < packet.history.length; i++) {
    let next = packet.history[i];

    if (next.name() === 'S_WHISPER' &&
      packet.parsed.message === next.parsed.message) {
      return true;
    }
  }

  return false;
}