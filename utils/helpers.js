

export function formatNumberOfCards(deck){
    let numberOfCards = deck.cardsId.length
    return numberOfCards + (numberOfCards == 1 ? ' card' : ' cards')
}