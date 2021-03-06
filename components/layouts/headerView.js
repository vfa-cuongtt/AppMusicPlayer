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

class HeaderView extends Component {
  render() {
    return(
      <Container>
        <Header>
        <Button transparent onPress={()=> {
          this.props.navigator.push({
            id:'HomeView',
          })
        }}>
            <Icon name='ios-arrow-back' />
        </Button>
              <Title>{this.props.title}</Title>
        </Header>
        <Content>
          <SearchView />
          <ScrollableTabView >
              <ListItemView tabLabel='List Song' style={{flex:1}}/>
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

module.exports = HeaderView;
