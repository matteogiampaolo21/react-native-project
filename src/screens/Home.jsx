import React from 'react'
import { StyleSheet,SafeAreaView,StatusBar,ScrollView } from 'react-native'
import { TextBlock } from '../components/TextBlock'


export const Home = () => {
    return(
        <SafeAreaView>
            <StatusBar/>
            <ScrollView>
                <TextBlock header={"Text block 1"} body={"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}/>
                <TextBlock header={"Text block 2"} body={"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}/>
                
            </ScrollView>
        </SafeAreaView>
    )
}