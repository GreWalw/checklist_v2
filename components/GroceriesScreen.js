import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  init,
  addContent,
  updateContent,
  deleteContent,
  fetchAllContent,
} from './database/db';

function GroceriesScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Groceries screen placeholder</Text>
        <Button onPress={() => navigation.goBack()} title="Back" />
      </View>
    );
  }

  export default GroceriesScreen;