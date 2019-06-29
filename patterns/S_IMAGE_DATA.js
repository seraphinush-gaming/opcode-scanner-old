module.exports = packet => { // 1
  let prev = packet.prev('C_REQUEST_IMAGE_DATA');

  return prev &&
    packet.parsed.name == prev.parsed.image &&
    packet.parsed.data.slice(0, 4).toString() === 'TERA';
}