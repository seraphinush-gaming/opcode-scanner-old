module.exports = packet => {
  let prev = packet.prev('S_COMPLETE_EVENT_MATCHING_QUEST');

  return prev &&
    packet.parsed.id === prev.parsed.id;
}