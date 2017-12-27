import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function Button({text, onPress, style, disabled, textStyle}) {
    const opacity = disabled ? 0.5 : 1

    return (
        <TouchableOpacity onPress={onPress}
            disabled={disabled}>
            <View style={[defaultStyles.button, style, {opacity}]}>
                <Text style={[defaultStyles.text, textStyle]}>{text}</Text>
            </View>
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
        borderRadius: 10,
        alignItems: 'center'
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