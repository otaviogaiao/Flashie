import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class NewDeck extends Component {

    state={
        name: null
    }

    submit = () => {
        console.log(this.state.name)
    }

    render(){
        return (
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}>
                <Text style={styles.title}>Whats the title of your deck?</Text>
                    <TextInput editable={true} style={styles.input}
                    placeholder='Type title here'
                    maxLength={25}
                    value={this.state.name}
                    onChangeText={(text) => {
                        this.setState({name: text})
                    }}
                    />
                <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text style={{color: 'white'}}>Submit</Text>
                </TouchableOpacity>
              </KeyboardAwareScrollView>
            )
    }
}

export default NewDeck

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