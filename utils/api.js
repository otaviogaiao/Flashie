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
    return getDecks().then(decks => {
        let index = decks[card.deckId].cardsId.indexOf(card.cardId)
        if(index === -1){
            decks[card.deckId].cardsId.push(card.cardId)
        }
        return AsyncStorage.mergeItem(FLASHIE_KEY_DECK, JSON.stringify(decks)) //checar aqui
    }).then(() => {
        return AsyncStorage.mergeItem(FLASHIE_KEY_CARD, JSON.stringify({[card.cardId]: card}))
    })
}

//deletes a deck and all its cards
export function deleteDeck(deck){
    return getDecks().then((decks) => {
        delete decks[deck.deckId]
        return AsyncStorage.setItem(FLASHIE_KEY_DECK, JSON.stringify(decks))
             .then(() => {
                 return getCards().then( cards => {
                     for(let id of deck.cardsId){
                         delete cards[id]
                     }
                     return AsyncStorage.setItem(FLASHIE_KEY_CARD, JSON.stringify(cards))
                 })
             })
    })
}

export function removeCard(card){
    return getDecks().then((decks) => {
        decks[card.deckId].cardsId = decks[card.deckId].cardsId.filter((c) => c !== card.cardId)
        return AsyncStorage.setItem(FLASHIE_KEY_DECK, JSON.stringify(decks))
             .then(() => {
                 return getCards().then( cards => {
                     delete cards[card.cardId]
                     return AsyncStorage.setItem(FLASHIE_KEY_CARD, JSON.stringify(cards))
                 })
             })
    })
}