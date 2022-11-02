import React from 'react';
import { View, StyleSheet } from 'react-native';
import Result from './components/Result.js';
import Constants from 'expo-constants'

export default function App() {

  return (
    <View style={styles.container}>
      <Result />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color:"white",
    marginTop: Constants.statusBarHeight,
    padding:0,
    flex:1,
    backgroundColor: "#010A18",
  },
})