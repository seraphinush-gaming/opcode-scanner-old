module.exports = packet => { // 1
	if (!packet.mapped['S_BOSS_GAGE_INFO']) {
		return false;
	}

	for (let i = packet.index + 1; i < packet.history.length; i++) {
		let next = packet.history[i];

		if (next.name() === 'S_BOSS_GAGE_INFO' &&
			next.parsed.huntingZoneId === packet.parsed.huntingZoneId &&
			next.parsed.templateId === packet.parsed.templateId) {
			return true;
		}
	}

	return false;
}