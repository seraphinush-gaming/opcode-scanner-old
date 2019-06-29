module.exports = packet => {
  return packet.parsedLength > (20 * 8) &&
    packet.parsed.quests.length >= 0;
}
