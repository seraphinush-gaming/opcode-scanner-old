module.exports = packet => { // 1
  return packet.parsed.message.startsWith('@dungeon:');
}