import { StyleSheet, Text, TouchableOpacity,Alert, View } from 'react-native'
import { updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'
import React, { useState } from 'react'

import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';

export const Task = ({title,body,priority,taskID,isCompleted,accessControl,tasks,setTasks}) => {

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

    const approveTask = () => {
        console.log('aya')
        // Alert prompt confirmation to delete task.
        Alert.alert("Do you approve of this task?","Once a task is approved it will be removed permanently, with no way of retrieval.",[
            {
                text:'Cancel',
                onPress: () => {
                    console.log("Canceled Action")
                },
                style:'cancel'
            },
            {
                text:'Confirm',
                onPress:async () => {
                    console.log("Confirmed Action")
                    await setTasks((prevState) => {
                        const result = prevState.filter((task) => task.id !== taskID)
                        return [...result]
                    })
                    await deleteDoc(doc(db, "tasks", taskID));
                }
            },
        ])
    }

    return (
        <View style={{flex:4,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:"#404040", marginTop:20,marginHorizontal:20,borderColor:(isCompletedIcons ? '#22c55e' : 'black'), paddingVertical:5,paddingHorizontal:10,borderRadius:5,borderWidth:1,}}>
            <View style={{flex:3}}>
                <Text style={{color:'white',fontSize:17,fontWeight:700}}>{title}</Text>
                <Text style={{color:'#d4d4d4',fontSize:15}}>Priority : <Text style={{fontWeight:700}}>{priority}</Text></Text>
                <Text style={{color:'#d4d4d4',fontSize:15}}>{body}</Text>
            </View>
            <View style={{display:'flex',flexDirection:'row',flex:1,justifyContent:'flex-end'}}>
                {isCompletedIcons && accessControl ?
                    <TouchableOpacity onPress={() => approveTask()}>
                        <Feather style={{marginRight:10}} name={'thumbs-up'} size={30} color='#737373'/>
                    </TouchableOpacity>
                :
                    <></>
                }
                <TouchableOpacity onPress={() => updateTask('isCompleted')}>
                    <AntDesign style={{marginRight:10}} name={isCompletedIcons ? 'closecircleo' : "checkcircleo"} size={30} color='#737373'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}


// const styles = StyleSheet.create({})