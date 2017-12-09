import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


class Deck extends Component {
    
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.titlesContainer}>
                    <Text style={styles.title}>My Deck 2</Text>
                    <Text style={styles.subTitle}>3 cards</Text>
                </View>
               

                <TouchableOpacity style={[styles.button, styles.buttonAdd]}>
                    <Text >Add card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonAdd]}> 
                    <Text>Edit deck</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonQuiz]}>
                    <Text style={{color: 'white'}}>Start quiz</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default Deck

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