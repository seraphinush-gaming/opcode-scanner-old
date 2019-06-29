module.exports = packet => {
  let prev = packet.prev();

  return prev &&
    prev.name() === 'S_UPDATE_CONTENTS_ON_OFF' &&
    packet.parsed.unk === 0;
}