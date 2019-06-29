module.exports = packet => {
  let prev = packet.prev('S_LOGIN');

  return prev &&
    packet.parsed.personalNote === 'tumblr@seraphinush-gaming';
}