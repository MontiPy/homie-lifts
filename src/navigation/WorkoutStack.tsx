import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutListScreen from "../screens/WorkoutListScreen";
import WorkoutDetailScreen from "../screens/WorkoutDetailScreen";

const Stack = createNativeStackNavigator();

const WorkoutStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="WorkoutList" component={WorkoutListScreen} />
    <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
  </Stack.Navigator>
);

export default WorkoutStack;
