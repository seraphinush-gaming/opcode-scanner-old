module.exports = packet => {
  let prev = packet.prev();

  return prev && prev.name() === 'C_SET_VISIBLE_RANGE';
}