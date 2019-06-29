module.exports = packet => {
    let prev = packet.prev();

    return prev &&
        prev.name() === 'C_CHECK_VERSION' &&
        packet.order === 1;
}