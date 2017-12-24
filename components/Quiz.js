import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { suffleArray } from '../utils/helpers'
import Card from './Card'
import { updateLogs } from '../actions'


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
                let { cards, total } = oldState
                correct && (total = total + 1)
                cards[oldState.index]['correct'] = correct
                return {index: oldState.index + 1, cards, total}
            }, this.updateProgressCallback)
        }
      
    }

    render(){
        const { cards, index, total } = this.state
        let result = total/cards.length * 100
        return (
        <View style={styles.container}>
            {index >= cards.length 
            ? <View>
                <Text>You finished the quiz!</Text>

                <Text>You got {result}% right!</Text>
              </View>
            :<View>
              <Text style={{fontSize: 25, alignSelf: 'flex-start'}}>{(index + 1) + '/' + cards.length}</Text>

              <Card card={cards[index]} next={this.next} />
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
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    }
})