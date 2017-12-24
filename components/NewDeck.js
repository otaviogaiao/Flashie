import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'

import { addDeckAction } from '../actions'

class NewDeck extends Component {

    state={
        title: null
    }

    submit = () => {
        const { add, goBack } = this.props
        let deck = {...this.state}
        if(!deck['deckId']){
            deck['deckId'] = Date.now()
            deck['logs'] = []
        }
       
        !deck['cardsId'] && (deck['cardsId'] = [])
        //TODO: FAZER COM QUE UM ACONTECA DEPOIS DO OUTRO, DESCOBRIR COMO COLOCAR THEN

        add(deck)
        goBack()
        this.setState({title: null})
    }

    render(){
        return (
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}>
                <Text style={styles.title}>Whats the title of your deck?</Text>
                    <TextInput editable={true} style={styles.input}
                    placeholder='Type title here'
                    maxLength={25}
                    value={this.state.title}
                    onChangeText={(text) => {
                        this.setState({title: text})
                    }}
                    />
                <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text style={{color: 'white'}}>Submit</Text>
                </TouchableOpacity>
              </KeyboardAwareScrollView>
            )
    }
}

function mapDispatchToProps(dispatch, { navigation }){
    return {
        add: (deck) => {
            dispatch(addDeckAction(deck))
        },
        goBack: () => {
            navigation.goBack()
        }
    }
}

export default connect(null, mapDispatchToProps)(NewDeck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
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