module.exports = packet => { // 3
  let prev = packet.prev('S_ACTION_STAGE');

  return prev &&
    packet.time - prev.time < 250 &&
    packet.parsed.gameId === prev.parsed.gameId &&
    packet.parsed.unk === 0 &&
    dist3D(packet.parsed.loc, prev.parsed.loc) < 500;
}

function dist3D(loc1, loc2) {
  return Math.sqrt(Math.pow(loc2.x - loc1.x, 2) + Math.pow(loc2.y - loc1.y, 2) + Math.pow(loc2.z - loc1.z, 2));
}