module.exports = packet => { // 5
  return dist3D(packet.parsed.dest, packet.parsed.loc) < 200 &&
    packet.parsed.type <= 10 &&
    packet.parsed.jumpDistance === 0 &&
    packet.parsed.inShuttle === false;
}

function dist3D(loc1, loc2) {
  return Math.sqrt(Math.pow(loc2.x - loc1.x, 2) + Math.pow(loc2.y - loc1.y, 2) + Math.pow(loc2.z - loc1.z, 2));
}