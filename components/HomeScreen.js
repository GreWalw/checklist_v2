import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.navigate('Gym')} title="Gym" />
        <Button onPress={() => navigation.navigate('Cleaning')} title="Cleaning" />
        <Button onPress={() => navigation.navigate('Groceries')} title="Groceries" />
        <Button onPress={() => navigation.navigate('To-Do')} title="To-Do" />
        <Button onPress={() => navigation.navigate('Miscellaneous')} title="Miscellaneous" />
        <Button onPress={() => navigation.toggleDrawer()} title="Open/Close" />
      </View>
    );
  }

  export default HomeScreen;