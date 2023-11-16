import React, { useReducer, useState } from 'react'
import { StyleSheet,SafeAreaView,StatusBar,ScrollView,Image,Text,TextInput, Button, View, TouchableOpacity } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export const Register = ({ navigation }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleRegister = () => {
        console.log(username,email,password);
        createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
            const user = userCredential.user;
            user.displayName = username;
            navigation.navigate("Signin");
        }).catch((err) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }

    return(
        <SafeAreaView style={styles.wrapper}>
            <StatusBar/>
            <ScrollView >
                <View style={styles.article}>
                    <Text style={{color:'white',fontSize:18,fontWeight:500}}>Username:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUsername}
                        placeholder='Enter a name'
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholderTextColor="#737373"
                        value={username}
                    />
                    <Text style={{color:'white',fontSize:18,fontWeight:500}}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        placeholder='Enter an email'
                        keyboardType='emai-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        placeholderTextColor="#737373"
                        value={email}
                    />
                    <Text style={{color:'white',fontSize:18,fontWeight:500}}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        placeholder='Enter a password'
                        secureTextEntry={true}
                        placeholderTextColor="#737373"
                        value={password}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.btnText}>Create</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:"#262626",
        
    },
    input:{
        backgroundColor:"#262626",
        color:'#f5f5f5',
        paddingHorizontal:5,
        paddingVertical:3,
        marginVertical:10,
        borderRadius:2,
        fontSize:16
    },
    article:{
        backgroundColor:"#404040",
        padding:15,
        marginTop:20,
        marginHorizontal:20,
        borderRadius:3,
    },
    button:{
        backgroundColor:"#0ea5e9",
        paddingHorizontal:5,
        paddingVertical:6,
        marginTop:15,
        borderRadius:3,
    },
    btnText:{
        fontSize:17,
        color:'white',
        fontWeight:'400',
        textAlign:'center',

    }
})