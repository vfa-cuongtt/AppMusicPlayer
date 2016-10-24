import React, {Component} from "react";
import {
  StyleSheet,
  View,
  Text,Image,
  TouchableOpacity,
  Navigator,ListView

} from "react-native";
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

} from 'native-base';
var styles = require('../styles.js');
var Sound = require('react-native-sound');
var mp3;
var selectPlay = true;
var repeat = true;
//var playList = new Array();

var playList = [
  {
    name:'Cause I Love You - Noo Phuoc Thinh [MP3 128kbps].mp3',
    path:'./mp3files/Cause I Love You - Noo Phuoc Thinh [MP3 128kbps].mp3'
  },
  {
    name:'Anh Cu Di Di.mp3',
    path:'./mp3files/Anh Cu Di Di.mp3'
  },
  {
    name:'Co Khi Nao Roi Xa - Bich Phuong [MP3 128kbps].mp3',
    path:'./mp3files/Co Khi Nao Roi Xa - Bich Phuong [MP3 128kbps].mp3'
  },
  {
    name:'Gat Di Nuoc Mat - Noo Phuoc Thinh_ Tonny [MP3 128kbps].mp3',
    path:'./mp3files/Gat Di Nuoc Mat - Noo Phuoc Thinh_ Tonny [MP3 128kbps].mp3'
  },
  {
    name:'Gui Anh Xa Nho - Bich Phuong [MP3 128kbps].mp3',
    path:'./mp3files/Gui Anh Xa Nho - Bich Phuong [MP3 128kbps].mp3'
  },
  {
    name:'Guong Mat la Lam.mp3',
    path:'./mp3files/Guong Mat la Lam.mp3'
  },
];

var enumRewind = 'rewind';
var enumPlay = 'play';
var enumNext = 'next';
var enumRandom = 'random';
var enumKey;

var indexSong;
var nextSong;
var allSong;
class PlayView extends Component {
  constructor(props) {
    super(props);
    //console.log('play View', this.props.songObject.name);

    // songTitle = this.props.listDATA[this.props.indexSong].name;
    // songPath = this.props.listDATA[this.props.indexSong].path;
    // Test start
    indexSong = 0;
    console.log('all Song ', playList.length - 1);
    allSong = playList.length - 1;
    //Test end
    this.state={
      //songTitle:'Cause I Love You - Noo Phuoc Thinh [MP3 128kbps].mp3',
      // songTitle: songTitle,
      // songPath: songPath,
      songTitle: playList[indexSong].name,
      songPath: playList[indexSong].path,

    };
    //console.log('path: ',this.props.songPath);
    // Test start
    //this.getSong();
    // Test end

    // API play song
    // mp3 = new Sound(this.props.songObject.path , '', (error) => {
    //mp3 = new Sound('./mp3files/Cause I Love You - Noo Phuoc Thinh [MP3 128kbps].mp3' ,Sound.MAIN_BUNDLE, (error) => {

    // mp3 = new Sound('./mp3files/Cause I Love You - Noo Phuoc Thinh [MP3 128kbps].mp3' ,Sound.MAIN_BUNDLE, (error) => {
    //   if(error) {
    //     console.log('Failed to load sound', error);
    //   } else {
    //     console.log('Load sound success');
    //     console.log('duration in seconds: ' + mp3.getDuration() +
    //    ' number of channels: ' + mp3.getNumberOfChannels());
    //   }
    // });

  }

  // getSong(property) {
  //   console.log('song Path: ', playList[5].path );
  //   var title = playList[5].name;
  //   var path = playList[5].path;
  //   this.setState({
  //     songTitle: title,
  //     songPath: path,
  //   });
  // }

  loadSound(songPath) {
    mp3 = new Sound(songPath ,Sound.MAIN_BUNDLE, (error) => {
      if(error) {
        console.log('Failed to load sound', error);
      } else {
      //   console.log('duration in seconds: ' + mp3.getDuration() +
      //  ' number of channels: ' + mp3.getNumberOfChannels());
       //this.playMp3();
       this.checkPlay();
      }
    });
    // switch (enumKey) {
    //   case 'next':
    //        console.log('asdas');
    //
    //
    //    case 'rewind':
    //        console.log('rewind ne ma');
    //      break;
    //     break;
    //   default:
    //
    // }

  }
  //Test Enum start
  checkPlay() {
    switch (enumKey) {
      case 'rewind':
        console.log('rewind ne');
        //mp3.stop();
        this.playMp3();
        break;
      case 'play' :
        console.log('play ne');
        this.playMp3();
        break;
      case 'next' :
        console.log('next ne');
        //mp3.stop();
        this.playMp3();
        break;
      case 'random':
        console.log('random ne ');
        this.playMp3();
        break;
      default:

    }

  }
  // Test enum end

  playMp3() {

        //if(selectPlay) {
          mp3.play(
            (success) => {
              if (success) {
                console.log('successfully finished playing');
                switch (enumKey) {
                  case 'repeatOne':
                    console.log('repeatOne bai hat');
                    break;
                  case 'repeatAll':
                    console.log('repeatAll bai hat ');
                    break;
                  default:
                }
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            }
          );
            selectPlay = false;
          // } else {
          //   mp3.pause();
          //   selectPlay = true;
          // }

      // this.setState({
      //   imgPlay:require('../images/icon/pause@2x.png')
      // });

  }

  navBackView() {
    this.props.navigator.pop({
      id:'HomeView',
    })
  }
    // Function: Play Song
  playSong() {
    console.log('play');
    enumKey = enumPlay;
    //path = './mp3files/Cause I Love You - Noo Phuoc Thinh [MP3 128kbps].mp3';
    if(selectPlay) {
      selectPlay = true;
      this.loadSound(this.state.songPath);

    } else {
      mp3.pause();
      selectPlay = true;
    }

      //   if(selectPlay) {
      //     mp3.play((success) => {
      //       if(success){
      //         console.log('choi xong roi');
      //         // switch (enumKey) {
      //         //   case enumKey.repeat:
      //         //       console.log('danng repeat');
      //         //     break;
      //         //   default:
      //         //
      //         // }
      //       }
      //     });
      //     selectPlay = false;
      //     // this.setState({
      //     //   imgPlay:require('../images/icon/pause@2x.png')
      //     // });
      //   } else {
      //     mp3.pause();
      //     selectPlay = true;
      //     // this.setState({
      //     //   imgPlay:require('../images/icon/play@2x.png')
      //     // });
      //   }
      // }
    }



  //Function: Repeat Song
  repeatSong() {
    console.log('repeat');
    if(repeat) {
        enumKey = 'repeatOne';
        repeat = false;
    } else {
      enumKey = 'repeatAll';
      repeat = true;

    }

    //
    // this.checkEnum();
  }

  // Function: Rewind Song
  rewindSong() {
    enumKey = enumRewind;
    indexSong = indexSong - 1;
    if(indexSong == -1 ) {
      indexSong = allSong;
    }
    console.log('indexSong', indexSong);
    this.setState({
      songTitle: playList[indexSong].name,
      //songPath: playList[indexSong].path,
    });

    console.log('songPath: ',playList[indexSong].path);
    mp3.pause();
    this.loadSound(playList[indexSong].path);
  }

  // Function: Next Song
  nextSong() {
    enumKey = enumNext;
    indexSong = indexSong + 1;
    if(indexSong > allSong) {
      indexSong = 0 ;
    }
    this.setState({
      songTitle: playList[indexSong].name,
      songPath: playList[indexSong].path,
    });
    console.log('songPath: ',playList[indexSong].path);
    mp3.pause();
    this.loadSound(playList[indexSong].path);


  }

  // Function: Random Song
  randomSong() {
    enumKey = enumRandom;
    indexSong = Math.floor(Math.random() * allSong);
    this.setState({
      songTitle: playList[indexSong].name,
      songPath: playList[indexSong].path,
    });
    console.log('songPath: ',playList[indexSong].path);
    mp3.pause();
    this.loadSound(playList[indexSong].path);




  }

  render() {
    return(
      <Container>
        <Header>
            <Button transparent onPress={this.navBackView}>
                <Icon name='ios-arrow-back' />
            </Button>
            <Title>{this.props.title}</Title>
        </Header>
        <Content>
          <View style={styles.songTitle}>
            <Text>
              {this.state.songTitle}
            </Text>
          </View>
          <View style={styles.imgPlayView}>
            <Image source={require('../../img/cogi.jpg')} style={{marginLeft:13,width:350,height:350}}/>
          </View>

          <View style={styles.mediaView}>
            <View style={styles.mediaBtn}>
            <TouchableOpacity onPress={this.repeatSong.bind(this)} >
              <Text>
                Repeat
              </Text>
            </TouchableOpacity>
            </View>

            <View style={styles.mediaBtn}>
              <TouchableOpacity onPress={this.rewindSong.bind(this)} >
                <Text>
                  Rewind
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mediaBtn}>
              <TouchableOpacity onPress={this.playSong.bind(this)}>
                <Text>
                  Play
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mediaBtn}>
              <TouchableOpacity onPress={this.nextSong.bind(this)}>
                <Text>
                  Next
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mediaBtn}>
              <TouchableOpacity onPress={this.randomSong.bind(this)}>
              <Text>
                Random
              </Text>
              </TouchableOpacity>
            </View>
          </View>


        </Content>


      </Container>





    );
  }
}
module.exports = PlayView;
