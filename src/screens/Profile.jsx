import React from 'react'
import { StyleSheet,SafeAreaView,View,Text,ScrollView } from 'react-native';

export const Profile = ({navigation}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
        <ScrollView>
            <View>
                <Text style={styles.header}>Profile.</Text>
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