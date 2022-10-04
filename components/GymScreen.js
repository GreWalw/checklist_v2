import * as React from 'react';
import {useState} from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { addContent, init } from '../database/db';
var table="Gym";
var done=0;
init(table)
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });


  //TÄMÄ KOKO SIVU ON KESKEN, ADD-FUNKTIO ON ALUSTETTU JA SEN PITÄISI TOIMIA PERUSTASOLLA!
function GymScreen({ navigation }) {

const [content, setContent] = useState('');
//const [done, setDone] = useState();

const contentInputHandler = enteredText => {
  setContent(enteredText);
};

async function sendContent(){
  try {
    console.log("app 22");
    const dbResult = await addContent(table, content, done);
    console.log('dbResult: ' + dbResult); //For debugging purposes to see the data in the console screen
    
  } catch (err) {
    console.log(err);
  } finally {
    //No need to do anything
  }
}


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Add list element here"
          onChangeText={contentInputHandler}
        />
        <Button title="Add" onPress={() => sendContent()} />
        <Text>Gym screen placeholder</Text>
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
  });
  export default GymScreen;