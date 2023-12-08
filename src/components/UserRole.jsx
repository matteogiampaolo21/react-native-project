import { StyleSheet, Text, TouchableHighlight, View, Alert } from 'react-native'
import React,{useState} from 'react'
import { Entypo } from '@expo/vector-icons'
import { db } from '../../firebase/firebaseConfig'
import {doc,updateDoc, getDoc} from 'firebase/firestore';

export const UserRole = ({user,role,project,setProject}) => {
    const [isDisabled,setDisable] = useState(false);

    const removeUser = async () => {

        // Remove from role array and users array
        const roleResults = project[role].filter((email) => email !== user);
        const usersResults = project.users.filter((email) => email !== user);

        const docRef = doc(db, "projects", project.id);
        
        await updateDoc(docRef,{
            [role]:roleResults,
            users:usersResults,
        })

        // Update on frontend
        setProject((prevState) => {
            prevState[role] = roleResults;
            prevState.users = usersResults;
            return {...prevState}
        })
        
    


        setDisable(false)
    }

    const changeRole = () => {

        let buttons = []


        const updateRole = async (newRole) => {

            console.log('works here')

            // remove from current role array
            const oldRoleArray = project[role].filter((email) => email !== user);
            // add to new role array
            project[newRole].push(user);
            const newRoleArray = project[newRole];

            const docRef = doc(db, "projects", project.id);
        
            const test = await updateDoc(docRef,{
                [role]:oldRoleArray,
                [newRole]:newRoleArray,
            })
            // Need to update project on frontend
            setProject((prevState) => {
                prevState[role] = oldRoleArray;
                prevState[newRole] = newRoleArray;
                return {...prevState}
            })


        }

        switch (role) {
            case 'workers':
                buttons = [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style:'cancel',
                    },
                    {
                        text: 'Manager',
                        onPress: () => updateRole('managers'),
                    },
                    {
                        text: 'Co-Owner',
                        onPress: () =>  updateRole('coOwners')
                    },
                ]
                break;
            case 'managers':
                buttons = [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style:'cancel',
                    },
                    {
                        text: 'Worker',
                        onPress: () => updateRole('workers'),
                    },
                    {
                        text: 'Co-Owner',
                        onPress: () =>  updateRole('coOwners')
                    },
                ]
                break;
            case 'coOwners':
                buttons = [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style:'cancel',
                    },
                    {
                        text: 'Worker',
                        onPress: () => updateRole('workers'),
                    },
                    {
                        text: 'Manager',
                        onPress: () =>  updateRole('managers')
                    },
                ]
                break;

        }

        Alert.alert(`Change role of ${user} ?`, 'Please select a role below.', buttons);
        setDisable(false);
    }


    return (
        <View style={styles.userRow}>
            <Text style={{flexShrink:2}}>
                <Text style={styles.user}>{user}</Text>
            </Text>
            <View style={{flexGrow:3,flexDirection:'row',padding:10,justifyContent:'flex-end'}}>
                <TouchableHighlight disabled={isDisabled} style={{borderRadius:100,paddingHorizontal:8,paddingVertical:3}} onPress={() => {changeRole();setDisable(true)}} >
                    <Entypo name="swap" size={25} color="#737373"/>
                </TouchableHighlight>
                <TouchableHighlight disabled={isDisabled} style={{borderRadius:100,paddingHorizontal:8,paddingVertical:3}} onPress={() => {removeUser();setDisable(true)}}>
                    <Entypo name="remove-user" size={25} color="#737373"/>
                </TouchableHighlight>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    user:{
      color:'white',
      fontSize:16,
      paddingVertical:10,
      paddingRight:10,
      

    },
    userRow:{
        flex:5,
        flexDirection:'row',
        borderBottomColor:"#525252",
        borderBottomWidth:1,
        alignItems:'center',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginBottom:10,
        
    }
})