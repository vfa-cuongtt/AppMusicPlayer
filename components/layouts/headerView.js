'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { StyleSheet, Text, View} = ReactNative;
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon ,Tabs,List,ListItem,Thumbnail} from 'native-base';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var ListItemView = require('./listView.js');

class HeaderView extends Component {
  render() {
    return(
      <Container>
        <Header>
              <Button transparent>
                  <Icon name='ios-arrow-back' />
              </Button>
              <Title>{this.props.title}</Title>
        </Header>
        <Content>
            <ScrollableTabView >
                <View tabLabel='List Song'>
                    <ListItemView/>
                </View>
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
