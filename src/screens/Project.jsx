import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, TextInput,  } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

export const Project = ({route}) => {

    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);

    const createTask = () => {

    }
    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.article}>
                <Text style={{color:'white',fontSize:18,fontWeight:500}}>Title:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    placeholder='Enter a title'
                    autoCapitalize='none'
                    autoCorrect={false}
                    placeholderTextColor="#737373"
                    value={title}
                />

                <Text style={{color:'white',fontSize:18,fontWeight:500}}>Body:</Text>
                <TextInput
                    editable
                    multiline
                    numberOfLines={5}
                    onChangeText={text => setBody(text)}
                    placeholder='Enter a body'
                    placeholderTextColor={"#737373"}
                    value={body}
                    style={styles.input}
                />


                <Text style={{color:'white',fontSize:18,fontWeight:500}}>Priority:</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{backgroundColor:'#262626',borderRadius:2,marginTop:10}}
                    textStyle={{color:'white'}}
                    dropDownContainerStyle={{backgroundColor:'black'}}
                    
                />
                
                <TouchableOpacity style={styles.button} onPress={createTask}>
                    <Text style={styles.btnText}>Create</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                
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
    },

    article:{
        backgroundColor:"#404040",
        padding:15,
        marginTop:20,
        marginHorizontal:20,
        borderRadius:3,
    },
    button:{
        backgroundColor:"#0ea5e9",
        paddingHorizontal:5,
        paddingVertical:6,
        marginTop:15,
        borderRadius:3,
        zIndex:-1,
    },
    btnText:{
        fontSize:17,
        color:'white',
        fontWeight:'400',
        textAlign:'center',

    },
    project:{
        backgroundColor:'#404040',
        marginVertical:10,
        marginHorizontal:10,
        padding:10,
        borderRadius:3,
    },
    input:{
        backgroundColor:"#262626",
        color:'#f5f5f5',
        paddingHorizontal:5,
        paddingVertical:3,
        marginVertical:10,
        borderRadius:2,
        fontSize:16,
        borderWidth:1,
    },
    inputArea:{
        backgroundColor:"#262626",
        color:'#f5f5f5',
        paddingHorizontal:5,
        paddingVertical:3,
        marginVertical:10,
        borderRadius:2,
        fontSize:16,
        borderWidth:1,
        textAlignVertical:'top',
    },
})