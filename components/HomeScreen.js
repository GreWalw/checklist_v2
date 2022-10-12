import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

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
            <Text style={styles.frontFont}>SIKLIST</Text>
          </View>
      </View>
    );
  }

  export default HomeScreen;