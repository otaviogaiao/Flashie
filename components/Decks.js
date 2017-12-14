import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, 
        TouchableOpacity } from 'react-native'

import { connect } from 'react-redux'

import { formatNumberOfCards } from '../utils/helpers'
import { getDecks, getCards } from '../utils/api'
import { getDecksAction } from '../actions'

// import { AsyncStorage } from 'react-native'


class Decks extends Component {

    componentDidMount(){
        console.log('mounting decks...')
        this.props.getDecks()
        // AsyncStorage.removeItem('FLASHIE_KEY_DECK')
    }

    render(){
        const { navigate } = this.props.navigation
        const decks = this.props.decks ? Object.keys(this.props.decks).map((key) => { return this.props.decks[key]}) : []
        return (
          <View style={styles.list}>
            <FlatList data={decks}
              renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigate('Deck', {deckId: item.deckId})}>
                      <View style={[styles.items]}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subTitle}>
                            {formatNumberOfCards(item)}
                        </Text>
                    </View>
                  </TouchableOpacity>
              ) }/>
          </View>)
    }
}

function mapDispatchToProps(dispatch){
    return {
        getDecks: () => dispatch(getDecksAction())
    }
}

function mapStateToProps({decks}){
    console.log('decks', decks)
    return {
        decks
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Decks)

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