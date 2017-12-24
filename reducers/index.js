import { ADD_DECK, REMOVE_DECK, GET_DECKS, ADD_CARD, REMOVE_CARD,
    LOADING, GET_ALL_CARDS, UPDATE_LOGS } from '../actions'

import { combineReducers } from 'redux'
import _omit from 'lodash.omit'

// const initialState = {
//     decks: {id: {id, title, cardsId: []}},
//     cards :{cardId: {question, answer, cardId, deckId}},
//     loading: false
// }

const initialState = {
    decks: {},
    cards: {}
}

const initialStateConfig = {
    loading: false
}

function entityReducer (state = initialState, action){
    console.log('state reducer', state, action)
    let { decks, cards } = state
    switch(action.type){
        case ADD_CARD:
            return {
                ...state,
                decks: Object.assign({}, decks, {[action.card.deckId]: {
                    ...decks[action.card.deckId],
                    cardsId: decks[action.card.deckId].cardsId.includes(action.card.cardId) ? 
                      decks[action.card.deckId].cardsId
                      : decks[action.card.deckId].cardsId.concat(action.card.cardId)
                }}),
                cards: Object.assign({}, cards, {[action.card.cardId]: action.card})
            }
        case REMOVE_CARD:
            let cardsDecks = decks[action.card.deckId].cardsId        
            cardsDecks = cardsDecks.filter((c) => c !== action.card.cardId)
            return {
                ...state,
                decks: Object.assign({}, decks, { [action.card.deckId]: {
                    ...decks[action.card.deckId],
                    cardsId: cardsDecks
                }}),
                cards: _omit(cards, action.card.cardId)
            }
        case ADD_DECK:
            return {
                ...state,
                decks: {
                    ...decks,
                    [action.deck.deckId]: action.deck
                },
                cards    
            }
        case GET_DECKS:
            return {
                ...state,
                decks: action.decks,
                cards
            }
        case GET_ALL_CARDS:
            return {
                ...state,
                decks,
                cards: action.cards
            }
        case REMOVE_DECK:
            return {
                ...state,
                decks: _omit(decks, action.deck.deckId),
                cards: _omit(cards, action.deck.cardsId )
            }
        case UPDATE_LOGS:
            let updateCards = {}
            for(let c of Object.values(action.cards)){
                updateCards[c.cardId] = c
            }
            return {
                ...state,
                decks: Object.assign({}, decks, {[action.deck.deckId]: action.deck}),
                cards: Object.assign({}, cards, updateCards)
            }
        default:
            return state
    }
}

function configReducer(state = initialStateConfig, action){
    switch(action.type){
        case LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state
    }
}

export default combineReducers({
    entity: entityReducer,
    config: configReducer
})