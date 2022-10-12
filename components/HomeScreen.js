import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { init, addContent, updateContent, deleteContent, fetchAllContent } from './database/db';
import { styles } from '../styles/styles';
import Icon from 'react-native-vector-icons/EvilIcons';

function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Gym')}>
            <Text style={styles.textStyle}>GYM</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cleaning')}>
            <Text style={styles.textStyle}>CLEANING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Groceries')}>
            <Text style={styles.textStyle}>GROCERIES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('To-Do')}>
            <Text style={styles.textStyle}>TO-DO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Miscellaneous')}>
            <Text style={styles.textStyle}>MISC</Text>
          </TouchableOpacity>
          <View style={styles.brand}>
            <Text>SIKLIST - 2022</Text>
            <Text>Grek - Heinonen - Kailanto</Text>
          </View>
      </View>
    );
  }

  export default HomeScreen;