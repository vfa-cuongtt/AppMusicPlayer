import React, {Component} from "react";
import {
  StyleSheet,
  View,
  Text,Image,
  TouchableOpacity,
  Navigator,
  ListView
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
var Slider = require('react-native-slider');

var mp3;
var selectPlay = true;
var repeat = true;
//var playList = new Array();

var playList = [
  {
    name:'doorknockm_TOlojaF6.mp3',
    path:'./mp3files/doorknockm_TOlojaF6.mp3'
  },
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
var enumRepeatOne = 'repeatOne';
var enumRepeatAll = 'repeatAll';
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
      // songTitle: songTitle,
      // songPath: songPath,
      songTitle: playList[indexSong].name,
      songPath: playList[indexSong].path,
      //value: 0,
      currentTime: 0,
      duration: 0,

    };
    //console.log('path: ',this.props.songPath);
    // Test start
    //this.getSong();
    // Test end
  }

  loadSound(songPath) {
    mp3 = new Sound(songPath ,Sound.MAIN_BUNDLE, (error) => {
      if(error) {
        console.log('Failed to load sound', error);
      } else {
      //   console.log('duration in seconds: ' + mp3.getDuration() +
      //  ' number of channels: ' + mp3.getNumberOfChannels());
       //this.playMp3();
       this.setState({duration: mp3.getDuration()});
       this.checkPlay();
      }
    });
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
  checkTimer(){


  }


  playMp3() {

    //mp3.setCurrentTime();
    console.log('duration: ', this.state.duration);
//
    console.log('state currentTime : ', this.state.currentTime);
//

     var timer = this.state.currentTime / this.state.duration;
     this.setState({value: timer});

// mp3.getCurrentTime = function(checkTimer) {
//   console.log('33333333 ');
//     RNSound.getCurrentTime(1, checkTimer);
//
// };

//mp3.getCurrentTime((seconds) => console.log('at ' + seconds));

    mp3.setCurrentTime(this.state.currentTime);

    mp3.play(
      (success) => {
        if (success) {
          console.log('successfully finished playing');
          switch (enumKey) {
            case 'repeatOne':
              console.log('repeatOne bai hat');
              mp3.setNumberOfLoops(-1);
              mp3.play();
              break;
            case 'repeatAll':
              console.log('repeatAll bai hat ');
              this.nextSong();
              break;
            default:
              this.nextSong();
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

      mp3.getCurrentTime((seconds) => this.setState({currentTime: seconds}))
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
      console.log('repeat 1 bai: ', mp3.getNumberOfLoops());
        enumKey = enumRepeatOne;
        repeat = false;
    } else {
      enumKey = enumRepeatAll;
      repeat = true;
    }

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
      currentTime: 0,
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
      currentTime: 0,
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
      currentTime: 0,
    });
    console.log('songPath: ',playList[indexSong].path);
    mp3.pause();
    this.loadSound(playList[indexSong].path);
  }



  render() {
    return(
      <Container>
        <Header>
            <Button transparent onPress={this.navBackView.bind(this)}>
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
            <Image source={require('../../img/cogi.jpg')} style={styles.image}/>
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
