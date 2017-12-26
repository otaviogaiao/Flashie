import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'

export const NOTIFICATION_KEY = 'NOTIFICATION_KEY_FLASHIE'

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
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
                    if(status === 'granted'){
                        Notifications.cancelAllScheduledNotificationsAsync()

                       notification()

                       AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
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
                Notification.cancelAllScheduledNotificationsAsync()

                notification()
            }
        })
}