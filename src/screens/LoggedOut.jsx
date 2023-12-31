import React from 'react'
import { StyleSheet,SafeAreaView,StatusBar,ScrollView,Image,Text, Button, View, TouchableOpacity } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';

export const LoggedOut = ({ navigation }) => {
    
    return(
        <SafeAreaView style={styles.wrapper}>
            <StatusBar/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image
                    style={styles.image}
                    source={require("../../assets/adaptive-icon.png")}
                />
                <Text style={styles.header}>Task Manager</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Signin')}>
                    <Text style={styles.buttonText}>Sign in</Text>
                </TouchableOpacity>
                
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:"#262626",
        
    },
    scrollContainer:{
        flex:1,
        alignItems:'center',
        paddingVertical:'auto',
        justifyContent:'center'
    },
    image:{
        width:200,
        height:200,
        alignSelf:'center'
    },
    header:{
        color:'white',
        fontSize:24,
        marginTop:10,
        textAlign:"center"
    },
    buttonContainer:{
        marginTop:10,
        paddingHorizontal:10,
        paddingVertical:5,
        width:200,
        borderRadius:2,
        backgroundColor:'#0284c7',
    },
    buttonText:{
        fontSize:18,
        color:'white',
        textAlign:'center',
    }
})