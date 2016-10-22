import React, {Component} from "react";
import {
  StyleSheet,
  View,
  Text,Image,
  TouchableOpacity,
  Navigator,

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

class PlayView extends Component {
  constructor(props) {
    super(props);
    //console.log('play View', this.props.songObject.name);
    this.state={
      songTitle:'Cause I Love You - Noo Phuoc Thinh [MP3 128kbps].mp3'
    };
    // API play song
    // mp3 = new Sound(this.props.songObject.path , '', (error) => {
    mp3 = new Sound('./mp3files/Cause I Love You - Noo Phuoc Thinh [MP3 128kbps].mp3' ,Sound.MAIN_BUNDLE, (error) => {
      if(error) {
        console.log('Failed to load sound', error);
      } else {
        console.log('Load sound success');
        console.log('duration in seconds: ' + mp3.getDuration() +
       ' number of channels: ' + mp3.getNumberOfChannels());
      }
    });

  }

  navBackView() {

        this.props.navigator.pop({
          id:'HomeView',
        })
    }
    // Function: Play Song
    playSong() {
      if(selectPlay) {
        mp3.play((success) => {
          if(success){
            console.log('choi xong roi');
          }
        });
        selectPlay = false;
        // this.setState({
        //   imgPlay:require('../images/icon/pause@2x.png')
        // });
      } else {
        mp3.pause();
        selectPlay = true;
        // this.setState({
        //   imgPlay:require('../images/icon/play@2x.png')
        // });
      }

    }

    //Function: Repeat Song
    repeatSong() {
      console.log('repeat');

    }

    // Function: Rewind Song
    rewindSong() {
      console.log('rewindSong');
    }

    // Function: Next Song
    nextSong() {
      console.log('nextSong');
    }

    // Function: Random Song
    randomSong() {
      console.log('randomSong');
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
            <TouchableOpacity >
              <Text>
                Repeat
              </Text>
            </TouchableOpacity>
            </View>

            <View style={styles.mediaBtn}>
              <TouchableOpacity >
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
              <TouchableOpacity >
                <Text>
                  Next
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mediaBtn}>
              <TouchableOpacity>
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
