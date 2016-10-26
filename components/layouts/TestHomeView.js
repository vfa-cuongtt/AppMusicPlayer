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
  Spinner,
} from 'native-base';
//var ScrollableTabView = require('react-native-scrollable-tab-view');
import ScrollableTabView, {ScrollableTabBar } from 'react-native-scrollable-tab-view';
var ListItemView = require('./listView.js');
var SearchView = require('./searchView.js');
// Test Start
var RNFS = require('react-native-fs');
var DATA = new Array();

// Test End
class TestHomeView extends Component {

  constructor(props) {
    super(props);
    console.log('navigator',navigator);
    this.state = {
      items:[],
      isLoading: true,
      modalVisible: false,
      selectedItem: undefined,

    };

    this.loadData(function(m_DATA){});
  }


  // load data from Bundle
  loadData(callback){
    RNFS.readDir(RNFS.MainBundlePath + '/mp3files')
    .then((result) => {
      // Load file and push into array DATA
      for (var i = 0; i < result.length; i++) {
        DATA.push(result[i]);
      }


      callback(DATA);
      this.setState({
        items:  DATA,
        isLoading: false
      });
    })
    .catch((err) => {
      console.log(err.message, err.code);
      return false;
    });
  }

  setModalVisible(item) {

    //  console.log('visible',visible);
    //console.log('name: ', item.name);
    var name= item.name;
    var indexSong = DATA.findIndex(item => item.name == name);
      //console.log('item',DATA.findIndex(item => item.name == name));
      //console.log('All Item: ', DATA.length);

      //this.pushData(item);
      //console.log('DATA: ',this.state.items);
      this.props.navigator.push({
        id:'PlayView',
        passProps:{
          items: this.state.items,
          indexSong: indexSong,
        },

      });
  }

  render() {
    return(
      <Container>
        <Header>
        <Button transparent onPress={()=> {
          this.props.navigator.push({
            id:'PlayView',
          })
        }}>
            <Icon name='ios-arrow-back' />
        </Button>
              <Title>{this.props.title}</Title>
        </Header>
        <Content>
          <SearchView />
          <ScrollableTabView >
            <View tabLabel='List Song' style={{flex:1}}>
                {this.state.isLoading ? <Spinner size='large' style={styles.container}/> : <List dataArray={this.state.items} renderRow={(item) =>
                      <ListItem button onPress={this.setModalVisible.bind(this, item)}  >
                      <Thumbnail square size={80} source={{uri: 'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg'}} />
                        <Text style={{fontWeight: '600', }}>
                          {item.name}
                        </Text>
                      </ListItem>
                    } /> }
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
module.exports = TestHomeView;
