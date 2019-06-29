module.exports = packet => { // 1
	let prev = packet.prev('S_LIST_CHANNEL');

    return prev &&
        packet.parsed.unk === 1 &&
        packet.parsed.zone === prev.parsed.zone &&
        packet.parsed.channel <= prev.parsed.channels.length;
}