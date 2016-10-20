import React, {Component} from "react";
import {
  StyleSheet,
  View,
  Text,Image,
  TouchableOpacity
} from "react-native";
var styles = require('../styles.js');

class SplashView extends Component {
  render() {
    return(
      <View style={styles.toolBar}>
        <Text>
          splashView
        </Text>
      </View>
    );
  }
}
module.exports = SplashView;
