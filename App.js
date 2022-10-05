import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/HomeScreen';
import GymScreen from './components/GymScreen';
import CleaningScreen from './components/CleaningScreen';
import GroceriesScreen from './components/GroceriesScreen';
import TodoScreen from './components/TodoScreen';
import MiscScreen from './components/MiscScreen';
import {
  init,
  fetchAllContent,
} from './database/db';

init()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

const Drawer = createDrawerNavigator();

const App=()=>{
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Gym" component={GymScreen} />
        <Drawer.Screen name="Cleaning" component={CleaningScreen} />
        <Drawer.Screen name="Groceries" component={GroceriesScreen} />
        <Drawer.Screen name="To-Do" component={TodoScreen} />
        <Drawer.Screen name="Miscellaneous" component={MiscScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default App;