module.exports = packet => {
  if (!packet.mapped['S_LOGIN']) {
    return false;
  }

  if (packet.mapped['C_BLOCK_USER']) {
    let prev = packet.prev('C_BLOCK_USER');

    return prev &&
      packet.time - prev.time < 200 &&
      packet.parsed.level <= 70 &&
      packet.parsed.class <= 12 &&
      packet.parsed.name === prev.parsed.name &&
      packet.parsed.myNote.length >= 0;
  } else {
    return packet.parsed.level <= 70 &&
      packet.parsed.class <= 12 &&
      packet.parsed.myNote.length >= 0;
  }
}