import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export const ProjectComponent = ({projectName,users,tasks,id,managers,navigation,userEmail,owner,coOwners}) => {
  return(
    <TouchableOpacity onPress={() => {navigation.navigate("Project",{projectName:projectName,projectID:id,accessToCreate:(managers.includes(userEmail)),accessControl:(userEmail === owner || coOwners.includes(userEmail))})}} style={styles.project}>
        <Text style={{color:'white',fontSize:17}}>{projectName}</Text>
        <Text style={{color:'#d4d4d4',fontSize:15}}>User : {users.length}</Text>
        <Text style={{color:'#d4d4d4',fontSize:15}}>Tasks : {tasks}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  project:{
    backgroundColor:'#404040',
    marginVertical:10,
    marginHorizontal:10,
    padding:10,
    borderRadius:3,
  },
})