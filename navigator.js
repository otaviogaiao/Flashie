import React from 'react'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Text } from 'react-native'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'


import Deck from './components/Deck'
import AddQuestion from './components/AddQuestion'
import NewDeck from './components/NewDeck'
import Decks from './components/Decks'



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
    AddQuestion: {
        screen: AddQuestion,
        navigationOptions: {
            title: 'Add question'
        }
    }
}, {
    headerMode: 'screen'
})

export default Navigator