module.exports = packet => { // 2
  let prev = packet.prev('C_CREATE_PRIVATE_CHANNEL');

  if (prev) {
    return packet.parsed.index >= 0 &&
      packet.parsed.index <= 7 &&
      packet.parsed.name === prev.parsed.name;
  } else {
    return packet.parsed.index >= 0 &&
      packet.parsed.index <= 7;
  }
}