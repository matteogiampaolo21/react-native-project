import { SafeAreaView, ScrollView, StyleSheet,Keyboard, Text, TouchableOpacity,TouchableWithoutFeedback,TextInput, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import React,{useState} from 'react'
import {doc,getDoc,updateDoc} from 'firebase/firestore';
import {db} from '../../firebase/firebaseConfig';

export const AddUserPanel = ({route}) => {
  const [isInfoHidden, setInfoHidden] = useState(false);
  const [isAddUserHidden, setAddUserHidden] = useState(false);
  const [email,setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
      {label: 'Co-Owner', value: 'Co-Owner'},
      {label: 'Manager', value: 'Manager'},
      {label: 'Worker', value: 'Worker'},
  ]);

  const {projectID} = route.params;

  const addUser = async () => {
    //get specific project
    const projectRef = doc(db, "projects", projectID);
    const docSnap = await getDoc(projectRef);


    if (!docSnap.exists()) {
      console.log("No such document!");
      return;
    } 

    let tempObj = docSnap.data()
    tempObj.users.push(email);
    switch (value){
      case 'Co-Owner':
        tempObj.coOwners.push(email);
        break;
      case 'Manager':
        tempObj.managers.push(email);
        break;
      case 'Worker':
        tempObj.workers.push(email);
        break;
    }

    console.log(tempObj)
     
    //  add email to certain field and "users"
    await updateDoc(projectRef, {
      coOwners: tempObj.coOwners,
      managers: tempObj.managers,
      workers: tempObj.workers,
      users:tempObj.users,
    });
    // update front-end to show new user
  }

  return (
    <SafeAreaView style={styles.wrapper}>

        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}  >
          {/* Needs outer view for keyboard dismiss to work properly. */}

          { isAddUserHidden ? 
              <TouchableOpacity onPress={()=>{setAddUserHidden(false)}} style={styles.hideBtn}>
                  <Text style={{color:'white',fontSize:17,textAlign:'center'}}>Add user</Text>
              </TouchableOpacity>
          :
              <View >

                <View style={styles.article}>
                    
                  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                      <Text style={{color:'white',fontSize:18,fontWeight:500}}>User email:</Text>
                      <Text onPress={() => {setAddUserHidden(true)}} style={{color:'#a3a3a3',fontSize:16,fontWeight:400,}}>Hide</Text>
                  </View>
                  <TextInput
                      style={styles.input}
                      onChangeText={setEmail}
                      placeholder="Enter a user's email"
                      placeholderTextColor="#737373"
                      value={email}
                      />

                  <Text style={{color:'white',fontSize:18,fontWeight:500}}>Select a role:</Text>
                  <View style={{minHeight:(open ? 170 : 0)}}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Select the user's role"
                        placeholderStyle={{color:"#737373"}}
                        itemStyle={{flexDirection:"column"}}
                        style={{backgroundColor:'#262626',paddingHorizontal:10,paddingVertical:5,borderRadius:2,marginTop:10}}
                        arrowIconStyle={{tintColor:"#737373"}}
                        textStyle={{color:'white'}}
                        nestedScrollEnabled={true} 
                        dropDownContainerStyle={{backgroundColor:'black',}}
                        
                        />
                  </View>
                  

              
                  <TouchableOpacity style={styles.button} onPress={addUser}>
                      <Text style={styles.btnText}>Add User</Text>
                  </TouchableOpacity>
                    
                </View>
              </View>
          }
        </TouchableWithoutFeedback>
            
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
              <Text style={styles.infoText}><Text style={{fontWeight:500, color:"#d4d4d4"}}>Co-owners</Text>: Can complete, and create tasks. Also can add or remove users (except owner and other co-owners).</Text>
              <Text style={styles.infoText}><Text style={{fontWeight:500, color:"#d4d4d4"}}>Owner</Text>: Access to everything.</Text>
            </View>
          }

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
      paddingHorizontal:10,
      paddingVertical:5,
      marginVertical:10,
      borderRadius:2,
      fontSize:15,
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
    button:{
        backgroundColor:"#0ea5e9",
        paddingHorizontal:5,
        paddingVertical:5,
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
})