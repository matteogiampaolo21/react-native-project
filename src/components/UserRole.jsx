import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'

export const UserRole = ({user}) => {
  return (
    <View style={styles.userRow}>
        <Text style={{flexShrink:2}}>
            <Text style={styles.user}>{user}</Text>
        </Text>
        <View style={{flexGrow:3,flexDirection:'row',padding:10,justifyContent:'flex-end'}}>
            <TouchableOpacity>
                <Entypo style={{marginRight:15,}} name="swap" size={25} color="#737373"/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Entypo style={{marginRight:5,}} name="remove-user" size={25} color="#737373"/>
            </TouchableOpacity>
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