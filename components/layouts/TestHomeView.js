'use strict';
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js');
// var ImgDefault  = require('../imgDefault') ;
// var ImgDefault = require('../imgDefalt.js');
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
    //this._setNewData(m_NewData)=::this.setNewData(m_NewData);
console.log('========== ',CONSTANTS.IMAGE.Image);
  }

  // load data from Bundle
  loadData(callback){
      RNFS.readDir(RNFS.MainBundlePath + '/mp3files')
      .then((result) => {
      // Load file and push into array DATA
      // console.log('MainBundlePath ',result);
      for (var i = 0; i < result.length; i++) {
        var arr = async(url,i) => {
          try {
             var tmpRe= await MediaMeta.get(url);
             tmpRe["id"]=i;
             return tmpRe;
          } catch (e) {
            console.error('error: ', e);
            return ;
          }
        };
        MetaData.push(arr(result[i].path,i));
        // arr(result[i].path,i).then( (tmpPromise) => {
        //   //  tmpPromise["i"] = i;
        //    console.log("i ===== ", tmpPromise);
        //    MetaData.push(tmpPromise);
        // });
        result[i]['title']='';
        result[i]['artist'] = '';
        result[i]['albumName'] = '';
        result[i]['thumb'] = '';
        DATA.push(result[i]);
      }
      console.log('DATA: ', DATA);
      console.log('MetaData: ', MetaData);
      // cho get data
      // DATA[1].metaObj.then(function(test){
      //     console.log('albumName: ', test.artist);
      // })
      //console.log('albumName: ', DATA[0].metaObj);

      // for (var i = 0 ; i < DATA.length ; i++) {
      //    DATA[i].metaTag.then(function(test){
      //        console.log('albumName: ', test);
      //       //DATA[i].push(test);
      //       //DataSearch.push(test);
      //   })
      // }

      for ( i= 0; i < MetaData.length; i++) {
        //MetaData[i].then(function(metaResult){
        //console.log('MetaData=======',MetaData[i]);
        console.log(' vo ne ');
        MetaData[i].then((metaResult)=>{
          // console.log("i=======" , metaResult );
           this.setNewData(metaResult);
          });
      }
        //console.log('NewData', NewData);
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

  setNewData=(m_NewData)=> {
    //console.log("Trumngbb_ setNewData",m_NewData);
    // console.log('m_NewDataasdasdasd: ', m_NewData);

    var {albumName, artist, title, thumb} = m_NewData;
    console.log("albumName========:   ", m_NewData);
    //console.log('m_NewData: ', m_NewData);

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
      // thumb = ImgDefault;
    }


    // for (let objData of DATA) {
    //   objData.title = title;
    //   objData.artist = artist;
    //   objData.albumName = albumName;
    //   objData.thumb = thumb;
    //
    // }
    // console.log("zzzzzzzzzzzzzzz"+ DATA);
    DATA[m_NewData.id].title=title;
    DATA[m_NewData.id].artist = artist;
    DATA[m_NewData.id].albumName = albumName;
    DATA[m_NewData.id].thumb = thumb;


    // for (let objData of DATA) {
    //
    // console.log('objData :  ',objData);
    // }

      //NewData.push(item);
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
