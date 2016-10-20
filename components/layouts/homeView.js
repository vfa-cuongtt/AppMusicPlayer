import React, {Component} from "react";
import {
  StyleSheet,
  View,
  Text,Image,
  TouchableOpacity
} from "react-native";
var styles = require('../styles.js');
var HeaderView = require('./headerView.js')

class HomeView extends Component {
  render() {
    return(
      <View style={styles.container}>
        <HeaderView title='Music Player'/>
      </View>
    );
  }
}
module.exports = HomeView;
