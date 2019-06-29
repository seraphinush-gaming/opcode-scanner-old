module.exports = packet => {
  let prev = packet.prev();

  return prev &&
    prev.name() === 'S_ACCOUNT_PACKAGE_LIST' &&
    packet.parse();
}