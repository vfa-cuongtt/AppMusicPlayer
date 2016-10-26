'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { StyleSheet, View,Navigator} = ReactNative;
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
    ListView,
    Text,
    Spinner,
} from 'native-base';

class SplashView extends Component {
  
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
      </Container>
    );
  }
}
module.exports = SplashView;
