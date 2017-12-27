
export function formatNumberOfCards(deck){
    let numberOfCards = deck.cardsId.length
    return numberOfCards + (numberOfCards == 1 ? ' card' : ' cards')
}

export function shuffleArray(array) {
    let input = array;
     
    for (let i = input.length-1; i >=0; i--) {
     
        let randomIndex = Math.floor(Math.random()*(i+1)); 
        let itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

