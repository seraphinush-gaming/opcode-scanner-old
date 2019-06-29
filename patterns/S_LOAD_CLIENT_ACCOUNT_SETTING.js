module.exports = packet => { // 1
  return packet.prev('S_GET_USER_LIST') &&
    packet.index < 18;
}