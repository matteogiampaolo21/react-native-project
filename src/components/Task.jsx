import { StyleSheet, Text, TouchableOpacity,Alert, View } from 'react-native'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'

export const Task = ({title,body,priority,taskID,isCompleted}) => {

    const updateTask = (field) => {
        console.log(taskID);

         Alert.alert('Change status of Task', 'Is this task completed?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'Yes', onPress: async () => {

                const taskRef = doc(db, "tasks", taskID);
                // Change the requested field to true
                await updateDoc(taskRef, {
                    [field]: true
                });
            }},
        ]);


    }

    return (
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:"#404040", marginTop:20,marginHorizontal:20, paddingVertical:5,paddingHorizontal:10,borderRadius:5,borderWidth:1,}}>
            <View>
                <Text style={{color:'white',fontSize:17}}>{title}</Text>
                <Text style={{color:'#d4d4d4',fontSize:15}}>Priority : <Text style={{fontWeight:700}}>{priority}</Text></Text>
                <Text style={{color:'#d4d4d4',fontSize:15}}>{body}</Text>
            </View>
            <TouchableOpacity onPress={() => updateTask('isCompleted')}>
                <AntDesign style={{marginRight:10}} name={isCompleted ? 'closecircleo' : "checkcircleo"} size={30} color="#a3a3a3"/>
            </TouchableOpacity>
        </View>
    )
}


// const styles = StyleSheet.create({})