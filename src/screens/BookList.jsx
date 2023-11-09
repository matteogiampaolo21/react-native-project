import React from "react";
import { bookData } from "../myData";
import {Book} from '../components/Book';
import { FlatList, SafeAreaView,StyleSheet,StatusBar,View, Text,Button,ScrollView } from "react-native";

export const BookList = ({navigation}) => {
    return(
      <SafeAreaView style={styles.wrapper}>
        <StatusBar/>
        <ScrollView>
          <FlatList 
              data={bookData}
              scrollEnabled={false}
              renderItem={(book) => <Book data={book.item} /> }
              keyExtractor={(book) => book.id}
              style={styles.mylist} 
          />
          <View style={styles.buttonContainer}>
            <Button
              title='Return to home.'
              onPress={() => {navigation.navigate("Home") }}          
            />
          </View>
        </ScrollView>


        
      </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
    backgroundColor:"#e8e8e8",
  },
  header:{
    fontSize:24,
    paddingLeft:20,
    paddingTop:20,
  },
  mylist:{
    paddingTop:20,
    paddingHorizontal:20,
  },
  buttonContainer:{
      marginHorizontal:20,
      marginBottom:20,
      borderWidth:2,
      backgroundColor:'#2196f3',
  }

})