module.exports = packet => {
  return packet.parsed.image.startsWith('guildlogo_');
}