import React, { useEffect, useState }from 'react'
import { StyleSheet,SafeAreaView,View,FlatList,Text,StatusBar, ScrollView } from 'react-native';


const tempData = [
    { 
        projectName: "Project Bravo",
        users: new Set().add('test_user_001'),
        tasks: 0,
    },
    { 
        projectName: "Project Charlie",
        users: new Set().add('test_user_001'),
        tasks: 0,
    },
    { 
        projectName: "Project Delta",
        users: new Set().add('test_user_001').add('test_user_002'),
        tasks: 0,
    },
]

const Project = ({projectName,users,tasks}) => {
    
    return(
        <View style={styles.project}>
            <Text style={{color:'white',fontSize:17}}>{projectName}</Text>
            <Text style={{color:'#d4d4d4',fontSize:15}}>User : {users.length}</Text>
            <Text style={{color:'#d4d4d4',fontSize:15}}>Tasks : {tasks}</Text>
        </View>
    )
}

export const Projects = ({navigation}) => {
    const [projects,setProjects] = useState([])

    useEffect(()=>{

    },[])

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView>
                <FlatList
                    data={projects}
                    renderItem={({item}) => <Project projectName={item.projectName} users={item.users} tasks={item.tasks} />}
                    scrollEnabled={false}
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