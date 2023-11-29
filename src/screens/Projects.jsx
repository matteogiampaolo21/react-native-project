import React, { useEffect, useState }from 'react'
import { StyleSheet,SafeAreaView,FlatList,ActivityIndicator,ScrollView, } from 'react-native';
import { db } from '../../firebase/firebaseConfig';
import {getDocs, collection, query, where} from "firebase/firestore";
import { ProjectComponent } from '../components/ProjectComponent';


export const Projects = ({route,navigation}) => {
    const [projects,setProjects] = useState([])
    const [isLoading,setLoading] = useState(true)

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
            setLoading(false)
        }
        getProjects();
    },[])

    return (
        <>
        {isLoading ?
            <SafeAreaView style={{flex:1,justifyContent:'center',backgroundColor:"#262626"}}>
                <ActivityIndicator size={'large'} color={"#0ea5e9"} />
            </SafeAreaView>
        :
            <SafeAreaView style={styles.wrapper}>
                <ScrollView>
                    <FlatList
                        data={projects}
                        renderItem={({item}) => <ProjectComponent projectName={item.name} userEmail={userEmail} users={item.users} owner={item.owner} coOwners={item.coOwners} managers={item.managers} tasks={item.tasks} id={item.id} navigation={navigation} />}
                        scrollEnabled={false}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
            </SafeAreaView>
        }
        </>
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
    
})