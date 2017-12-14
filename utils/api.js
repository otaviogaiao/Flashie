import { AsyncStorage } from 'react-native'
const FLASHIE_KEY_DECK = 'FLASHIE_KEY_DECK'
const FLASHIE_KEY_CARD = 'FLASHIE_KEY_CARD'


//get all decks and cards
export function getDecks(){
    return AsyncStorage.getItem(FLASHIE_KEY_DECK)
        .then((results) => {
            return JSON.parse(results)
        })
}

export function getCards(){
    return AsyncStorage.getItem(FLASHIE_KEY_CARD)
    .then((results) => {
        return JSON.parse(results)
    })
}

//returns a deck that matches the provided ID
export function getDeck(id){

}

//adds or updates a deck
export function saveDeck(deck){
    return AsyncStorage.mergeItem(FLASHIE_KEY_DECK, JSON.stringify({[deck.deckId]: deck}))
}

//Adds or updates a card
export function addCard(card){
    // return getDecks().then(decks => {
    //     let index = decks[card.deckId].cards.indexOf((c) => {
    //         return c.cardId == card.cardId
    //     })
    //     if(index === -1){
    //         decks[card.deckId].cards.push(card)
    //     }else{
    //         decks[card.deckId][index] = card
    //     }
    //     return AsyncStorage.mergeItem(FLASHIE_KEY, JSON.stringify(decks)) //checar aqui
    // })
}

//deletes a deck and all its cards
export function deleteDeck(id){

}