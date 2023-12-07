import { StyleSheet, Text, TouchableOpacity,Alert, View } from 'react-native'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'

export const Task = ({title,body,priority,taskID,isCompleted,isApproved,tasks,setTasks}) => {

    const [isCompletedIcons, setCompletedIcons] = useState(isCompleted)
    const updateTask = (field) => {
        
        if (isCompletedIcons){
            Alert.alert('Change status of task', 'Change status of task to: Not Completed', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text:'Yes', onPress: async ( ) => {
                    const taskRef = doc(db, "tasks", taskID);
                    // Change the requested field to true
                    await updateDoc(taskRef, {
                        [field]: false
                    });
                    setCompletedIcons(false)
                    
                }},
            ]);
        }else {
            Alert.alert('Change status of task', 'Change status of task to: Completed', [
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
                    setCompletedIcons(true)
                }},
            ]);
        }
        

    }

    return (
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:"#404040", marginTop:20,marginHorizontal:20,borderColor:(isCompletedIcons ? '#22c55e' : 'black'), paddingVertical:5,paddingHorizontal:10,borderRadius:5,borderWidth:1,}}>
            <View>
                <Text style={{color:'white',fontSize:17}}>{title}</Text>
                <Text style={{color:'#d4d4d4',fontSize:15}}>Priority : <Text style={{fontWeight:700}}>{priority}</Text></Text>
                <Text style={{color:'#d4d4d4',fontSize:15}}>{body}</Text>
            </View>
            <TouchableOpacity onPress={() => updateTask('isCompleted')}>
                <AntDesign style={{marginRight:10}} name={isCompletedIcons ? 'closecircleo' : "checkcircleo"} size={30} color='#737373'/>
            </TouchableOpacity>
        </View>
    )
}


// const styles = StyleSheet.create({})