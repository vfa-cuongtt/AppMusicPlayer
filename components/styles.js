const React = require('react-native')
const {StyleSheet} = React

var styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    flex:1,
  },
  header:{
    flex:1,
  },
  btnIcon:{
    width:30,height:30      
    //alignItems: 'center',
  },
  mediaView:{
    marginTop: 30,
    flexDirection:'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
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
    height: 30,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
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
