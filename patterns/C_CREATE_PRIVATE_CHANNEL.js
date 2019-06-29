module.exports = packet => {
  let next = packet.next('S_JOIN_PRIVATE_CHANNEL');

  if (next) {
    return packet.parsed.name === next.parsed.name;
  } else {
    return packet.parsed.password === 1234;
  }
}