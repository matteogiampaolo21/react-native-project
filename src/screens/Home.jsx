import React, { useEffect, useState } from 'react'
import { StyleSheet,SafeAreaView,StatusBar,ScrollView,Image,Text, Button, View, TouchableOpacity } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';
import { auth } from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from '../../firebase/firebaseConfig';


export const Home = ({ navigation }) => {

    const [user,setUser] = useState(null)
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user){  
                setUser(user)
            }else{
                navigation.navigate('LoggedOut')
            }
        })
    },[auth])

    const handleLogOut = () => {
        signOut(auth).then(() => {
            navigation.navigate('LoggedOut')
        }).catch((error) => {
            console.log(error)
        })
    }

    return(
        <SafeAreaView style={styles.wrapper}>
            <StatusBar/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image
                    style={styles.image}
                    source={require("../../assets/adaptive-icon.png")}
                />
                <Text style={styles.header}>Task Manager</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Create',{userEmail:user.email})}>
                    <Text style={styles.buttonText}>Create Projects</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Projects')}>
                    <Text style={styles.buttonText}>View Projects</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.buttonText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={handleLogOut}>
                    <Text style={styles.buttonText}>Log Out</Text>
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