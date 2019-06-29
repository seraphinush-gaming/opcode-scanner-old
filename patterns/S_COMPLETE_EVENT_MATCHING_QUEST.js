module.exports = packet => {
  if (!packet.mapped['C_COMPLETE_DAILY_EVENT']) {
    return false;
  }

  let prev = packet.prev('C_COMPLETE_DAILY_EVENT');

  return prev &&
    packet.parsed.id === prev.parsed.id;
}