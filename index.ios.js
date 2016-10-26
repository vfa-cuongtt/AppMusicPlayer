/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Navigator
} from 'react-native';

var styles = require('./components/styles.js');
import SplashView from './components/layouts/splashView.js';
//import HomeView from './components/layouts/homeView.js'
import PlayView from './components/layouts/playView.js';
import TestHomeView from './components/layouts/TestHomeView.js'

export default class AppMusicPlayer extends Component {
  renderScene(route,navigator){
    _navigator = navigator;
    switch (route.id) {
      case 'SplashView':
        return (
          <SplashView navigator={navigator}
        />);
      // case 'HomeView':
      //   return (
      //     <HomeView navigator={navigator}
      //     title='Music Player'
      //   />);
      case 'PlayView':
        return (
          // <PlayView navigator={navigator}
          // songObject={route.passProps.songObject} />);
          <PlayView navigator = {navigator}
            title = 'Music Player'
            items = {route.passProps.items}
            indexSong = {route.passProps.indexSong}
          />);
      case 'TestHomeView':
        return (
          <TestHomeView navigator={navigator}
          title='Music Player'
        />);
        break;
      default:
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{id:'TestHomeView'}}
        renderScene={this.renderScene}
      />
    );
  }
}

AppRegistry.registerComponent('AppMusicPlayer', () => AppMusicPlayer);
