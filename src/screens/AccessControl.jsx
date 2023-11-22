import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity,TouchableWithoutFeedback,TextInput, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import React,{useState} from 'react'

export const AccessControl = () => {
  const [isInfoHidden, setInfoHidden] = useState(true);
  const [isAddUserHidden, setAddUserHidden] = useState(false);
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
        {isInfoHidden ?
          <TouchableOpacity style={styles.infoBtn} onPress={() => setInfoHidden(false)}>
            <Text style={{color:'white',textAlign:'center',fontSize:16}}>See Info</Text>
          </TouchableOpacity>
        :
          <View style={styles.infoContainer}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{fontSize:19,color:'white',fontWeight:500,}}>Roles</Text>
              <Text onPress={() => setInfoHidden(true)} style={{fontSize:16,textAlignVertical:'center',textDecorationLine:'underline',color:"#a3a3a3"}}>
                Hide
              </Text>
            </View>
            <Text style={styles.infoText}><Text style={{fontWeight:500, color:"#d4d4d4"}}>Workers</Text>: Can only complete tasks</Text>
            <Text style={styles.infoText}><Text style={{fontWeight:500, color:"#d4d4d4"}}>Managers</Text>: Can complete and create tasks</Text>
            <Text style={styles.infoText}><Text style={{fontWeight:500, color:"#d4d4d4"}}>Co-owners</Text>: Can complete, and create tasks. Also can add or remove users (except owner).</Text>
            <Text style={styles.infoText}><Text style={{fontWeight:500, color:"#d4d4d4"}}>Owner</Text>: Access to everything.</Text>
          </View>
        }

        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}  >
          {/* Needs outer view for keyboard dismiss to work properly. */}

          { isAddUserHidden ? 
              <TouchableOpacity onPress={()=>{setAddUserHidden(false)}} style={styles.hideBtn}>
                  <Text style={{color:'white',fontSize:17,textAlign:'center'}}>Create Task</Text>
              </TouchableOpacity>
          :
              <View >

                <View style={styles.article}>
                      
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:'white',fontSize:18,fontWeight:500}}>Title:</Text>
                        <Text onPress={() => {setAddUserHidden(true)}} style={{color:'#a3a3a3',fontSize:16,fontWeight:400,}}>Hide</Text>
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
            

      <ScrollView contentContainerStyle={styles.scrollContainer}>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:"#262626",
        
    },
    scrollContainer:{
        flex:1,
    },
    infoBtn:{
      backgroundColor:"#404040",
      paddingHorizontal:20, 
      paddingVertical:5,
      marginTop:20,
      borderRadius:5,
      borderWidth:1,
      marginHorizontal:20,
    },
    infoContainer:{
      backgroundColor:"#404040",
      margin:20,
      padding:10,
      borderWidth:1,
      borderRadius:5,
    },
    infoText:{
      color:"#a3a3a3",
      fontSize:17,
      marginTop:10,

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