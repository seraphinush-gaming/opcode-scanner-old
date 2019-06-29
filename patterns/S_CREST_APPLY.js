module.exports = packet => {
  let prev = packet.prev('C_CREST_APPLY');

  return prev &&
    packet.parsed.id === prev.parsed.id;
}