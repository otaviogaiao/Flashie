import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, 
        TouchableOpacity } from 'react-native'

const dummyDecks = [{
    title: 'Deck 1',
    cards: 3,
    key: 'Deck 1'
}, {
    title: 'Deck 2',
    cards: 4,
    key: 'Deck 2'
},{
    title: 'Deck 3',
    cards: 10,
    key: 'Deck 3'
},{
    title: 'Deck 4',
    cards: 7,
    key: 'Deck 4'
}, {
    title: 'Deck 5',
    cards: 8,
    key: 'Deck 5'
}, {
    title: 'Deck 6',
    cards: 4,
    key: 'Deck 6'
}, {
    title: 'Deck 7',
    cards: 15,
    key: 'Deck 7'
},{
    title: 'Deck 8',
    cards: 0,
    key: 'Deck 8'
},{
    title: 'Deck 9',
    cards: 1,
    key: 'Deck 9'
}]

class Decks extends Component {

    render(){
        const { navigate } = this.props.navigation

        return (
          <View style={styles.list}>
            <FlatList data={dummyDecks}
              renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigate('Deck')}>
                      <View style={[styles.items]}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subTitle}>
                            {item.cards + (item.cards == 1 ? ' card' : ' cards')}
                        </Text>
                    </View>
                  </TouchableOpacity>
              ) }/>
          </View>)
    }
}

export default Decks

const styles = StyleSheet.create({
    items: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#D7DEE0',
        backgroundColor: 'white'
    },
    list: {
        flexDirection: 'row',
        paddingTop: 20
    },
    title: {
        fontSize: 24
    },
    subTitle: {
        fontSize: 16
    }
})