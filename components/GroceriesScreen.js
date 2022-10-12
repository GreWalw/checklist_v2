import * as React from 'react';
import {useState} from 'react';
import {
  Animated,
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  addContent,
  updateContent,
  fetchAllContent,
  deleteContent,
  refreshDone,
  init,
  checkItemDone,
  fetchAllDoneContent,
} from '../database/db';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/EvilIcons';

import {styles} from '../styles/styles';

var table = 'Groceries';
var done = 0;

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

function GroceriesScreen({navigation}) {
const [content, setContent] = useState('');
const [itemList, setItemList] = useState([]);
const [doneItemList, setDoneItemList] = useState([]);
const [updateID, setUpdateId] = useState(-1);
let row: Array<any> = [];
let prevOpenedRow;

  const contentInputHandler = enteredText => {
    setContent(enteredText);
  };

  const renderRightActions = id => {
    return (
      <View style={styles.swipedRow}>
        <Animated.View style={[styles.deleteButton]}>
          <TouchableOpacity onPress={() => deleteItem(id)} key={id}>
            <Text style={styles.deleteButtonText}><Icon name="trash" size={50} color="linen" /></Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

const closeRow = (index) => {
  console.log('closerow');
  if (prevOpenedRow && prevOpenedRow !== row[index]) {
    prevOpenedRow.close();
  }
  prevOpenedRow = row[index];
};

async function sendContent(){
  if (!content.trim()) {
    alert('Input field is empty!');
    return;
  }
  try {
    console.log("app 22");
    const dbResult = await addContent(table, content, done);
    console.log('dbResult: ' + dbResult); //For debugging purposes to see the data in the console screen
  } catch (err) {
    console.log(err);
  } finally {
    setContent('');
    readAllContent();
    readAllDoneContent();
    closeRow();
  }

const updateItem = id => {
  setUpdateId(itemList[id].id);
  setContent(itemList[id].content);
  closeRow();
};

async function deleteItem(id){
  try{
    const dbResult = await deleteContent(table, id);
    
  }
  catch(err){
    console.log(err);
  }
  finally{
    readAllContent();
    readAllDoneContent();
    closeRow();
  }

async function updateContentInDb() {
  if (!content.trim()) {
    alert('Input field is empty!');
    return;
  }
  try {
    const dbResult = await updateContent(table, updateID, content, done);
    console.log('Päivitys alkaapi tästä');
  } catch (err) {
    console.log(err + ' funktio erroria');
  } finally {
    readAllContent();
    readAllDoneContent();
    setContent('');
    setUpdateId(-1);
    closeRow();
  }

async function refresh(){
  console.log(done);
  done=0;
  console.log(done);
  try {
    console.log("app 44");
    const dbResult = await refreshDone(table, done);
    console.log('dbResult: ' + dbResult); 
  } catch (err) {
    console.log(err);
  } finally {
    readAllContent();
    readAllDoneContent();
    closeRow();
  }
}
async function setAllDone(){
  console.log(done);
  done=1;
  console.log(done);
  try {
    console.log("app 44");
    const dbResult = await refreshDone(table, done);
    console.log('dbResult: ' + dbResult); 
  } catch (err) {
    console.log(err);
  } finally {
    done=0;
    readAllContent();
    readAllDoneContent();
    closeRow();
  }

  async function setItemDone(id) {
    done = 1;
    console.log(done);
    try {
      console.log('app 44');
      console.log(done);
      const dbResult = await checkItemDone(table, done, itemList[id].id);
      console.log(itemList[id].id);
      console.log('dbResult: ' + dbResult);
    } catch (err) {
      console.log(err);
    } finally {
      done = 0;
      readAllContent();
      readAllDoneContent();
    }

async function setItemNotDone(id){
  console.log(done);
  done=0;
  console.log(done + "set item not done");
  try {
    console.log("app 159");
    console.log(done);
    const dbResult = await checkItemDone(table, done, doneItemList[id].id); //using the same db method as setItemDone
    console.log(itemList[id].id);
    console.log('dbResult: ' + dbResult); 
  } catch (err) {
    console.log(err);
  } finally {
    done=0;
    readAllContent();
    readAllDoneContent();
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
  
  async function readAllDoneContent() {
    try {
      const dbResult = await fetchAllDoneContent(table);
      console.log('dbResult readAllDoneContent in GymScreen.js');
      console.log(dbResult);
      setDoneItemList(dbResult);
    } catch (err) {
      console.log('Erroria pukkaa done: ' + err);
    } finally {
      console.log('All read');
    }
  }
}

const renderContent = ({item, index}) => {
  return (
    <Swipeable renderRightActions={()=>renderRightActions(item.id)}
    onSwipeableWillOpen={() => closeRow(index)}
      ref={(ref) => (row[index] = ref)}
      rightOpenValue={-50}>  
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() => updateItem(index, item.content)}
      onPress={()=>setItemDone(index, item.id)}
      key={index}>
      <View style={styles.listItemStyle}>
        <Text>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
    </Swipeable>
  );
};
const renderContent2 = ({item, index}) => {
  return (
    
    <Swipeable renderRightActions={()=>renderRightActions(item.id)}>
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() => updateItem(index, item.content)}
      onPress={()=>setItemNotDone(index, item.id)}
      key={index}>
      <View style={styles.listItemStyle}>
        <Text>
           {item.content} <Icon name='check' size={30} color="black" />
        </Text>
      </View>
    </TouchableOpacity>
    </Swipeable>
  );
};

  return (
    <View style={styles.container}>
      <View style={styles.inputItems}>
        <TextInput
          style={styles.inputFieldStyle}
          placeholder="Add to list here"
          onChangeText={contentInputHandler}
          value={content}
        />
        <TouchableHighlight onPress={() => {}}>
          <View>
            <Icon name="plus" size={50} onPress={() => sendContent()} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {}}>
          <View>
            <Icon name="pencil" size={50} onPress={() => updateContentInDb()} />
          </View>
        </TouchableHighlight>
      </View>

      <FlatList
        style={styles.flist}
        keyExtractor={keyHandler}
        data={itemList}
        renderItem={renderContent}
      />
      <Text style={styles.doneText}>What is done already</Text>
      <FlatList
        style={styles.flist2}
        keyExtractor={keyHandler}
        data={doneItemList}
        renderItem={renderContent2}
      />

      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={styles.massButton} 
          onPress={() => refresh()}>
          <Text>Refresh all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.massButton}
          onPress={() => setAllDone()}>
          <Text>All done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default GroceriesScreen;