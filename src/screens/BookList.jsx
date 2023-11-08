import React from "react";
import { bookData } from "../myData";
import {Book} from '../components/Book';
import { FlatList, SafeAreaView,StyleSheet,StatusBar, Text } from "react-native";

export const BookList = () => {
    
    return(
      <SafeAreaView style={styles.wrapper}>
        <StatusBar/>
        <Text style={styles.header}>Book</Text>
        <FlatList 
            data={bookData}
            renderItem={(book) => <Book data={book.item} /> }
            keyExtractor={(book) => book.id}
            style={styles.mylist} 
        />
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
    padding:20,
  }
})