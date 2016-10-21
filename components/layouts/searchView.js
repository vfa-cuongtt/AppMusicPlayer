'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { StyleSheet, View} = ReactNative;
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
  TextInput,
  Text,
  Input,
  InputGroup,

} from 'native-base';
var ScrollableTabView = require('react-native-scrollable-tab-view');


class SearchView extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
    };
  }
  search(){
    this.setState({
      isLoading: true,
    });
  }
  render() {
    return(
      <InputGroup>
          <Icon name="ios-search" />
          <Input
            placeholder="Search" value={this.state.search}
            onChangeText={(text) => this.setState({search:text})}
            onSubmitEditing={()=>this.search()}/>
      </InputGroup>

    );
  }
}

module.exports = SearchView;
