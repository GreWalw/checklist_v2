import * as React from 'react';
import { Button, View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  init,
  addContent,
  updateContent,
  deleteContent,
  fetchAllContent,
} from './database/db';



function CleaningScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Cleaning screen placeholder</Text>
        <Button onPress={() => navigation.goBack()} title="Back" />
      </View>
    );
  }

  export default CleaningScreen;