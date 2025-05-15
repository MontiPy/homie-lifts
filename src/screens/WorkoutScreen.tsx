// src/screens/WorkoutScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function WorkoutScreen() {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>— Workout logging & “Start Workout” button go here —</Text>
      <Button title="Start Workout" onPress={() => {/* TODO: notify group */}}/>
    </View>
  );
}
