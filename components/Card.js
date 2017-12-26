import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import PropTypes from 'prop-types'

import Button from './Button'
import { textStyles, colors } from '../utils/styles'

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
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {!answered ? <Animated.View style={[frontAnimatedStyle, styles.flipCard]}>
                <View style={{alignItems: 'center'}}>
                    <Text style={[textStyles.title1, styles.textView]}>{card.question}</Text>
                </View>
                           
                <TouchableOpacity onPress={() => {this.setState({answered: !answered}), this.flipCard()}} style={styles.textView}>
                    <Text style={[textStyles.headline, {color: colors.red}]}>See Answer</Text>
                </TouchableOpacity>

                { card.hasOwnProperty('correct') &&
                    <View style={[styles.textView, styles.bottomText]}>
                        <Text style={[{color: card.correct ? colors.green : colors.red}, textStyles.title3]}>You got it {card.correct ? 'right' : 'wrong'} last time!</Text>
                    </View>
                      }
            </Animated.View>
            :
            <Animated.View style={[backAnimatedStyle, styles.flipCard]}>
                <View style={{alignItems: 'center'}}>
                    <Text style={[textStyles.title1, styles.textView]}>{card.answer}</Text>
                </View>
                           
                <TouchableOpacity onPress={() => {this.setState({answered: !answered}), this.flipCard()}} 
                    style={styles.textView}>
                    <Text style={[textStyles.headline, {color: colors.red}]}>See Question</Text>
                </TouchableOpacity>

                <View style={styles.buttonView}>
                    <Button style={[styles.button, {backgroundColor: colors.green}]} text='Correct'
                     onPress={() => this.props.next(true)} 
                     textStyle={textStyles.body} />

                     <Button style={[styles.button, {backgroundColor: colors.red}]} 
                     onPress={() => this.props.next(false)} text='Incorrect' 
                     textStyle={textStyles.body} />

                </View>

                { card.hasOwnProperty('correct') &&
                        <View style={[styles.textView, styles.bottomText]}>
                            <Text style={[{color: card.correct ? colors.green : colors.red}, textStyles.title3]}>You got it {card.correct ? 'right' : 'wrong'} last time!</Text>
                        </View>
                }

            </Animated.View>}

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
        marginTop: 10,
        marginBottom: 20
    },
    bottomText: {
        alignItems: 'flex-end'
    },
    flipCard: {
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden'
    },
    buttonView: {
        alignItems: 'stretch',

    }
})

Card.propTypes = {
    card: PropTypes.object.isRequired,
    next: PropTypes.func.isRequired
}