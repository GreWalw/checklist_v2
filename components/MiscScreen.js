import * as React from 'react';
import {useState} from 'react';
import { Animated, View, Text, TextInput, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import { addContent, updateContent, fetchAllContent, deleteContent, refreshDone, init, checkItemDone, fetchAllDoneContent } from '../database/db';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/EvilIcons';

import {styles} from '../styles/styles';

var table = 'Miscellaneous';
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

function MiscScreen({navigation}) {
  const [content, setContent] = useState('');
  const [itemList, setItemList] = useState([]);
  const [doneItemList, setDoneItemList] = useState([]);
  const [updateID, setUpdateId] = useState(-1);
  const [counter, setCounterTrue]=useState(false);

  let row: Array<any> = [];
  let prevOpenedRow;
  
  counterHandler();
  
    
  function counterHandler(){
    if(!counter){
      readAllContent();
      readAllDoneContent();
      setCounterTrue(true);
    }
  }
  
  const contentInputHandler = enteredText => {
    setContent(enteredText);
  };

const closeRow = (index) => {
  console.log('Closing row.');
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
    console.log("Sending content.");
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
}

async function updateContentInDb() {
  if (!content.trim()) {
    alert('Input field is empty!');
    return;
  }
  try {
    const dbResult = await updateContent(table, updateID, content, done);
    console.log('Updating content');
  } catch (err) {
    console.log(err);
  } finally {
    readAllContent();
    readAllDoneContent();
    setContent('');
    setUpdateId(-1);
    closeRow();
  }
}

async function refresh(){
  console.log(done);
  done=0;
  console.log(done);
  try {
    console.log("Refreshing list");
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
    console.log("Setting all items done.");
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
}

async function setItemDone(id) {
  console.log(done);
  done = 1;
  console.log(done);
  try {
    console.log('Setting an item done.');
    console.log(done);
  const dbResult = await checkItemDone(table, done, itemList[id].id);
  console.log(itemList[id].id);
  console.log('dbResult: ' + dbResult); 
} catch (err) {
  console.log(err);
} finally {
  done=0;
  readAllContent();
  readAllDoneContent();
  closeRow();
}
}

async function setItemNotDone(id){
  done=0;
  console.log(done + "set item not done");
  try {
    const dbResult = await checkItemDone(table, done, doneItemList[id].id); //using the same db method as setItemDone
    console.log('dbResult: ' + dbResult); 
  } catch (err) {
    console.log(err);
  } finally {
    done=0;
    readAllContent();
    readAllDoneContent();
  }
}

  async function readAllContent(id) {
    try {
      const dbResult = await fetchAllContent(table);
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
      console.log(dbResult);
      setDoneItemList(dbResult);
    } catch (err) {
      console.log(err);
    } finally {
      console.log('All read');
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
        <Text style={styles.inputStyle}>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
    </Swipeable>
  );
};

  const renderContent2 = ({item, index}) => {
    return (
        <TouchableOpacity
          activeOpacity={0.8}
          onLongPress={() => setItemNotDone(index, item.id)}
          key={index}>
          <View>
            <Text style={styles.inputStyle}>
            <Icon name="check" style={styles.checkIcon} size={22}/>  {item.content}  
            </Text>
          </View>
        </TouchableOpacity>
    );
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

export default MiscScreen;
