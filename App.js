
import React,{ useState } from 'react';
import { StyleSheet,SafeAreaView,View,FlatList,Text,StatusBar } from 'react-native';
// import { BookList } from './src/components/BookList' 
import { Home } from './src/screens/Home';


export default function App() {
  
  return (
    <Home />
  )

}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
    backgroundColor:"#e8e8e8",
  },
  body:{
    flex:1,
    alignItems:"center",
    width:'80%',
    marginLeft:"auto",
    marginRight:'auto'
  },
  title:{
    fontSize:24,
    marginTop:100,
    width:"100%",
    backgroundColor:"#363636",
    borderRadius:5,
    color:'white',
    textAlign:"center"
  },
  count:{
    fontSize:48,
    backgroundColor:'#ffffff',
    width:'100%',
    borderRadius:5,
    shadowColor:'black',
    marginVertical:10,
    textAlign:'center'
  },
  btnContainer:{
    marginTop:10,
    flexDirection:'row',
    gap:5,
    width:'100%',
    
  },
})

