import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, 
        TouchableOpacity } from 'react-native'
import { AppLoading } from 'expo'
import Swipeout from 'react-native-swipeout'

import { connect } from 'react-redux'

import { formatNumberOfCards } from '../utils/helpers'
import { getDecks, getCards } from '../utils/api'
import { getDecksAction, getAllCards, removeDeck } from '../actions'

// import { AsyncStorage } from 'react-native'


class Decks extends Component {

    state = {
        activeRow: null
    }

    componentDidMount(){
        console.log('mounting decks...')
        this.props.getDecks()
        this.props.getCards()
        // AsyncStorage.removeItem('FLASHIE_KEY_DECK')
        // AsyncStorage.removeItem('FLASHIE_KEY_CARD')
    }

    onSwipeOpen(item, rowId, direction){
        this.setState({ activeRow: item.deckId })
    }
     
    onSwipeClose(item, rowId, direction){
        if (item.deckId === this.state.activeRow && typeof direction !== 'undefined') {
            this.setState({ activeRow: null });
        }
    }

    onDeleteItem = (item) => {
        this.props.delete(item)
    }

    renderListItem = (item, index) => {
        const { navigate } = this.props.navigation
        const swipeSettings = {
            autoClose: true,
            close: item.deckId !== this.state.activeRow,
            onClose: (secId, rowId, direction) => this.onSwipeClose(item, rowId, direction),
            onOpen: (secId, rowId, direction) => this.onSwipeOpen(item, rowId, direction),
            right: [
                { onPress: () => this.onDeleteItem(item), text: 'Delete', type: 'delete' }
            ],
            rowId: index,
            sectionId: 1
        }

        return (
            <Swipeout {...swipeSettings}>
                <TouchableOpacity onPress={() => navigate('Deck', {deckId: item.deckId})}>
                    <View style={[styles.items]}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.subTitle}>
                            {formatNumberOfCards(item)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    }

    render(){

        if(this.props.loading){
            return <AppLoading />
        }

        const decks = this.props.decks ? Object.keys(this.props.decks).map((key) => { return this.props.decks[key]}) : []

        return (
          <View style={styles.list}>
            <FlatList data={decks}
              keyExtractor={(item, index) => item.deckId}
              extraData= {this.state.activeRow}
              renderItem={({item, index} ) => {
                  return this.renderListItem(item, index)
              } }/>
          </View>)
    }
}

function mapDispatchToProps(dispatch){
    return {
        getDecks: () => dispatch(getDecksAction()),
        getCards: () => dispatch(getAllCards()),
        delete: (d) => dispatch(removeDeck(d))
    }
}

function mapStateToProps(state){
    let { decks } = state.entity
    let { loading } = state
    return {
        decks,
        loading
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