
import React,{ useEffect, useState, useLayoutEffect} from 'react';
import { StyleSheet,SafeAreaView,View,FlatList,Text,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebaseConfig';
import * as NavigationBar from 'expo-navigation-bar';
import { Home } from './src/screens/Home';
import { Create } from './src/screens/Create';
import { Projects } from './src/screens/Projects';
import { Profile } from './src/screens/Profile';
import { LoggedOut } from './src/screens/LoggedOut';
import { Register } from './src/screens/Register';
import { Signin } from './src/screens/Signin';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn , setLogState] = useState(false)

  useLayoutEffect(()=>{
    const myFunc = async () => {
      NavigationBar.setBackgroundColorAsync("black");
    }
    myFunc();
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

      } else {

      }
    });
  },[auth])

  

  return (
    <View style={{flex:1,backgroundColor:"#262626"}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn?'Home':'LoggedOut'} screenOptions={{fullScreenGestureEnabled: true,headerStyle:{backgroundColor:"#171717"},headerTintColor:"white"}}>
          <Stack.Screen name="Home" component={Home} options={{title:'Overview',gestureEnabled:true,headerShown:false}}/>
          <Stack.Screen name="Create" component={Create} options={{title:'Create Project',gestureEnabled:true}}/>
          <Stack.Screen name="Projects" component={Projects} options={{title:'Projects',gestureEnabled:true}}/>
          <Stack.Screen name="Profile" component={Profile} options={{title:'Profile',gestureEnabled:true}}/>

          <Stack.Screen name="LoggedOut" component={LoggedOut} options={{title:'Login',gestureEnabled:true,headerShown:false}}/>
          <Stack.Screen name="Register" component={Register} options={{title:'Register',gestureEnabled:true}}/>
          <Stack.Screen name="Signin" component={Signin} options={{title:'Signin',gestureEnabled:true}}/>

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )

}

