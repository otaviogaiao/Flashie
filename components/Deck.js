import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { formatNumberOfCards } from '../utils/helpers'


class Deck extends Component {

    render(){
        const { navigate } = this.props.navigation
        const { deck } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.titlesContainer}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.subTitle}>{formatNumberOfCards(deck)}</Text>
                </View>
               

                <TouchableOpacity style={[styles.button, styles.buttonAdd]}
                    onPress={() => navigate('AddCard', {deckId: deck.deckId})}>
                    <Text >Add card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonAdd]} 
                 onPress={() => navigate('ShowCards')}> 
                    <Text>Edit deck</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonQuiz]}>
                    <Text style={{color: 'white'}}>Start quiz</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

function mapStateToProps({decks}, {navigation}){
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
    title: {
        fontSize: 34
    },
    subTitle: {
        fontSize: 26
    },
    button: {
        margin: 5,
        padding: 15,
        borderRadius: 10
    },
    buttonAdd: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2
    },
    buttonQuiz: {
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth: 1
    }
})