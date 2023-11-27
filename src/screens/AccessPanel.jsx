import { SafeAreaView, StyleSheet,Keyboard, Text, TouchableOpacity,TouchableWithoutFeedback,TextInput, View, FlatList, ScrollView, } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import React,{useEffect, useState} from 'react'
import {doc,getDoc,updateDoc} from 'firebase/firestore';
import {db} from '../../firebase/firebaseConfig';
import { UserRole } from '../components/UserRole';



export const AccessPanel = ({route}) => {
  
    // const tempState = {coOwners:[],managers:[],workers:[],name:'',owner:'',task:0,users:[]}

    const {projectID} = route.params;
    const [project,setProject] = useState({})

    useEffect(() => {
        const getProject = async () => {
            const docRef = doc(db, "projects", projectID);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                let tempObj = docSnap.data();
                tempObj.id = docSnap.id;
                setProject(tempObj);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        getProject();
    },[])

    

    return (
        <SafeAreaView style={styles.wrapper}>
          <ScrollView >
            {project.owner ?
              <View>
                <Text style={styles.userHeading}>Managers</Text>
                <FlatList
                  data={project.managers}
                  renderItem={({item}) => <UserRole user={item}/>}
                  keyExtractor={item => item}
                  scrollEnabled={false}
                  style={styles.usersContainer}
                />

                <Text style={styles.userHeading}>Workers</Text>
                <FlatList
                  data={project.workers}
                  renderItem={({item}) => <UserRole user={item}/>}
                  keyExtractor={item => item}
                  scrollEnabled={false}
                  style={styles.usersContainer}
                />
                

              </View>
            :
              console.log("Something")
            }
          </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    wrapper:{
      flex:1,
      backgroundColor:"#262626",
        
    },
    // scrollContainer:{
    //   flex:1,
    // },
    userHeading:{
      color:'white',
      fontSize:18,
      marginHorizontal:20,
      marginTop:20,
    },
    usersContainer:{
        marginTop:10,
        marginHorizontal:10,
        backgroundColor:'#404040',
        padding:10,
        paddingTop:7,
        borderRadius:5,
        borderWidth:1,
    }
})