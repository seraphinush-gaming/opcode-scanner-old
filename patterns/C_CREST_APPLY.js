module.exports = packet => {
	let prev = packet.prev('S_CREST_INFO');

	return prev &&
		prev.parsed.crests.find(glyph => glyph.id === packet.parsed.id) &&
		(packet.parsed.enabled || !packet.parsed.enabled);
}