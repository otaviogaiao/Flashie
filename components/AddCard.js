import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, 
    TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'

import { addCard } from '../actions'

class AddCard extends Component {

    state = {
        question: null,
        answer: null
    }

    submit = () => {
        let card = {...this.state}
        card.deckId = this.props.deckId
        !card.cardId && (card.cardId = Date.now())
        console.log(card)
        this.props.add(card)
        this.props.goBack()

        this.setState({question: null, answer: null, deckId: null})
    }

    render(){
        return (
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.title}>Whats your question?</Text>
                    <TextInput editable={true} style={styles.input}
                    placeholder='Type question here'
                    maxLength={100}
                    value={this.state.question}
                    multiline={true}
                    maxHeight={100}
                    onChangeText={(text) => {
                        this.setState({question: text})
                    }}
                />
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.title}>Whats your answer?</Text>
                    <TextInput editable={true} style={styles.input}
                    placeholder='Type answer here'
                    maxLength={100}
                    value={this.state.answer}
                    multiline={true}
                    maxHeight={100}
                    onChangeText={(text) => {
                        this.setState({answer: text})
                    }}
                    />
            </View>

            <TouchableOpacity style={styles.button} onPress={this.submit}>
                <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
        
      </KeyboardAwareScrollView>)
    }

}

export function mapDispatchToProps(dispatch, {navigation}){
    return {
        add: (card) => {
            dispatch(addCard(card))
        },
        goBack: (deckId = null) => {
            navigation.goBack()
        }
    }
}

export function mapStateToProps(state, {navigation}) {
    console.log('state em addCard', state)
    return {
        deckId: navigation.state.params.deckId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    subContainer: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 29
    },
    input: {
        fontSize: 25,
        flexDirection: 'row',
        alignSelf: 'stretch',
        margin: 25,
        borderBottomWidth: 1
    },
    button: {
        backgroundColor: 'black',
        margin: 15,
        padding: 15,
        borderRadius: 10
    }
})