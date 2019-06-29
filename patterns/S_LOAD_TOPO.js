module.exports = packet => { // 3
  return packet.mapped['S_LOGIN'] &&
    packet.parsed.zone &&
    packet.parsed.quick === false;
}