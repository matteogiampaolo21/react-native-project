import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

export const Book = ({data}) => {
    // const title = data.title;
    // const description = data.description;

    const {title,description,genres} = data;
    
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text>{description}</Text>
            <View style={styles.genreRow}>
                {genres.map((genre,index) => {
                    return(
                        <Text key={index} style={styles.genre}>{genre}</Text>    
                    )
                })}
            </View>
        </View>
        
    )
}


const styles = StyleSheet.create({
    container:{
        marginBottom:20,
        borderWidth:2,
        padding:10,
    },
    title:{
        fontSize:18,
    },
    genreRow:{
        flex:1,
        flexDirection:'row',
        gap:10,
        marginTop:10,
    },
    genre:{
        backgroundColor:"black",
        color:'white',
        paddingHorizontal:5,
        paddingVertical:1,
    }
})
