
import React, {Component} from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js')
const { StyleSheet, View, Navigator} = ReactNative;
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
var ScrollableTabView = require('react-native-scrollable-tab-view');
var RNFS = require('react-native-fs');
var DATA = new Array();

export default class ListItemView extends Component {
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

      console.log('DATA',DATA);
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
    console.log('name: ', item.name);
    var name= item.name;
    var indexSong = DATA.findIndex(item => item.name == name);
      console.log('item',DATA.findIndex(item => item.name == name));
      console.log('All Item: ', DATA.length);

      //this.pushData(item);

      // this.props.navigator.push({
      //   id:'PlayView',
      //  listDATA: DATA,
      //  indexSong: indexSong,
      // });
  }

  pushData(item) {
    console.log('pushData',item);
    // this.props.navigator.pops({
    //   id:'PlayView',
    // });
  }




  // renderRow() {
  //   let rows = []
  //
  //   this.state.items.forEach((item,key) => {
  //     rows.push(
  //       <ListItem key={key} onPress={ () => {
  //           this.props.navigator.push({
  //             id:'PlayView'
  //           })
  //         }
  //       }>
  //       <Thumbnail square size={80} source={{uri: 'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg'}} />
  //         <Text style={{fontWeight: '600', }}>
  //           {item.name}
  //         </Text>
  //       </ListItem>
  //     )
  //   })
  //   return (
  //     <List>{ rows }</List>
  //   )
  // }

  render() {
    console.log('render loading is  '+ this.state.isLoading);
    if(this.state.isLoading ) {
      return(
        (
          <Spinner
            size='large' style={styles.container}/>
        )
      );

    }else {
      return(
        <List dataArray={this.state.items} renderRow={(item) =>
          <ListItem button onPress={this.setModalVisible.bind(this, item)}  >
          <Thumbnail square size={80} source={{uri: 'http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg'}} />
            <Text style={{fontWeight: '600', }}>
              {item.name}
            </Text>
          </ListItem>
        } />



      );
    }
  }
}

module.exports = ListItemView;
