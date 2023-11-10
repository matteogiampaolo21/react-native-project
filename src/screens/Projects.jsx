import React from 'react'
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
        <View>
            <Text>{projectName}</Text>
            <Text>User : {users.size}</Text>
            <Text>Tasks : {tasks}</Text>
        </View>
    )
}

export const Projects = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
        <ScrollView>
            <Text style={styles.header}>Projects.</Text>
            <FlatList
                data={tempData}
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
    }
})