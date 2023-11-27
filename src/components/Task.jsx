import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const Task = ({title,body,priority}) => {
    return (
        <View style={{backgroundColor:"#404040", marginTop:20,marginHorizontal:20, paddingVertical:5,paddingHorizontal:10,borderRadius:5,borderWidth:1,}}>
            <Text style={{color:'white',fontSize:17}}>{title}</Text>
            <Text style={{color:'#d4d4d4',fontSize:15}}>Priority : {priority}</Text>
            <Text style={{color:'#d4d4d4',fontSize:15}}>{body}</Text>
        </View>
    )
}


// const styles = StyleSheet.create({})