import React from 'react'
import { StyleSheet,SafeAreaView,View,FlatList,Text,StatusBar, ScrollView } from 'react-native';

export const Create = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
        <ScrollView>
            <View>
                <Text style={styles.header}>Create Projects.</Text>
            </View>
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
