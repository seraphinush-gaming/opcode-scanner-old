module.exports = packet => {
  return packet.prev('S_LOGIN') &&
    packet.parsed.points >= 10 &&
    packet.parsed.points <= 65 &&
    packet.parsed.pointsActive >>> 0 <= 65 &&
    packet.parsed.crests.length;
}