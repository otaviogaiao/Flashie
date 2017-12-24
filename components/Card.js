import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

class Card extends Component {

    state = {
        answered: false
    }

    componentWillReceiveProps(){
        this.setState({
            answered: false
        })
    }

    render(){
        let answered = this.state.answered
        let  { card } = this.props
        return (
          <View style={{alignItems: 'stretch', justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}}>
                <Text style={[styles.title, styles.textView]}>{answered ? card.answer : card.question}</Text>
            </View>
           
            <TouchableOpacity onPress={() => {this.setState({answered: !answered})}} style={styles.textView}>
                <Text style={styles.text}>{answered ? 'Question' : 'Answer'}</Text>
            </TouchableOpacity>  

            { answered &&  
            <View style={{alignItems: 'stretch'}}>
                <TouchableOpacity style={[styles.button, {backgroundColor: 'green'}]} 
                onPress={() => this.props.next(true)}>
                    <Text style={{color: 'white'}}>Correct</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]}  
                onPress={() => this.props.next(false)}>
                    <Text style={{color: 'white'}}>Incorrect</Text>
                </TouchableOpacity>
             </View>}

             <View style={[styles.textView, styles.bottomText]}>
                 <Text style={{color: card.correct ? 'green' : 'red', fontSize: 25}}>You got it {card.correct ? 'right' : 'wrong'} last time!</Text>
             </View>
           
           </View>
        )
    }
}

export default Card 

const styles = StyleSheet.create({
    button: {
        margin: 5,
        padding: 15,
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 38
    },
    text: {
        fontSize: 20,
        color: 'red'
    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomText: {
        alignItems: 'flex-end'
    }
})