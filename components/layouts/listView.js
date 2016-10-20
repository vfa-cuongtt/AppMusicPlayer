'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { StyleSheet, View,ActivityIndicatorIOS} = ReactNative;
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
} from 'native-base';
var ScrollableTabView = require('react-native-scrollable-tab-view');
var RNFS = require('react-native-fs');
var DATA = new Array();

class ListItemView extends Component {
  // load data from Bundle
  loadData(callback){
    RNFS.readDir(RNFS.MainBundlePath + '/mp3files')
    .then((result) => {
      // Load file and push into array DATA
      for (var i = 0; i < result.length; i++) {
        DATA.push(result[i]);
      }

      console.log('DATA',DATA);
      callback(DATA);
      this.setState({
        //dataList:this.state.dataSource.cloneWithRows(DATA),
        items:  DATA,
         isLoading: false
      });
    })
    .catch((err) => {
      console.log(err.message, err.code);
      return false;
    });
  }

  setModalVisible(visible, x) {
          this.setState({
              modalVisible: visible,
              selectedItem: x
          });
          console.log('visible',visible);
      }


  constructor(props) {
    super(props);

    this.state = {
      //dataSource : new ListView.DataSource({ rowHasChanged:(r1,r2) => r1 != r2 }),
      items:[],
      isLoading: true,
    };
    this.loadData(function(m_DATA){});
  }

  render() {
    console.log('render loading is  '+ this.state.isLoading);
    if(this.state.isLoading ) {
      return(
        (
          <ActivityIndicatorIOS
            size='large' style={styles.container}/>
        )
      );

    }else {
      return(
        <List dataArray={this.state.items} renderRow={(item) =>
            <ListItem button onPress={()=>this.setModalVisible(true, item)}  >
            <Thumbnail square size={80} source={{uri: 'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg'}} />
              <Text>
                {item.name}
              </Text>
            </ListItem>
        } />
      );
    }
  }
}

module.exports = ListItemView;
