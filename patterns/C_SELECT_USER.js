module.exports = packet => { // 1
    return packet.order >= 4 &&
        packet.parsed.id !== 0 &&
        packet.parsed.unk === 0;
} 