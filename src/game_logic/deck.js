var Deck = (function () {
    function Deck(opt) {
        if (opt === void 0) { opt = {}; }
        this._opt = {
            extend: opt['extend'] || [],
            suits: opt['suits'] || ['spades', 'hearts', 'diamonds', 'clubs'],
            ranks: opt['ranks'] || ['ace', 'king', 'queen', 'jack', '10', '9', '8', '7', '6', '5', '4', '3', '2'],
            multiply: opt['multiply'] || 1
        };
        if (this._opt.multiply < 1)
            this._opt.multiply = 1;
        this.shuffle();
    }
    Deck.prototype.shuffle = function () {
        this.cards = [];
        for (var i = 0; i < this._opt.multiply; i++) {
            for (var _i = 0, _a = this._opt.suits; _i < _a.length; _i++) {
                var suit = _a[_i];
                for (var _b = 0, _c = this._opt.ranks; _b < _c.length; _b++) {
                    var rank = _c[_b];
                    this.inlay({ suit: suit, rank: rank });
                }
            }
            for (var _d = 0, _e = this._opt.extend; _d < _e.length; _d++) {
                var card = _e[_d];
                if (!card.limit || i < card.limit)
                    this.inlay({ suit: card.suit, rank: card.rank });
            }
        }
    };
    Deck.prototype.inlay = function (card) {
        if (card && card.suit && card.rank) {
            this.cards.push(card);
            return true;
        }
        else
            return false;
    };
    Deck.prototype.count = function () {
        return this.cards.length;
    };
    Deck.prototype.draw = function () {
        var count = this.count();
        if (count > 0)
            return this.cards.splice(Math.floor(Math.random() * count), 1)[0] || null;
        else
            return null;
    };
    return Deck;
}());
var module = module;
if (typeof module == "object" && typeof module.exports == "object")
    module.exports = Deck;