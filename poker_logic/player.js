class Player {
  constructor(socketId, id, name, bankroll) {
    this.socketId = socketId,
    this.id = id,
    this.name = name,
    this.bankroll = bankroll
  }
}

module.exports = Player