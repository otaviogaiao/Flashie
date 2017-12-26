import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import Swipeout from 'react-native-swipeout'

import { removeCard } from '../actions'
import { textStyles } from '../utils/styles'



class ShowCards extends Component {

    state = {
        activeRow: null
    }

    onSwipeOpen(item, rowId, direction){
        this.setState({ activeRow: item.cardId })
    }
     
    onSwipeClose(item, rowId, direction){
        if (item.cardId === this.state.activeRow && typeof direction !== 'undefined') {
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
            close: item.cardId !== this.state.activeRow,
            onClose: (secId, rowId, direction) => this.onSwipeClose(item, rowId, direction),
            onOpen: (secId, rowId, direction) => this.onSwipeOpen(item, rowId, direction),
            right: [
                { onPress: () => navigate('AddCard', {deckId: item.deckId, cardId: item.cardId}), text: 'Edit', type: 'primary'},
                { onPress: () => this.onDeleteItem(item), text: 'Delete', type: 'delete' }
            ],
            rowId: index,
            sectionId: 1
        }

        return (
            <Swipeout {...swipeSettings}>
                <View style={[styles.items]}>
                    <Text style={textStyles.body} numberOfLines={3}>{item.question}</Text>
                </View>
            </Swipeout>
        )
    }

    render(){

        const { cards } = this.props
        return (
            <View style={styles.container}>
                <FlatList data={cards}
                keyExtractor={(item, index) => item.cardId}
                extraData= {this.state.activeRow}
                renderItem={({item, index}) => {
                            return this.renderListItem(item, index)
                        }}>
                    
                </FlatList>
            </View>
        )
    }
}


function mapDispatchToProps(dispatch, props){
    return {
        delete: (c) => {return dispatch(removeCard(c))}
    }
}

function mapStateToProps(state, {navigation}){
    let deck = state.entity.decks[navigation.state.params.deckId]
    let cardsIds = deck.cardsId
    let cards = []
    if(state.entity.cards) {
        cards = Object.keys(state.entity.cards).map((key) => {
            return state.entity.cards[key]
            }).filter((card) => {
                return cardsIds.includes(card.cardId)
            })
    }
    return {
        cards,
        deck
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCards)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    items: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#D7DEE0',
        backgroundColor: 'white',
        padding: 5,
        overflow: 'hidden'
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '35%',
        marginRight: 10
    },
    question: {
        width: '65%', 
        paddingLeft: 10,
        fontSize: 18
    }
})

ShowCards.propTypes = {
    delete: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    deck: PropTypes.object.isRequired
}