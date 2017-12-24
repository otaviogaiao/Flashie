import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'

class Card extends Component {

    state = {
        answered: false
    }

    componentWillMount(){
       this.configureAnimation()
    }

    componentWillReceiveProps(){
        this.setState({
            answered: false
        })
       this.configureAnimation()
    }

    configureAnimation(){
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
          this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg']
        })
    }

    flipCard() {
        if (this.value >= 90) {
          Animated.spring(this.animatedValue,{
            toValue: 0,
            friction: 8,
            tension: 10
          }).start();
        } else {
          Animated.spring(this.animatedValue,{
            toValue: 180,
            friction: 8,
            tension: 10
          }).start();
        }
    
      }

    render(){
        const frontAnimatedStyle = {
            transform: [
              { rotateY: this.frontInterpolate}
            ]
          }
        const backAnimatedStyle = {
            transform: [
              { rotateY: this.backInterpolate }
            ]
          }

        let answered = this.state.answered
        let  { card } = this.props
        return (
          <View style={{alignItems: 'stretch', justifyContent: 'center'}}>
            <Animated.View style={[frontAnimatedStyle, styles.flipCard]}>
                <View style={{alignItems: 'center'}}>
                    <Text style={[styles.title, styles.textView]}>{card.question}</Text>
                </View>
                           
                <TouchableOpacity onPress={() => {this.setState({answered: !answered}), this.flipCard()}} style={styles.textView}>
                    <Text style={styles.text}>Answer</Text>
                </TouchableOpacity>

                { card.hasOwnProperty('correct') &&
                    <View style={[styles.textView, styles.bottomText]}>
                        <Text style={{color: card.correct ? 'green' : 'red', fontSize: 25}}>You got it {card.correct ? 'right' : 'wrong'} last time!</Text>
                    </View>
                      }
            </Animated.View>
           
            <Animated.View style={[backAnimatedStyle, styles.flipCard]}>
                <View style={{alignItems: 'center'}}>
                    <Text style={[styles.title, styles.textView]}>{card.answer}</Text>
                </View>
                           
                <TouchableOpacity onPress={() => {this.setState({answered: !answered}), this.flipCard()}} style={styles.textView}>
                    <Text style={styles.text}>Question</Text>
                </TouchableOpacity>

                <View style={{alignItems: 'stretch'}}>
                    <TouchableOpacity style={[styles.button, {backgroundColor: 'green'}]} 
                    onPress={() => this.props.next(true)}>
                        <Text style={{color: 'white'}}>Correct</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]}  
                    onPress={() => this.props.next(false)}>
                        <Text style={{color: 'white'}}>Incorrect</Text>
                    </TouchableOpacity>
                </View>

                { card.hasOwnProperty('correct') &&
                        <View style={[styles.textView, styles.bottomText]}>
                            <Text style={{color: card.correct ? 'green' : 'red', fontSize: 25}}>You got it {card.correct ? 'right' : 'wrong'} last time!</Text>
                        </View>
                }

            </Animated.View>

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
    },
    flipCard: {
        backfaceVisibility: 'hidden'
    }
})