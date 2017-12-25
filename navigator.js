import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Text } from 'react-native'
import { MaterialCommunityIcons, Entypo, Ionicons } from '@expo/vector-icons'


import Deck from './components/Deck'
import AddCard from './components/AddCard'
import NewDeck from './components/NewDeck'
import Decks from './components/Decks'
import ShowCards from './components/ShowCards'
import Quiz from './components/Quiz'
import Config from './components/Config'



const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({tintColor}) => {
                return (
                    <MaterialCommunityIcons name='cards-variant' size={25} />
                )
            }
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({tintColor}) => {
                return (
                    <Entypo name='plus' size={25}/>
                )
            }
        }
    },
    Config: {
        screen: Config,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({tintColor}) => {
                return (
                    <Ionicons name='ios-settings' size={25} />
                )
            }
        }
    }
}, {
    initialRouteName: 'Decks',
    tabBarOptions: {
        activeTintColor: '#e91e63',
        labelStyle: {
          fontSize: 12,
        }
      }
      
})

const Navigator = StackNavigator({
    Decks: {
        screen: Tabs,
        navigationOptions: {
            header: null
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            title: 'Deck'
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: 'Add question'
        }
    },
    ShowCards: {
        screen: ShowCards,
        navigationOptions: {
            title: 'Cards'
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: ({navigation, screenProps}) => ({
            title: 'Quiz for '+navigation.state.params.deck.title
        })
    }
}, {
    headerMode: 'screen'
})

export default Navigator