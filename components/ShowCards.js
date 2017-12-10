import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo, FontAwesome } from '@expo/vector-icons'


const cards = [
    {key: 1, question: 'This is question 1?', answer: 'yes'},
    {key: 2, question: 'This is question 2?his is question 2?his is question 2?is question 2?his is question 2?is question 2?his is question 2?', answer: 'yes'},
    {key: 3, question: 'This is question 3?', answer: 'yes'},
    {key: 4, question: 'This is question 4?', answer: 'yes'},
    {key: 5, question: 'This is question 5?', answer: 'yes'},
    {key: 6, question: 'This is question 6?', answer: 'yes'},
    {key: 7, question: 'This is question 7?', answer: 'yes'},
    {key: 8, question: 'This is question 8?', answer: 'yes'},
]

class ShowCards extends Component {

    render(){
        return (
            <View style={styles.container}>
                <FlatList data={cards}
                renderItem={({item}) => {
                    return (<View style={styles.items}>
                        <Text numberOfLines={3} style={styles.question}>{item.question}</Text>
                        <View style={styles.icons}>
                            <TouchableOpacity style={{marginRight: 15}}>
                                <Entypo name='edit' size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <FontAwesome name='remove' size={30} />
                            </TouchableOpacity>
                         </View>
                      
                    </View>)
                }}>
                    
                </FlatList>
            </View>
        )
    }
}

export default ShowCards

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    items: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#D7DEE0',
        backgroundColor: 'white',
        padding: 5,
        overflow: 'hidden'
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '35%',
        marginRight: 10
    },
    question: {
        width: '65%', 
        paddingLeft: 10,
        fontSize: 18
    }
})