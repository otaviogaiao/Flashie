import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
//TODO: arrumar o problema com a opacidade
export default function Button({text, onPress, style, disabled, textStyle}) {
    let opacity = disabled === true ? 0.5 : 1
    console.log('opacity', opacity)
    return (
        <TouchableOpacity onPress={onPress} style={[defaultStyles.button, style, {opacity: opacity}]} 
            disabled={disabled}>
            <Text style={[defaultStyles.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )

}

const defaultStyles = StyleSheet.create({
    text: {
        color: 'white'
    },
    button: {
        backgroundColor: 'black',
        margin: 15,
        padding: 15,
        borderRadius: 10
    },
})