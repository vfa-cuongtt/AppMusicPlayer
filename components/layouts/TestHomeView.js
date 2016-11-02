'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
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
var DataSearch = new Array();
var myThumb;
class TestHomeView extends Component {


  constructor(props) {
    super(props);
    console.log('navigator',navigator);
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

        // MediaMeta.get(result[i].path).then(resultMeta => {DATA.push(resultMeta)})
        //   .catch(e => console.error(e)
        //
        // );
        var arr = async(url) => {
          try {
             return await MediaMeta.get(url);
          } catch (e) {
            console.error('error: ', e);
            return ;
          }
        };
        result[i].metaTag = arr(result[i].path);
        DATA.push(result[i]);
      }
      console.log('DATA: ', DATA);
      // cho get data
      // DATA[1].metaObj.then(function(test){
      //     console.log('albumName: ', test.artist);
      // })
      //console.log('albumName: ', DATA[0].metaObj);

      for (var i = 0 ; i < DATA.length ; i++) {
         DATA[i].metaTag.then(function(test){
             console.log('albumName: ', test);
            //DATA[i].push(test);
            //DataSearch.push(test);
        })
      }
      callback(DATA);
      this.setState({
        items:  DATA,
        metaTag: DATA.metaTag,
        isLoading: false
      });
    })
    .catch((err) => {
      console.log(err.message, err.code);
      return false;
    });
  }

  getMetaData() {
    console.log('getMetaData: ', this.DataSearch);
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
          items: DATA,
          indexSong: indexSong,
          isPlaying: true
        },
      });
  }

search() {
  this.setState({
    isLoading: true,
  });
  console.log('search:  ', this.state.search);
///asdasdas
  if(this.state.search !== '') {
    for (var i = 0; i < DATA.length; i++) {
      // var song=this.state.items[i];
      // var myMeta = song.metaTag;
      //
      // song.metaTag.then(function(value){
      //    myThumb = value.thumb;
      // });
      //
      // console.log("==Thumb==");
      // console.log(myThumb);
      // // song.metaObj
      var keySearch = this.state.search.toLowerCase();
      var keyName = DATA[i].name.toLowerCase();


      if(keyName.indexOf(keySearch)!==-1) {
        console.log('=== Tim duoc roi ====',);
        console.log( DATA[i].name);
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
    if(this.state.isLoading) {
        console.log('getMetaData: ', this.DataSearch);
    }

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
                    <List  style={{flexDirection: 'column',flex: 1,}} dataArray={this.state.items} renderRow={(item) =>
                          <ListItem button onPress={this.setModalVisible.bind(this, item)} style={{flex:1,}} >
                          <Thumbnail square size={83} source={{ uri: 'https://s-media-cache-ak0.pinimg.com/236x/72/66/d7/7266d7166fb04cfb52c3ab0fa47e3b78.jpg'}} />
                            <Text style={{fontWeight: 'bold', }}>
                              {item.name}
                            </Text>
                          </ListItem>
                        } />
                  </View>
                }


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
