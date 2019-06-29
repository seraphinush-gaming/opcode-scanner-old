module.exports = packet => {
  return packet.order === 1 &&
    (packet.parsed.enableCustom || !packet.parsed.enableCustom);
}