module.exports = packet => {
  let prev = packet.prev('S_BROCAST_GUILD_FLAG');

  return prev &&
    prev.index >= packet.index - 2 &&
    packet.parsed.unk === 0 &&
    packet.parsed.accountBenefits.length >= 0;
}