import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { suffleArray } from '../utils/helpers'
import Card from './Card'
import { updateLogs } from '../actions'
import { textStyles, colors } from '../utils/styles'


class Quiz extends Component {

    constructor(props){
        super(props)
        this.next = this.next.bind(this)
    }

    state = {
        cards: [],
        deck: null,
        index: 0,
        total: 0
    }

    componentDidMount(){
        this.setState(() => ({cards: suffleArray(this.props.cards), deck: this.props.deck, index: 0, total: 0}))
    }

    updateProgressCallback(){
        if(this.state.index >= this.state.cards.length){
            let { deck, total } = this.state

            total = total/this.state.cards.length * 100
            deck = {...deck , logs: deck.logs.concat([{day: Date.now(), correctPct: total}])}
            console.log('deck', deck)
            this.props.update(deck, this.state.cards)
        }
    }

    next(correct){
        if(this.state.index < this.state.cards.length){
            this.setState((oldState) => { 
                let { total, cards, index } = oldState
                correct && (total = total + 1)
                cards[index] = Object.assign({}, cards, {...cards[index], correct })
                return {index: index + 1, cards, total}
            }, this.updateProgressCallback)
        }
      
    }

    render(){
        const { cards, index, total } = this.state
        let result = total/cards.length * 100
        return (
        <View style={styles.container}>
            {index >= cards.length 
            ? <View style={styles.subContainer}>
                <View style={styles.resultView}>
                    <Text style={textStyles.title2}>You finished the quiz!</Text>

                    <Text style={textStyles.title2}>You got 
                        <Text style={[textStyles.title1, { color: result > 50 ? colors.green : colors.red }]}> {result}%</Text> right!</Text>
                </View>
              
              </View>
            :<View style={styles.subContainer}>
              <View style={styles.index}>
                <Text style={textStyles.title3}>{(index + 1) + '/' + cards.length}</Text>
              </View>
              
              <View style={styles.cards}>
                <Card card={cards[index]} next={this.next} />
              </View>
             
            </View>
            }
            
        </View>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        update: (deck, cards) => dispatch(updateLogs(deck, cards))
    }
}

function mapStateToProps(state, {navigation}){
    let deck = navigation.state.params.deck
    return {
        cards: Object.values(state.entity.cards).filter((card) => {
            return deck.cardsId.includes(card.cardId)
        }),
        deck
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'stretch',
        backgroundColor: 'white'
    },
    index: {
        alignItems: 'stretch',
        justifyContent: 'stretch',
        paddingLeft: 20,
        paddingTop: 5
    },
    subContainer:{
        flex: 1
    },
    cards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

Quiz.propTypes = {
    update: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
    deck: PropTypes.object.isRequired
}