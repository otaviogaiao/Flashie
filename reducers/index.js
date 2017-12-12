import { SAVE_DECK, REMOVE_DECK, ADD_CARD, REMOVE_CARD,
    REQUEST_DECKS, RECEIVE_DECKS, START_SAVE_DECK, FINISH_SAVE_DECK,
    LOADING} from '../actions'


const initialState = {
    decks: {},
    loading: false
}


function reducer(state = initialState, action){
    let decks
    let card
    switch(action.type){
        case START_SAVE_DECK:
            return Object.assign({}, state, {loading: true})
        case FINISH_SAVE_DECK:
            decks = state.decks
            decks[action.deck.deckId] = action.deck
            return Object.assign({}, state, decks)
        case REMOVE_DECK:
            break;
        case ADD_CARD:
            console.log('reducer',state)
            decks =  state.decks
            card = action.card
            let index = decks[card.deckId].cards.indexOf((c) => {
                return c.cardId == card.cardId
            })
            if(index === -1){
                decks[card.deckId].cards = decks[card.deckId].cards.push(card)
            }else{
                decks[card.deckId][index] = card
            }
            return Object.assign({}, state, decks)
        case REMOVE_CARD:
            break;
        case REQUEST_DECKS:
            return Object.assign({}, state, {loading: true})
        case RECEIVE_DECKS:
            // console.log('reducer receive decks', Object.assign({}, state, {decks: action.decks}, {loading: false}))
            return Object.assign({}, state, {decks: action.decks}, {loading: false})
        case LOADING: //muda loading de true para false e vice versa
            return Object.assign({}, state, {loading: action.loading})
        default:
            return state
    }
}

export default reducer