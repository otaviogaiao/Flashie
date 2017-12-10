import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, 
    TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class AddQuestion extends Component {

    state = {
        question: null,
        answer: null
    }

    submit = () => {

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

export default AddQuestion


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