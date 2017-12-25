import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { textStyles, colors } from '../utils/styles'

import { formatNumberOfCards } from '../utils/helpers'
import Quiz from './Quiz'


class Deck extends Component {

    render(){
        const { navigate } = this.props.navigation
        const { deck } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.titlesContainer}>
                    <Text style={textStyles.title1}>{deck.title}</Text>
                    <Text style={textStyles.title3}>{formatNumberOfCards(deck)}</Text>
                </View>
               

                <TouchableOpacity style={[styles.button, styles.buttonAdd]}
                    onPress={() => navigate('AddCard', {deckId: deck.deckId})}>
                    <Text style={[textStyles.body, {color: colors.purple }]}>Add card</Text>
                </TouchableOpacity>
                
                {deck.cardsId.length !== 0 &&
                <TouchableOpacity style={[styles.button, styles.buttonAdd]} 
                 onPress={() => navigate('ShowCards', {deckId: deck.deckId})}> 
                    <Text style={[textStyles.body,{color: colors.purple }]}>Edit deck</Text>
                </TouchableOpacity>}
              
                {deck.cardsId.length !== 0 &&
                <TouchableOpacity style={[styles.button, styles.buttonQuiz]}
                    onPress={() => navigate('Quiz', { deck: deck })} >
                    <Text style={[textStyles.body, {color: colors.white}]}>Start quiz</Text>
                </TouchableOpacity>}

            </View>
        )
    }
}

function mapStateToProps(state, {navigation}){
    let { decks } = state.entity
    return {deck: decks[navigation.state.params.deckId]}
}

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    titlesContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    button: {
        margin: 5,
        padding: 15,
        borderRadius: 10
    },
    buttonAdd: {
        backgroundColor: colors.white,
        borderColor: colors.purple,
        borderWidth: 1
    },
    buttonQuiz: {
        backgroundColor: colors.purple,
        borderColor: colors.purple,
        borderWidth: 1
    },
    disabled: {
        opacity: 0.5
    }
})