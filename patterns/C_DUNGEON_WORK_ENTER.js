module.exports = packet => {
  return packet.parsed.count <= 2 &&
    (packet.parsed.unk1 === 0 || packet.parsed.unk1 === 13) &&
    packet.parsed.random === 0 &&
    packet.parsed.unk2 === 13 &&
    (packet.parsed.unk3 === 0 || packet.parsed.unk2 === 21) &&
    packet.parsed.challenge1 <= 3 &&
    packet.parsed.unk4 === 21 &&
    packet.parsed.challenge2 <= 3;
}