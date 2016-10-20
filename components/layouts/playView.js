import React, {Component} from "react";
import {
  StyleSheet,
  View,
  Text,Image,
  TouchableOpacity
} from "react-native";
var styles = require('../styles.js');

class PlayView extends Component {
  render() {
    return(
      <View style={styles.toolBar}>
        <Text>
          PlayView
        </Text>
      </View>
    );
  }
}
module.exports = PlayView;
