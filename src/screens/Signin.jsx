import React, {useState} from 'react'
import { StyleSheet,SafeAreaView,StatusBar,ScrollView,Image,Text,TextInput, Button, View, TouchableOpacity } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation';

export const Signin = ({ navigation }) => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSignin = () => {
        
    }

    return(
        <SafeAreaView style={styles.wrapper}>
            <StatusBar/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
               <ScrollView >
                <View style={styles.article}>
                    <Text style={{color:'white',fontSize:18,fontWeight:500}}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        placeholder='Enter a name'
                        placeholderTextColor="#737373"
                        value={email}
                    />
                    <Text style={{color:'white',fontSize:18,fontWeight:500}}>Password:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        placeholder='Enter a name'
                        placeholderTextColor="#737373"
                        value={password}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSignin}>
                        <Text style={styles.btnText}>Sign in</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView> 
                
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