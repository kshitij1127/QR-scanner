import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Scan from './screens/ScanScreen'

export default class App extends React.Component{
  render(){
    return(
      <AppContainer />
    )
  }
}

const appNavigator = createBottomTabNavigator({
  ScanScreen: {screen: Scan},
})

const AppContainer = createAppContainer(appNavigator)