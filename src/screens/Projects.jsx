import React, { useEffect, useState }from 'react'
import { StyleSheet,SafeAreaView,FlatList,Text,ScrollView, TouchableOpacity } from 'react-native';
import { db } from '../../firebase/firebaseConfig';
import {getDocs, collection, query, where} from "firebase/firestore";


const Project = ({projectName,users,tasks,id,navigation,userEmail,owner,coOwners}) => { 
    return(
        <TouchableOpacity onPress={() => {navigation.navigate("Project",{projectName:projectName,projectID:id,accessControl:(userEmail === owner || coOwners.includes(userEmail))})}} style={styles.project}>
            <Text style={{color:'white',fontSize:17}}>{projectName}</Text>
            <Text style={{color:'#d4d4d4',fontSize:15}}>User : {users.length}</Text>
            <Text style={{color:'#d4d4d4',fontSize:15}}>Tasks : {tasks}</Text>
        </TouchableOpacity>
    )
}

export const Projects = ({route,navigation}) => {
    const [projects,setProjects] = useState([])

    const {userEmail} = route.params


    useEffect(()=>{
        
        const getProjects = async () => {      
            // Get projects related to the specific user  

            const q = query(collection(db, "projects"), where("users", "array-contains", userEmail));
            const querySnapshot = await getDocs(q);
            const tempArray = []
            querySnapshot.forEach((doc) => {
                let tempObj = doc.data()
                tempObj.id = doc.id
                tempArray.push(tempObj);
            });
            setProjects(tempArray);
        }
        getProjects();
    },[])

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView>
                <FlatList
                    data={projects}
                    renderItem={({item}) => <Project projectName={item.name} userEmail={userEmail} users={item.users} owner={item.owner} coOwners={item.coOwners} tasks={item.tasks} id={item.id} navigation={navigation} />}
                    scrollEnabled={false}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:"#262626",
        
    },
    header:{
        fontSize:20,
        color:'white',
        fontWeight:'500',
    },
    project:{
        backgroundColor:'#404040',
        marginVertical:10,
        marginHorizontal:10,
        padding:10,
        borderRadius:3,
    },
})