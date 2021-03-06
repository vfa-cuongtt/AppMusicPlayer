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
var isPlaying = true;
var repeat = true;

var playList = [];
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
    playList = this.props.items;
    indexSong = this.props.indexSong;

  //  console.log('playList[indexSong].path', playList[indexSong].path);
    allSong = playList.length - 1;
    //allSong = this.props.items.length - 1;
    //Test end
    //console.log('path: ', playList[indexSong].path);
    this.state={
      songTitle: playList[indexSong].name,
      songPath: playList[indexSong].path,
      thumb: playList[indexSong].thumb,
      currentTime: 0,
      duration: 0,
      repeatIcon: require('../../img/icon/repeatAllIcon.png'),
      previousIcon: require('../../img/icon/previousIcon.png'),
      playIcon: require('../../img/icon/playIcon.png'),
      arrowsIcon: require('../../img/icon/arrowsIcon.png'),
      shuffleIcon: require('../../img/icon/shuffleIcon.png'),
    };
    console.log('isPlaying', this.props.isPlaying);
    if(this.props.isPlaying) {
        this.playSong();
    }
  }

  /*
    Function: loadSound
  */
  loadSound(songPath) {
    mp3 = new Sound(songPath ,'', (error) => {
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

  /*
    Function: checkPlay
  */
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

  /*
    Function: playMp3
  */
  playMp3() {
    //mp3.setCurrentTime();
    console.log('duration: ', this.state.duration);
    console.log('state currentTime : ', this.state.currentTime);
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
  isPlaying = false;
}

  /*
    Function: Navigator Back View
  */
  navBackView() {
    mp3.stop();
    this.props.navigator.pop({
      id:'HomeView',
    })
  }

  /*
    Function: Play Song
  */
  playSong() {
    console.log('play');
    enumKey = enumPlay;
    //path = './mp3files/Cause I Love You - Noo Phuoc Thinh [MP3 128kbps].mp3';
    if(isPlaying) {
      this.loadSound(this.state.songPath);
      this.setState({
        playIcon: require('../../img/icon/playIcon.png')
      });
      isPlaying = false;
    } else {
      mp3.pause();
      this.setState({
        playIcon: require('../../img/icon/pauseIcon.png')
      });
      mp3.getCurrentTime((seconds) => this.setState({currentTime: seconds}))
      isPlaying = true;
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

  /*
    Function: Repeat Song
  */
  repeatSong() {
    console.log('repeat');
    if(repeat) {
      console.log('repeat 1 bai: ');
        enumKey = enumRepeatOne;
        repeat = false;
        this.setState({
          repeatIcon: require('../../img/icon/repeatOneIcon.png')
        });
    } else {
      enumKey = enumRepeatAll;
      console.log('repeat all bai: ');
      repeat = true;
      this.setState({
        repeatIcon: require('../../img/icon/repeatAllIcon.png')
      });
    }
  }
  /*
   Function: Rewind Song
  */
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

  /*
   Function: Next Song
  */
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

  /*
   Function: Random Song
  */
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
          <View>
              <View style={styles.songTitle}>
                <Text style={styles.titleText}>
                  {this.state.songTitle}
                </Text>
              </View>
              <View style={styles.imgPlayView}>
                <Image source={{  uri: 'data:image/png;base64,' + playList[indexSong].thumb}} style={styles.image}/>
              </View>

              <View style={styles.mediaView}>
                <View style={styles.mediaBtn}>
                <TouchableOpacity onPress={this.repeatSong.bind(this)} >
                <Image
                  style={styles.btnIcon}
                  source={this.state.repeatIcon}
                />
                </TouchableOpacity>
                </View>

                <View style={styles.mediaBtn}>
                  <TouchableOpacity onPress={this.rewindSong.bind(this)} >
                  <Image
                    style={styles.btnIcon}
                    source={this.state.previousIcon}
                  />
                  </TouchableOpacity>
                </View>

                <View style={styles.mediaBtn}>
                  <TouchableOpacity onPress={this.playSong.bind(this)}>
                  <Image
                    style={styles.btnIcon}
                    source={this.state.playIcon}
                  />
                  </TouchableOpacity>
                </View>

                <View style={styles.mediaBtn}>
                  <TouchableOpacity onPress={this.nextSong.bind(this)}>
                  <Image
                    style={styles.btnIcon}
                    source={this.state.arrowsIcon}
                  />
                  </TouchableOpacity>
                </View>

                <View style={styles.mediaBtn}>
                  <TouchableOpacity onPress={this.randomSong.bind(this)}>
                  <Image
                    style={styles.btnIcon}
                    source={this.state.shuffleIcon}
                  />
                  </TouchableOpacity>
                </View>
              </View>

            </View>
        </Content>
      </Container>
    );
  }
}
module.exports = PlayView;
