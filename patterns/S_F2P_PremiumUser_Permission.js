module.exports = packet => {
  return packet.prev('S_MY_DESCRIPTION') &&
  packet.parsed.unk3 === 16256 &&
    packet.parsed.unk5 === 16256;
}