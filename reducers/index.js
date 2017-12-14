import { ADD_DECK, REMOVE_DECK, GET_DECKS, ADD_CARD, REMOVE_CARD,
    LOADING, ADD_CARD_TO_DECK } from '../actions'

import { combineReducers } from 'redux'


// const initialState = {
//     decks: {id: {id, title, cardsId: []}},
//     cards :{cardId: {question, answer, cardId, deckId}},
//     loading: false
// }

const initialStateConfig = {
    loading: false
}

function cardReducer(state = {}, action){
    switch(action.type){
        case ADD_CARD:
            console.log('estado dentro de card reducer', state)
            return {
                ...state,
                [action.card.cardId]: action.card
            }
        case REMOVE_CARD:
            return state
        default:
            return state
    }
}

function deckReducer(state = {}, action){
    switch(action.type){
        case ADD_DECK:
            return {
                ...state,
                [action.deck.deckId]: action.deck
            }
        case GET_DECKS:
            return action.decks
        case REMOVE_DECK:
            return state
        case ADD_CARD_TO_DECK:
            let cardsId = state[action.card.deckId].cardsId
            return {
                ...state,
                [action.card.deckId]: {
                    ...state[action.card.decksId],
                    cardsId: cardsId.indexOf(action.card.cardId) !== -1 ? cardsId.concat(action.card.cardId)
                             : cardsId
                }
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
    cards: cardReducer,
    decks: deckReducer,
    config: configReducer
})