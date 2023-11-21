import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, TextInput, Keyboard,TouchableWithoutFeedback, FlatList  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase/firebaseConfig';
import { collection,addDoc,getDocs,query, where, doc,updateDoc } from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';

const Tasks = ({title,body,priority}) => {
    return (
        <View style={{backgroundColor:"#404040", marginTop:20,marginHorizontal:20, paddingVertical:5,paddingHorizontal:10,borderRadius:5,borderWidth:1,}}>
            <Text style={{color:'white',fontSize:17}}>{title}</Text>
            <Text style={{color:'#d4d4d4',fontSize:15}}>Priority : {priority}</Text>
            <Text style={{color:'#d4d4d4',fontSize:15}}>{body}</Text>
        </View>
    )
}

export const Project = ({route}) => {
    const {projectID} = route.params;
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Critical', value: 'Critical'},
        {label: 'High', value: 'High'},
        {label: 'Normal', value: 'Normal'},
        {label: 'Low', value: 'Low'},
    ]);
    const [isHidden,setHidden] = useState(true)


    const [tasks,setTasks] = useState([])

    useEffect(()=>{
        
        const getTasks = async () => {
            // Get specific tasks related to project. 
            const q = query(collection(db, "tasks"), where("projectID", "==", projectID));

            const querySnapshot = await getDocs(q);
            const tempArray = []
            querySnapshot.forEach((doc) => {
                let tempObj = doc.data();
                tempObj.id = doc.id;
                tempArray.push(tempObj);
            });
            setTasks(tempArray);
        }
        getTasks();
    },[])


    const createTask = async () => {
        // add doc to database
        const document = await addDoc(collection(db,"tasks"),{title:title, body:body, priority:value,projectID:projectID,isCompleted:false});
        console.log("Sent document:",doc)

        // Update the frontend without refresh
        setTasks(prev => [...prev,{id:doc.id,title:title, body:body, priority:value,projectID:projectID}]);

        // Clear form
        setTitle("");
        setBody("");
        setValue(null);

        // Update project's task value
        const projectRef = doc(db,'projects',projectID);
        await updateDoc(projectRef, {
            tasks: tasks.length,
        })
    }
    return (
        <SafeAreaView style={styles.wrapper}>
            <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}  >
                {/* Needs outer view for keyboard dismiss to work properly. */}


                { isHidden ? 
                    <TouchableOpacity onPress={()=>{setHidden(false)}} style={styles.hideBtn}>
                        <Text style={{color:'white',fontSize:17,textAlign:'center'}}>Create Task</Text>
                    </TouchableOpacity>
                :
                    <View >

                        <View style={styles.article}>
                            
                            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{color:'white',fontSize:18,fontWeight:500}}>Title:</Text>
                                <Text onPress={() => {setHidden(true)}} style={{color:'#a3a3a3',fontSize:16,fontWeight:400,}}>Hide</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                onChangeText={setTitle}
                                placeholder='Enter a title'
                                placeholderTextColor="#737373"
                                value={title}
                            />

                            <Text style={{color:'white',fontSize:18,fontWeight:500}}>Priority:</Text>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                placeholder='Select a priority'
                                placeholderStyle={{color:"#737373"}}
                                style={{backgroundColor:'#262626',borderRadius:2,marginTop:10}}
                                textStyle={{color:'white'}}
                                nestedScrollEnabled={true} 
                                dropDownContainerStyle={{backgroundColor:'black'}}
                                
                            />
                            <Text style={{color:'white',fontSize:18,fontWeight:500,marginTop:10}}>Body:</Text>
                            <TextInput
                                editable
                                multiline
                                numberOfLines={5}
                                onChangeText={text => setBody(text)}
                                placeholder='Enter a body'
                                placeholderTextColor={"#737373"}
                                onEndEditing={() => {Keyboard.dismiss()}}
                                value={body}
                                style={styles.inputArea}
                            />


                        
                            <TouchableOpacity style={styles.button} onPress={createTask}>
                                <Text style={styles.btnText}>Create</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                }
            
            </TouchableWithoutFeedback>
            <FlatList
                data={tasks}
                renderItem={({item}) => <Tasks title={item.title} body={item.body} priority={item.priority} />}
                keyExtractor={item => item.id}
            />
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
        borderWidth:1,
        zIndex:50
    },
    hideBtn:{
        backgroundColor:"#0ea5e9",
        paddingHorizontal:5,
        paddingVertical:6,
        marginTop:15,
        borderRadius:3,
        marginHorizontal:20,
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