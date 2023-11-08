import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

export const TextBlock = ({header,body}) => {

    
    
    return(
        <View style={styles.container}>
            <Text style={styles.header}>{header}</Text>
            <Text style={styles.body}>{body}</Text>
        </View>
        
    )
}


const styles = StyleSheet.create({
    container:{
        margin:10,
        padding:20,
        borderWidth:2
    },
    header:{
        fontSize:24,
        marginBottom:5,

    },
    body:{
        color:'#313131'
    }
})
