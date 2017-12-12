import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddeware from 'redux-thunk'


import Navigator from './navigator'
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(thunkMiddeware))

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <View style={styles.container}>
            <StatusBar />
            <Navigator />
          </View>
      </Provider>


    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
