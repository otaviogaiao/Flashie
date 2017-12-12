import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, 
        TouchableOpacity } from 'react-native'

import { connect } from 'react-redux'

import { formatNumberOfCards } from '../utils/helpers'
import { getDecks } from '../utils/api'
import { fetchDecks } from '../actions'


class Decks extends Component {

    componentDidMount(){
        console.log('mounting decks...')
        this.props.getAllDecks()
    }

    render(){
        const { navigate } = this.props.navigation
        let { decks } = this.props
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
        getAllDecks: () => dispatch(fetchDecks())
    }
}

function mapStateToProps({decks}){
    return {
        decks: decks ? 
                Object.keys(decks).map((key) => Object.assign(decks[key], {key: key}))
                : []
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