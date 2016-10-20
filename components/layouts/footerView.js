'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { StyleSheet, Text, View} = ReactNative;
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon ,Tabs,List,ListItem,Thumbnail} from 'native-base';
//var ScrollableTabView = require('react-native-scrollable-tab-view');

class FooterView extends Component {
  render() {
    return(
      <Text>
        HeaderView
      </Text>
    );
  }
}

module.exports = FooterView;
