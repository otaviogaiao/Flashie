export const START_SAVE_DECK = 'START_SAVE_DECK'
export const FINISH_SAVE_DECK = 'FINISH_SAVE_DECK'
export const SAVE_DECK = 'SAVE_DECK'

export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'

export const FETCH_DECKS = 'FETCH_DECKS'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const REQUEST_DECKS = 'REQUEST_DECKS'

export const START_GET_DECK_BY_ID = 'START_GET_DECK_BY_ID'
export const FINISH_GET_DECK_BY_ID = 'FINISH_GET_DECK_BY_ID'

export const LOADING = 'LOADING'

import { getDecks, saveDeck, getDeck, addCard as addCardApi} from '../utils/api'


export function removeDeck(deck){
    return {
        type: REMOVE_DECK,
        deck
    }
}

/*
CARD: {
    deckId: number,
    cardId: number,
    question: string,
    answer: string
}
*/


export function removeCard(card){
    return {
        type: REMOVE_CARD,
        card
    }
}


//THUNKS TO LOAD ALL DECKS
export function requestDecks(){
    return {
        type: REQUEST_DECKS
    }
}

export function fetchDecks(){
    return function(dispatch){
        dispatch(requestDecks())

        return getDecks().then((response) => response, (error) => console.log(error))
            .then((response) => {
                console.log('response', response)
                dispatch(receiveDecks(response))
            })

    }
}

export function receiveDecks(decks){
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

//THUNKS TO ADD/UPDATE A DECK

export function startSaveDeck(){
    return {
        type: START_SAVE_DECK
    }
}

/*
DECK: {
    deckId: number,
    title: string
    cards: []
}
*/
export function doSaveDeck(deck){
    return function(dispatch){
        dispatch(startSaveDeck())

        return saveDeck(deck).then(() => {}, error => console.log(error))
                .then(() => {
                    dispatch(finishSaveDeck(deck))
                })
    }
}

export function finishSaveDeck(deck){
    return {
        type: FINISH_SAVE_DECK,
        deck
    }
}

// ADD CARD

export function Loading(load){
    return {
        type: LOADING,
        loading: load
    }
}

export function addCard(card){
    return function (dispatch){
        dispatch(Loading(true))

        return addCardApi(card).then(() => {
        }, erro => console.log(erro))
            .then(() => {
                dispatch({
                    type: ADD_CARD,
                    card
                })
            })

    }
}

/////////////
