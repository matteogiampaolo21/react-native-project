import React from 'react'
import { StyleSheet,SafeAreaView,StatusBar,ScrollView, Button, View } from 'react-native'
import { TextBlock } from '../components/TextBlock'
import * as ScreenOrientation from 'expo-screen-orientation';

export const Home = ({ navigation }) => {
    ScreenOrientation.unlockAsync()
    // const myFunc = async () => {
        
    //    const res = await ScreenOrientation.getOrientationAsync();
    //    console.log("Results:",res)
    // }
    // myFunc()
    return(
        <SafeAreaView>
            <StatusBar/>
            <ScrollView>
                <TextBlock header={"Text block 1"} body={"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}/>
                <TextBlock header={"Text block 2"} body={"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}/>
                <View style={styles.buttonContainer}>
                    <Button 
                        title='View our books'
                        onPress={() => {navigation.navigate("Books",{param:"You arrived from the home page."}) }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    buttonContainer:{
        marginTop:10,
        marginHorizontal:10,
        marginBottom:30,
        borderWidth:2,
        backgroundColor:'#2196f3',
    }
})