import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function CleaningScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Cleaning screen placeholder</Text>
        <Button onPress={() => navigation.goBack()} title="Back" />
        <Button onPress={() => navigation.toggleDrawer()} title="Open/Close" />
      </View>
    );
  }

  export default CleaningScreen;