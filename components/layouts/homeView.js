'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { StyleSheet, Text, View} = ReactNative;
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon ,
  Tabs,
  List,
  ListItem,
  Thumbnail,
  ScrollView,

} from 'native-base';
//var ScrollableTabView = require('react-native-scrollable-tab-view');
import ScrollableTabView, {ScrollableTabBar } from 'react-native-scrollable-tab-view';
var ListItemView = require('./listView.js');
var SearchView = require('./searchView.js');

class HomeView extends Component {

  constructor(props) {
    super(props);
    console.log('props: ', props);
  }
  render() {
    return(
      <Container>
        <Header>

          <Title>{this.props.title}</Title>
        </Header>
        <Content>
          <SearchView />
          <ScrollableTabView >

            <ListItemView navigator={navigator} tabLabel='List Song' style={{flex:1}} />

            <View tabLabel='Album'>
            </View>
            <View tabLabel='Singer'>
            </View>
          </ScrollableTabView>
        </Content>
      </Container>
    );
  }
}
module.exports = HomeView;
