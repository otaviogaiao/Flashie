

export const ADD_DECK = 'ADD_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_CARD = 'REMOVE_CARD'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export const GET_DECKS = 'FETCH_DECKS'

export const GET_ALL_CARDS = 'GET_ALL_CARDS'

export const LOADING = 'LOADING'


import { getDecks, saveDeck, getDeck, addCard as addCardApi, getCards} from '../utils/api'


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


export function getDecksAction(){
    return function(dispatch){
        dispatch(loading(true))

        return getDecks().then((response) => response, (error) => console.log(error))
            .then((response) => {
                dispatch({
                    type: GET_DECKS,
                    decks: response
                })
                dispatch(loading(false))
            })

    }
}

/*
DECK: {
    deckId: number,
    title: string
    cards: []
}
*/
export function addDeckAction(deck){
    return function(dispatch){
        dispatch(loading(true))

        return saveDeck(deck).then(() => {}, error => console.log(error))
                .then(() => {
                    dispatch({
                        type: ADD_DECK,
                        deck
                    })
                    dispatch(loading(false))
                })
    }
}

export function loading(load){
    return {
        type: LOADING,
        loading: load
    }
}

export function addCard(card){
    return function (dispatch){
        dispatch(loading(true))

        // return addCardApi(card).then(() => {
        // }, erro => console.log(erro))
        //     .then(() => {
        //         dispatch({
        //             type: ADD_CARD,
        //             card
        //         })
        //         dispatch(loading(false))
        //     })
        dispatch(loading(false))
        dispatch({
            type: ADD_CARD_TO_DECK,
            card
        })
        return dispatch({
            type: ADD_CARD,
            card
        })

    }
}

export function getAllCards(){
    return function (dispatch){
        dispatch(loading(true))

        return getCards().then((cards) => { return cards}, erro => console.log(erro))
            .then((cards) => {
                dispatch({
                    type: GET_ALL_CARDS,
                    cards
                })

                dispatch(loading(true))
            })
    }
}

/////////////
