module.exports = packet => {
  if (!packet.mapped['S_REQUEST_CONTRACT'] ||
    !packet.mapped['S_REPLY_REQUEST_CONTRACT']) {
    return false;
  }

  let next = packet.next();

  return next &&
    next.time - packet.time < 200 &&
    next.name() === 'S_REPLY_REQUEST_CONTRACT' &&
    packet.parsed.type === next.parsed.type;
}