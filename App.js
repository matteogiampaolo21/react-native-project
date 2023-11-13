
import React,{ useEffect, useState } from 'react';
import { StyleSheet,SafeAreaView,View,FlatList,Text,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';
import { Home } from './src/screens/Home';
import { Create } from './src/screens/Create';
import { Projects } from './src/screens/Projects';
import { Profile } from './src/screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(()=>{
    const myFunc = async () => {
      NavigationBar.setBackgroundColorAsync("black");
    }
    myFunc()
  },[])
  

  

  return (
    <View style={{flex:1,backgroundColor:"#262626"}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{fullScreenGestureEnabled: true,headerStyle:{backgroundColor:"#171717"},headerTintColor:"white"}}>
          <Stack.Screen name="Home" component={Home} options={{title:'Overview',gestureEnabled:true,headerShown:false}}/>
          <Stack.Screen name="Create" component={Create} options={{title:'Create Project',gestureEnabled:true}}/>
          <Stack.Screen name="Projects" component={Projects} options={{title:'Projects',gestureEnabled:true}}/>
          <Stack.Screen name="Profile" component={Profile} options={{title:'Profile',gestureEnabled:true}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )

}

