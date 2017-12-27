import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddeware from 'redux-thunk'


import Navigator from './navigator'
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(thunkMiddeware))

/*
  Features extras:
    Editar e deletar um card já criado.(utilizando swipe left)
    Exibir a maior pontuação ao final de um quiz.
    Desabilitar as notificações atráves de tela própria dentro do app.
    Deletar um deck (utilizando swipe right)
*/

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
