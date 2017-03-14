class Deck {
  constructor() {
    this.cards = this.initCards()
  }
  initCards() {
    const suits = 'sdhc'.split('')
    const values = '23456789TJQKA'.split('')
    let cards = []

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < values.length; j++) {
        cards.push(values[j] + suits[i])
      }
    }

    this.shuffle(cards)
    return cards
  }
  shuffle(cards) {
    // Fisher-Yates (aka Knuth) Shuffle
    var currentIndex = cards.length, tempCard, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempCard = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = tempCard;
    }

    return cards;
  }
  deal() {
    return this.cards.pop()
  }
}

module.exports = Deck