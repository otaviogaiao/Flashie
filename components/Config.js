import React, { Component } from 'react'
import { Text, View, StyleSheet, Switch, AsyncStorage, AppState } from 'react-native'
import { connect } from 'react-redux'

import { changeNotificationStatus, NOTIFICATION_KEY, setNotifications } from '../utils/api'
import { textStyles, colors } from '../utils/styles'
import { Permissions, Notifications, AppLoading } from 'expo'
import { loadNotificationConfig, updateNotificationConfig } from '../actions'

class Config extends Component {

    componentDidMount(){
        setNotifications().then(() => this.props.loadConfig())

        AppState.addEventListener('change', this._handleAppStateChange)//this is necessary in the cases
        //where the user has notifications disabled for the app, then goes to iphone settings and allow notifications
        //so we have to change the state of our app
       
    }

    componentWillUnmount(){
        AppState.removeEventListener('change')
    }

    componentWillUpdate(nextProps, nextState){
        if(nextProps.allowed && nextProps.notifications !== this.props.notifications){
            changeNotificationStatus(nextProps.notifications)
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if(nextAppState === 'active'){
            this.props.loadConfig()
        }
    }

    handleSwitchValueChange = (value) => {
        this.props.updateConfig(this.props.allowed, value)
    }

    render(){
        return (
            this.props.loading 
            ? <AppLoading />
            : <View style={styles.container}>
                <View style={[styles.subContainer]}>
                   <View style={styles.item}>
                        <Text style={textStyles.title3}>Allow Notifications</Text>
                        <Switch value={this.props.allowed && this.props.notifications} onValueChange={this.handleSwitchValueChange}
                        disabled={!this.props.allowed}/>
                    
                    </View>
                  
                 {!this.props.allowed &&
                    <View style={styles.warning}>
                        <Text style={[textStyles.callout]}>You have to allow notifications for this app in settings</Text>
                    </View>}
                </View>
                <View style={styles.message}>
                    <Text style={textStyles.footnote}>More options coming soon!</Text>
                </View>
                
            </View>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        loadConfig: () => dispatch(loadNotificationConfig()),
        updateConfig: (allowed, notifications) =>  dispatch(updateNotificationConfig(allowed, notifications))
    }
}

function mapStateToProps({config}){
    return {
        allowed: config.allowed,
        notifications: config.notifications,
        loading: config.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Config)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    subContainer: {
        alignItems: 'stretch',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 25,
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
        marginBottom: 15
    },
    message: {
        alignItems: 'center',
        paddingTop: 5
    }
})