import React, { useState } from 'react'
import { StyleSheet,SafeAreaView,View,FlatList,Button,TouchableOpacity,TextInput,Text,StatusBar, ScrollView } from 'react-native';
import { db } from '../../firebase/firebaseConfig';
import { collection , addDoc } from '@firebase/firestore';


export const Create = ({navigation}) => {

    const [projectName, setName] = useState("")

    const handleClick = async () => {
        
        const doc = await addDoc(collection(db,"projects"),{name:projectName, users:[], tasks:0});
        console.log("Sent document:",doc)
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView>
                <View style={styles.article}>
                    <Text style={{color:'white',fontSize:18,fontWeight:500}}>Project name:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        placeholder='Enter a name'
                        placeholderTextColor="#737373"
                        value={projectName}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleClick}>
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
        marginHorizontal:10,
        borderRadius:3,
    },
    button:{
        backgroundColor:"#0ea5e9",
        paddingHorizontal:5,
        paddingVertical:6,
        borderRadius:3,
    },
    btnText:{
        fontSize:17,
        color:'white',
        fontWeight:'400',
        textAlign:'center',

    }
})
