import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'
const FLASHIE_KEY_DECK = 'FLASHIE_KEY_DECK'
const FLASHIE_KEY_CARD = 'FLASHIE_KEY_CARD'
export const NOTIFICATION_KEY = 'NOTIFICATION_KEY_FLASHIE'


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

export function updateLogs(deck, cards){
    return saveDeck(deck).then(() => {
        return getCards().then((c) => {
            let newCards = cards.map((card) => ({[card.cardId]: card}))
            return AsyncStorage.mergeItem(FLASHIE_KEY_CARD, JSON.stringify(Object.assign({}, c, ...newCards)))
        })
    })
}




function notification(){
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(19)
    tomorrow.setMinutes(0)

    Notifications.scheduleLocalNotificationAsync(
        {
            title: 'Remember to practice!',
            body: "don't forget to study your flashcards today!",
            ios: {
              sound: true
            },
            android: {
              sound: true,
              priority: 'high',
              sticky: false,
              vibrate: true
            }
        },
        {
          time: tomorrow,
          repeat: 'day'
        }
      )
}

export function setNotifications(){
    return AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse)
        .then((active) => {
            if(active === null){
                return Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
 
                    if(status === 'granted'){
                        Notifications.cancelAllScheduledNotificationsAsync()

                        notification()

                        return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}

export function changeNotificationStatus(activate){
    return AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse)
        .then((active) => {
            if(active !== null){
                
                if(activate){
                    Notifications.cancelAllScheduledNotificationsAsync()

                    notification()
                    
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }else{
                    Notifications.cancelAllScheduledNotificationsAsync()
                
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(false))
                }
            }
        })
}

export function cancelTodaysNotification(){
    return AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse)
        .then((active) => {
            if(active){
                Notifications.cancelAllScheduledNotificationsAsync()

                notification()
            }
        })
}

export function loadNotificationConfig() {
    return Permissions.getAsync(Permissions.NOTIFICATIONS).then(({status}) => {
        return AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse)
        .then(data => {
            let notifications = (data === 'true' || data === true)
            let allowed = status === 'granted'
            return {
                allowed,
                notifications
            }
        })
    })
}