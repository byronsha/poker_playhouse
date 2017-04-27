var PokerHand;
(function (PokerHand) {
    // ranks in order
    var _ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
    function score() {
        var allCards = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            allCards[_i - 0] = arguments[_i];
        }
        // return the best poker hand from a set or sets of cards
        var cards = _sanitise(allCards);
        // start empty
        var best = _result(cards);
        // find best hand
        for (var _a = 0, _b = _combinations(cards, 5); _a < _b.length; _a++) {
            var combination = _b[_a];
            // calculate value of 5 cards
            var result = _calculate(combination);
            if (result.value > best.value)
                best = result;
        }
        // finish with best result
        return best;
    }
    PokerHand.score = score;
    function _sanitise(allCards) {
        // concatenate
        var cards = [].concat.apply([], allCards);
        // valid rank and suit
        cards = cards.filter(function (card) {
            return !!(_ranks.indexOf(card.rank) > -1 && card.suit);
        });
        return cards;
    }
    function _combinations(cards, groups) {
        // card combinations with the given size
        var result = [];
        // not enough cards
        if (groups > cards.length)
            return result;
        // one group
        if (groups == cards.length)
            return [cards];
        // one card in each group
        if (groups == 1)
            return cards.map(function (card) { return [card]; });
        // everything else
        for (var i = 0; i < cards.length - groups; i++) {
            var head = cards.slice(i, (i + 1));
            var tails = _combinations(cards.slice(i + 1), (groups - 1));
            for (var _i = 0, tails_1 = tails; _i < tails_1.length; _i++) {
                var tail = tails_1[_i];
                result.push(head.concat(tail));
            }
        }
        return result;
    }
    function _ranked(cards) {
        // split cards by rank
        var result = [];
        for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
            var card = cards_1[_i];
            var r = _ranks.indexOf(card.rank);
            result[r] = result[r] || [];
            result[r].push(card);
        }
        // condense
        result = result.filter(function (rank) { return !!rank; });
        // high to low
        result.reverse();
        // pairs and sets first
        result.sort(function (a, b) {
            return a.length > b.length ? -1 : a.length < b.length ? 1 : 0;
        });
        return result;
    }
    function _isStraight(ranked) {
        // must have 5 different cards
        if (!ranked[4])
            return false;
        // could be wheel if r1 is 'ace' and r4 is '2'
        if (ranked[0][0].rank == 'ace' && ranked[1][0].rank == '5' && ranked[4][0].rank == '2') {
            // hand is 'ace' '5' '4' '3' '2'
            ranked.push(ranked.shift());
            // ace is now low
            return true;
        }
        // run of five in row is straight
        var r1 = _ranks.indexOf(ranked[0][0].rank);
        var r4 = _ranks.indexOf(ranked[4][0].rank);
        return (r1 - r4) == 4;
    }
    function _isFlush(cards) {
        // all suits match is flush
        var suit = cards[0].suit;
        for (var _i = 0, cards_2 = cards; _i < cards_2.length; _i++) {
            var card = cards_2[_i];
            if (card.suit != suit)
                return false;
        }
        return true;
    }
    function _value(ranked, primary) {
        // primary wins the rest are kickers
        var str = '';
        for (var _i = 0, ranked_1 = ranked; _i < ranked_1.length; _i++) {
            var rank = ranked_1[_i];
            // create two digit value
            var r = _ranks.indexOf(rank[0].rank);
            var v = (r < 10 ? '0' : '') + r;
            for (var i = 0; i < rank.length; i++) {
                // append value for each card
                str += v;
            }
        }
        // to integer
        return (primary * 10000000000) + parseInt(str);
    }
    function _result(cards, name, value) {
        return {
            cards: cards,
            name: name || 'nothing',
            value: value || 0
        };
    }
    function _calculate(cards) {
        // determine value of hand
        var ranked = _ranked(cards);
        var isFlush = _isFlush(cards);
        var isStraight = _isStraight(ranked);
        if (isStraight && isFlush && ranked[0][0].rank == 'ace')
            return _result(cards, 'royal flush', _value(ranked, 9));
        else if (isStraight && isFlush)
            return _result(cards, 'straight flush', _value(ranked, 8));
        else if (ranked[0].length == 4)
            return _result(cards, 'four of a kind', _value(ranked, 7));
        else if (ranked[0].length == 3 && ranked[1].length == 2)
            return _result(cards, 'full house', _value(ranked, 6));
        else if (isFlush)
            return _result(cards, 'flush', _value(ranked, 5));
        else if (isStraight)
            return _result(cards, 'straight', _value(ranked, 4));
        else if (ranked[0].length == 3)
            return _result(cards, 'three of a kind', _value(ranked, 3));
        else if (ranked[0].length == 2 && ranked[1].length == 2)
            return _result(cards, 'two pair', _value(ranked, 2));
        else if (ranked[0].length == 2)
            return _result(cards, 'one pair', _value(ranked, 1));
        else
            return _result(cards, 'high card', _value(ranked, 0));
    }
})(PokerHand || (PokerHand = {}));
var module = module;
if (typeof module == "object" && typeof module.exports == "object")
    module.exports = PokerHand;