import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'

export const NOTIFICATION_KEY = 'NOTIFICATION_KEY_FLASHIE'

export function formatNumberOfCards(deck){
    let numberOfCards = deck.cardsId.length
    return numberOfCards + (numberOfCards == 1 ? ' card' : ' cards')
}

export function suffleArray(array) {
    var input = array;
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

export function setNotifications(){
    return AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse)
        .then((active) => {
            if(active === null){
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({status}) => {
                    if(status === 'granted'){
                        console.log('notifications allowed')
                        Notifications.cancelAllScheduledNotificationsAsync()

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
                    
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    console.log('turning on notifications')
                }else{
                    Notifications.cancelAllScheduledNotificationsAsync()
                    console.log('canceling notifications')
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(false))
                }
            }
        })
}