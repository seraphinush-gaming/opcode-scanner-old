module.exports = pak => {
	let prev = pak.prev()

	return prev && prev.code === pak.code
}