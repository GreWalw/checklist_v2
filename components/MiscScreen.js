import * as React from 'react';
import {useState} from 'react';
import { Animated, Button, View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { addContent, updateContent, fetchAllContent, deleteContent, init } from '../database/db';
import Swipeable from 'react-native-gesture-handler/Swipeable';

var table="Miscellaneous";
var done=0;

init(table)
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

const keyHandler = (item, index) => {
  return index.toString();
};
  
function MiscScreen({ navigation }) {

const [content, setContent] = useState('');
const [itemList, setItemList] = useState([]);
const [updateID, setUpdateId] = useState(-1);
//const [done, setDone] = useState();

const contentInputHandler = enteredText => {
  setContent(enteredText);
};

const renderRightActions = (id) => {
  return (
    <View style={styles.swipedRow}>
      <Animated.View style={[styles.deleteButton]}>
        <TouchableOpacity onPress={()=>deleteItem(id)} key={id}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

async function sendContent(){
  try {
    console.log("app 22");
    const dbResult = await addContent(table, content, done);
    console.log('dbResult: ' + dbResult); //For debugging purposes to see the data in the console screen
    readAllContent();
  } catch (err) {
    console.log(err);
  } finally {
    setContent('');
    readAllContent();
  }
}

const updateItem = id => {
  setUpdateId(itemList[id].id);
  setContent(itemList[id].content);
};

async function deleteItem(id){
  try{
    const dbResult = await deleteContent(table, id);
    readAllContent();
  }
  catch(err){
    console.log(err);
  }
  finally{
    //No need to do anything
  }
}

async function updateContentInDb() {
  try {
    const dbResult = await updateContent(table, updateID, content, done);
    console.log('Päivitys alkaapi tästä');
    readAllContent();
  } catch (err) {
    console.log(err + ' funktio erroria');
  } finally {
    setContent('');
    setUpdateId(-1);
  }
}

async function readAllContent(id) {
  try {
    const dbResult = await fetchAllContent(table);
    console.log('dbResult readAllContent in GymScreen.js');
    console.log(dbResult);
    setItemList(dbResult);
  } catch (err) {
    console.log('Error: ' + err);
  } finally {
    console.log('All read');
  }
}

const renderContent = ({item, index}) => {
  return (
    <Swipeable renderRightActions={()=>renderRightActions(item.id)}>
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() => updateItem(index, item.content)}
      key={index}>
      <View style={styles.listItemStyle}>
        <Text>
          no:{index} content:{item.content}
        </Text>
      </View>
    </TouchableOpacity>
    </Swipeable>
  );
};

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               <Text style={styles.textStyle}>Miscellaneous !</Text>
        <FlatList
          style={styles.flatliststyle}
          keyExtractor={keyHandler}
          data={itemList}
          renderItem={renderContent}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Add list element here"
          onChangeText={contentInputHandler}
          value={content}
        />
        <Button title="Add" onPress={() => sendContent()} />
        <Button title="Edit here" onPress={() => updateContentInDb()} />
        <Text>Hello from Misc!</Text>
        <Button onPress={() => navigation.goBack()} title="Back" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    inputStyle: {
      flex: 0,
      flexDirection: 'column',
      backgroundColor: '#abc',
      borderColor: 'black',
      borderWidth: 2,
      margin: 5,
      padding: 5,
      width: '50%',
    },
    deleteButtonText: {
      backgroundColor: "red",
      color: "white",
    }
  });

  export default MiscScreen;