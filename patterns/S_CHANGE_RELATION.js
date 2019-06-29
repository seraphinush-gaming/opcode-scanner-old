module.exports = packet => {
  let next = packet.next();

  return next &&
    next.fromServer &&
    next.data.length === 12 &&
    packet.order < 500 &&
    packet.parsed.relation === 1;
}