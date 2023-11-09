
import React,{ useState } from 'react';
import { StyleSheet,SafeAreaView,View,FlatList,Text,StatusBar } from 'react-native';
import { BookList } from './src/screens/BookList' 
import { Home } from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{fullScreenGestureEnabled: true,headerShown:false}}>
        {/* <Home /> */}
        <Stack.Screen name="Home" component={Home} options={{title:'Overview',gestureEnabled:true}}/>
        <Stack.Screen name='Books' component={BookList} options={{gestureEnabled:true}} initialParams={{param:"No param given"}}/>
      </Stack.Navigator>
    </NavigationContainer>
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

