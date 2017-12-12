

export function formatNumberOfCards(deck){
    let numberOfCards = deck.cards.length
    return numberOfCards + (numberOfCards == 1 ? ' card' : ' cards')
}