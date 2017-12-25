import React, { Component } from 'react'
import { Text, View, StyleSheet, Switch, AsyncStorage, AppState } from 'react-native'

import { changeNotificationStatus, NOTIFICATION_KEY } from '../utils/helpers'
import { textStyles, colors } from '../utils/styles'
import { Permissions, Notifications } from 'expo'

//TODO: colocar um header
class Config extends Component {

    state = {
        notifications: false,
        allowed: false
    }

    componentDidMount(){
        AppState.addEventListener('change', this._handleAppStateChange)//this is necessary in the cases
        //where the user has notifications disabled for the app, then goes to iphone settings and allow notifications
        //so we have to change the state of our app

        this._loadNotificationState()
       
    }

    componentWillUpdate(nextProps, nextState){
        if(nextState.allowed && nextState.notifications !== this.state.notifications){
            changeNotificationStatus(nextState.notifications)
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if(nextAppState === 'active'){
            this._loadNotificationState()
        }
    }

    _loadNotificationState = () => {
        Permissions.getAsync(Permissions.NOTIFICATIONS).then(({status}) => {
            AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse)
            .then(data => {
                let notifications = (data === 'true' || data === true)
                let allowed = status === 'granted'
                this.setState({
                    allowed,
                    notifications
                })
            })
        })
    }

    handleSwitchValueChange = () => {
        this.setState((oldState) => {
            return {notifications: !oldState.notifications}
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={[styles.subContainer]}>
                   <View style={styles.item}>
                        <Text style={textStyles.title3}>Allow Notifications</Text>
                        <Switch value={this.state.allowed && this.state.notifications} onValueChange={this.handleSwitchValueChange}
                        disabled={!this.state.allowed}/>
                    
                    </View>
                  
                 {!this.state.allowed &&
                    <View style={styles.warning}>
                        <Text style={[textStyles.callout]}>You have to allow notifications for this app in settings</Text>
                    </View>}
                </View>
                
            </View>
        )
    }
}

export default Config

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subContainer: {
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 35,
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 30,
        backgroundColor: colors.white,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#D7DEE0',
        borderTopColor: '#D7DEE0'
    },
    warning: {
        margin: 15
    }
})