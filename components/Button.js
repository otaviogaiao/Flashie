import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

//TODO: arrumar o problema com a opacidade
export default function Button({text, onPress, style, disabled, textStyle}) {
    let opacity = disabled === true ? 0.5 : 1
    // console.log('opacity', opacity)
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

Button.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
    disabled: PropTypes.bool,
    textStyle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ])
}