import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { textStyles, colors } from '../utils/styles'

import { formatNumberOfCards } from '../utils/helpers'
import Quiz from './Quiz'
import Button from './Button'


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
               
                <Button style={[styles.button, styles.buttonAdd]} 
                    onPress={() => navigate('AddCard', {deckId: deck.deckId})}
                    textStyle={[textStyles.body, {color: colors.purple }]}
                    text='Add card' />
                
                {deck.cardsId.length !== 0 &&
                 <Button style={[styles.button, styles.buttonAdd]} 
                    onPress={() => navigate('ShowCards', {deckId: deck.deckId})}
                    textStyle={[textStyles.body, {color: colors.purple }]}
                    text='Edit deck' />}
              
                {deck.cardsId.length !== 0 &&
                <Button style={[styles.button, styles.buttonQuiz]}
                    onPress={() => navigate('Quiz', { deck: deck })}
                    text='Start quiz'
                    textStyle={[textStyles.body, {color: colors.white}]} />}

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
        backgroundColor: colors.orange,
        borderColor: colors.orange,
        borderWidth: 1
    },
    disabled: {
        opacity: 0.5
    }
})

Deck.propTypes = {
    deck: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
}