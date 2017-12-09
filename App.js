import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Navigator from './navigator'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <Navigator />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
