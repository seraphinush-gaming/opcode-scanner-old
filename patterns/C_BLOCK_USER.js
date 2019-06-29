module.exports = packet => {
  if (!packet.mapped['S_LOGIN'] && !packet.mapped['S_ADD_BLOCKED_USER']) {
    return false;
  }

  let next = packet.next('S_ADD_BLOCKED_USER');

  return next &&
    next.time - packet.time < 200 &&
    packet.parsed.name === next.parsed.name;
}