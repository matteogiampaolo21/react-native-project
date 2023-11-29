
import React,{ useEffect, useState, useLayoutEffect} from 'react';
import { StyleSheet,SafeAreaView,View,Button, Text,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';

import { auth, onAuthStateChanged } from './firebase/firebaseConfig';

import { Home } from './src/screens/Home';
import { Create } from './src/screens/Create';
import { Projects } from './src/screens/Projects';
import { Project } from './src/screens/Project';
import { LoggedOut } from './src/screens/LoggedOut';
import { Register } from './src/screens/Register';
import { Signin } from './src/screens/Signin';
import { AddUserPanel } from './src/screens/AddUserPanel';
import { AccessPanel } from './src/screens/AccessPanel';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn , setLogState] = useState(true)
  // True for now for faster development

  useLayoutEffect(()=>{
    const myFunc = async () => {
      NavigationBar.setBackgroundColorAsync("black");
    }
    myFunc();
    
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     const uid = user.uid;
    //     setLogState(true)
    //     console.log(uid)
    //   } else {
    //     console.log(user)
    //     setLogState(false)
    //   }
    // });
  },[auth])

  

  return (
    <View style={{flex:1,backgroundColor:"#262626"}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn?'Home':'LoggedOut'} screenOptions={{fullScreenGestureEnabled: true,headerStyle:{backgroundColor:"#171717"},headerTintColor:"white"}}>
          <Stack.Screen name="Home" component={Home} options={{title:'Overview',gestureEnabled:true,headerShown:false}}/>
          <Stack.Screen name="Create" component={Create} options={{title:'Create Project',gestureEnabled:true}}/>
          <Stack.Screen name="Projects" component={Projects} options={{title:'Projects',gestureEnabled:true}}/>
          <Stack.Screen 
            name="Project" 
            component={Project} 
            options={({route}) => ({
              title:route.params.projectName,
              gestureEnabled:true,
            })}
          />
          <Stack.Screen name="Add User" component={AddUserPanel} options={{title:'Add User',gestureEnabled:true}}/>
          <Stack.Screen name="Access Panel" component={AccessPanel} options={{title:'Access Panel',gestureEnabled:true}}/>

          <Stack.Screen name="LoggedOut" component={LoggedOut} options={{title:'Login',gestureEnabled:true,headerShown:false}}/>
          <Stack.Screen name="Register" component={Register} options={{title:'Register',gestureEnabled:true}}/>
          <Stack.Screen name="Signin" component={Signin} options={{title:'Sign In',gestureEnabled:true}}/>

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )

}

