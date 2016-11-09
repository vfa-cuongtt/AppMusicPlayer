'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js');
import CONSTANTS from '../constants';
const { StyleSheet, Text, View,Alert} = ReactNative;
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
  Spinner,InputGroup,Input
} from 'native-base';
//var ScrollableTabView = require('react-native-scrollable-tab-view');
import ScrollableTabView, {ScrollableTabBar } from 'react-native-scrollable-tab-view';
var ListItemView = require('./listView.js');
var SearchView = require('./searchView.js');
var RNFS = require('react-native-fs');
import MediaMeta from 'react-native-media-meta';
var DATA = new Array();
var MetaData = new Array();
var NewData=[] ;
var myThumb;

class TestHomeView extends Component {
  constructor(props) {
    super(props);
    var self = this;
    this.arrtest = '';
    this.state = {
      items: [],
      isLoading: true,
      modalVisible: false,
      selectedItem: undefined,
      search: '',
    };
    this.loadData(function(m_DATA){});
  }

  // load data from Bundle
  loadData(callback){
      RNFS.readDir(RNFS.MainBundlePath + '/mp3files')
      .then((result) => {
      // Load file and push into array DATA
      for (var i = 0; i < result.length; i++) {
        var arr = async(url,i) => {
          try {
            // get metadata in song
             var tmpRe= await MediaMeta.get(url);
             // add element id to tmpRe
             tmpRe["id"]=i;
             return tmpRe;
          } catch (e) {
            console.error('error: ', e);
            return ;
          }
        };
        // push MetaData to new array
        MetaData.push(arr(result[i].path,i));
        result[i]['title']='';
        result[i]['artist'] = '';
        result[i]['albumName'] = '';
        result[i]['thumb'] = '';

        // push result to array DATA
        DATA.push(result[i]);
      }
      console.log('DATA: ', DATA);
      console.log('MetaData: ', MetaData);

      for ( i= 0; i < MetaData.length; i++) {
        //MetaData[i].then(function(metaResult){
        MetaData[i].then((metaResult)=>{
           this.setNewData(metaResult);
          });
      }
      callback(DATA);

      // set DATA to items in state
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

  /*
    Function setNewData to DATA
  */

  setNewData=(m_NewData)=> {
    // get data to m_NewData
    var {albumName, artist, title, thumb} = m_NewData;

    // Check data in m_NewData
    if(m_NewData.albumName == null) {
      albumName = 'albumName';
    }
    if(m_NewData.artist == null) {
      artist = 'artist';
    }
    if(m_NewData.title == null) {
      title = 'title';
    }
    if(m_NewData.thumb == null) {
       thumb = CONSTANTS.IMAGE.Image;
    }

    // modify data from m_NewData to DATA
    DATA[m_NewData.id].title=title;
    DATA[m_NewData.id].artist = artist;
    DATA[m_NewData.id].albumName = albumName;
    DATA[m_NewData.id].thumb = thumb;
  }

  /*
    Function setModalVisible item
  */
  setModalVisible(item) {
    var name= item.name;
    var indexSong = DATA.findIndex(item => item.name == name);
    this.props.navigator.push({
      id:'PlayView',
      passProps:{
        items: DATA,
        indexSong: indexSong,
        isPlaying: true
      },
    });
  }
  /*
    Function Search
  */
  search() {
    this.setState({
      isLoading: true,
    });
    console.log('search:  ', this.state.search);
    if(this.state.search !== '') {
      for (var i = 0; i < DATA.length; i++) {
        var keySearch = this.state.search.toLowerCase();
        var keyName = DATA[i].name.toLowerCase();

        if(keyName.indexOf(keySearch)!==-1) {
          DataSearch.push(DATA[i]);
          this.setState({
            items: DataSearch,
            isLoading: false
          });
        } else {
          Alert.alert('Error','The song does not exist');
          this.setState({
            items:  DATA,
            isLoading: false
          });
          break;
        }
      }

    } else {
      this.setState({
        items:  DATA,
        isLoading: false
      });
    }
  }


  render() {
    return(
      <Container>
        <Header>
          <Title>{this.props.title}</Title>
        </Header>
        <Content>

        <InputGroup>
          <Icon name="ios-search" />
          <Input
            placeholder="Search" value={this.state.search}
            onChangeText={(text) => this.setState({search:text})}
            onSubmitEditing={()=>this.search()}/>
        </InputGroup>

          <ScrollableTabView style={{flex:1,}}>
            <View tabLabel='List Song' style={{flex: 1,height: 510}}>
                {this.state.isLoading ? <Spinner size='large' style={styles.container}/> :
                  <View style={{flex: 1}}>
                    <List style={{flexDirection: 'column',flex: 1,}}
                        dataArray={this.state.items}
                        renderRow={(item) =>
                          <ListItem button onPress={this.setModalVisible.bind(this, item)} style={{flex:1,}} >

                              <Thumbnail square size={83} source={{  uri: 'data:image/png;base64,' + item.thumb}} />

                            <Text style={{fontWeight: 'bold', }}>
                              {item.name}
                            </Text>
                          </ListItem>
                        } />
                  </View>
                }
            </View>

            <View tabLabel='Album' style={{flex: 1,height: 510}}>
              {this.state.isLoading ? <Spinner size='large' style={styles.container}/> :
                <View style={{flex: 1}}>
                  <List style={{flexDirection: 'column',flex: 1,}}
                      dataArray={this.state.items}
                      renderRow={(item) =>
                        <ListItem button onPress={this.setModalVisible.bind(this, item)} style={{flex:1,}} >

                            <Thumbnail square size={83} source={{  uri: 'data:image/png;base64,' + item.thumb}} />

                          <Text style={{fontWeight: 'bold', }}>
                            {item.albumName}
                          </Text>
                        </ListItem>
                      } />
                </View>
              }
            </View>

            <View tabLabel='Singer' style={{flex: 1,height: 510}}>
              {this.state.isLoading ? <Spinner size='large' style={styles.container}/> :
                <View style={{flex: 1}}>
                  <List style={{flexDirection: 'column',flex: 1,}}
                      dataArray={this.state.items}
                      renderRow={(item) =>
                        <ListItem button onPress={this.setModalVisible.bind(this, item)} style={{flex:1,}} >

                            <Thumbnail square size={83} source={{  uri: 'data:image/png;base64,' + item.thumb}} />

                          <Text style={{fontWeight: 'bold', }}>
                            {item.artist}
                          </Text>
                        </ListItem>
                      } />
                </View>
              }
            </View>

          </ScrollableTabView>
        </Content>
      </Container>
    );
  }
}
module.exports = TestHomeView;
