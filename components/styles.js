const React = require('react-native')
const {StyleSheet} = React

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
    flex:1,
  },
  mediaBtn:{
    marginLeft: 20
  },
  mediaView:{
    marginTop: 50,
    flexDirection:'row',
    alignItems: 'center',
  },
  imgPlayView:{
    marginTop: 30,
    alignItems: 'center',
    //justifyContent:'flex-end'
  },
  songTitle:{
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 30

  },
  image:{
    height: 250,
    width: 250,
    paddingTop: 10
  }
  // sliderBar:{
  //   flex: 1,
  //   marginLeft: 10,
  //   marginRight: 20,
  //   alignItems: 'stretch',
  //   justifyContent: 'center',
  // },
})

module.exports = styles;
