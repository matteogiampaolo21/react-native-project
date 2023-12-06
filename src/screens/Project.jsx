import { StyleSheet, Text, View, SafeAreaView,Button, ScrollView, TouchableOpacity, Dimensions, TextInput, Keyboard,TouchableWithoutFeedback, FlatList, ActivityIndicator  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../../firebase/firebaseConfig';
import { collection,addDoc,getDocs,query, where, doc,updateDoc } from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';
import { Task } from '../components/Task';


export const Project = ({route,navigation}) => {

    const {projectID,accessControl,accessToCreate} = route.params;

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

    // start as null for activityIndicator
    const [tasks,setTasks] = useState(null)

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
        const document = await addDoc(collection(db,"tasks"),{title:title, body:body, priority:value,projectID:projectID,isApproved:false,isCompleted:false});
        console.log("Sent document:",document)

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
        <>
        {tasks === null ?
            <SafeAreaView style={{flex:1,justifyContent:'center',backgroundColor:"#262626"}}>
                <ActivityIndicator size={'large'} color={"#0ea5e9"} />
            </SafeAreaView>
        :
            <SafeAreaView style={styles.wrapper}>
                <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}  >

                    { accessControl || accessToCreate ?
                        <>
                            { isHidden ? 
                                <TouchableOpacity onPress={()=>{setHidden(false)}} style={styles.hideBtn}>
                                    <Text style={{color:'white',fontSize:17,textAlign:'center'}}>Create Task</Text>
                                </TouchableOpacity>
                            :
                                <View >
                                {/* Needs outer view for keyboard dismiss to work properly. */}

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
                        </>
                    :
                        <></>
                    }
                
                </TouchableWithoutFeedback>
                <FlatList
                    data={tasks}
                    renderItem={({item}) => <Task taskID={item.id} isCompleted={item.isCompleted} title={item.title} body={item.body} priority={item.priority} />}
                    keyExtractor={item => item.id}
                />

                {accessControl ?
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',marginRight:20,marginBottom:20,}}>
                        <View style={{width:60,height:60,borderRadius:100,position:'absolute',bottom:0,right:70,alignSelf:'flex-end'}}>
                            <TouchableOpacity onPress={() => navigation.navigate("Access Panel",{projectID:projectID})} style={{borderRadius:100,borderWidth:1,width:60,height:60,backgroundColor:"#171717",flex:1,justifyContent:'center',alignItems:'center'}} >
                                <AntDesign style={{}} name="user" size={30} color="#a3a3a3" />
                            </TouchableOpacity>
                        </View>
                        <View style={{width:60,height:60,borderRadius:100,position:'absolute',bottom:0,alignSelf:'flex-end'}}>
                            <TouchableOpacity onPress={() => navigation.navigate("Add User",{projectID:projectID})} style={{borderRadius:100,borderWidth:1,width:60,height:60,backgroundColor:"#171717",flex:1,justifyContent:'center',alignItems:'center'}} >
                                <AntDesign style={{}} name="bars" size={30} color="#a3a3a3" />
                            </TouchableOpacity>
                        </View>
                    </View>
                :
                    <></>
                }
            </SafeAreaView>
        }
        </>
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