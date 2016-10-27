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
var RNFS = require('react-native-fs');
import MediaMeta from 'react-native-media-meta';
var DATA = new Array();

class TestHomeView extends Component {

  constructor(props) {
    super(props);
    console.log('navigator',navigator);
    this.arrtest = '';
    this.state = {
      items:[],
      isLoading: true,
      modalVisible: false,
      selectedItem: undefined,

    };
    this.loadData(function(m_DATA){});
    this.getMetaData();
  }

  // load data from Bundle
  loadData(callback){
    RNFS.readDir(RNFS.MainBundlePath + '/mp3files')
    .then((result) => {
      // Load file and push into array DATA

      for (var i = 0; i < result.length; i++) {

        // MediaMeta.get(result[i].path).then(resultMeta => {DATA.push(resultMeta)})
        //   .catch(e => console.error(e)
        //
        // );
        var arr = async(url) => {
        try {
           return await MediaMeta.get(url);


        } catch (e) {

        } finally {

        }
      };
        result[i].metaObj = arr(result[i].path);
        DATA.push(result[i]);

      }
      console.log('DATA: ', DATA);
      // cho get data
      // DATA[1].metaObj.then(function(test){
      //     console.log('albumName: ', test.artist);
      // })
      //console.log('albumName: ', DATA[0].metaObj);
      for (var i = 0 ; i < DATA.length ; i++) {
        DATA[i].metaObj.then(function(test){
            console.log('albumName: ', test);
            DATA.push(test);
        })
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

  getMetaData() {

    console.log('getMetaData: ', this.state.items.albumName);
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
          isPlaying: true
        },

      });
  }

  render() {
    // MediaMeta.get(savePath)
    //   .then(result => {})
    //   .catch(e => console.error(e));
    return(
      <Container>
        <Header>
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
