// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Homie Lifts!</Text>
      <Text style={styles.subtext}>Lift heavy weights, log workouts, and <Text style={styles.bold}>BULLY</Text> your friends into being swole.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:16 },
  title:     { fontSize:36, fontWeight:'bold', marginBottom:8 },
  subtext:   { fontSize:20, alignContent:'center', textAlign:'center', width: '60%' },
  bold:     { fontWeight:'bold', color:'red' },
});
