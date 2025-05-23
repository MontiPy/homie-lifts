import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutListScreen from "../screens/WorkoutListScreen";
import WorkoutDetailScreen from "../screens/WorkoutDetailScreen";
import WorkoutInProgressScreen from "../screens/WorkoutInProgressScreen";
import WorkoutSummaryScreen from "../screens/WorkoutSummaryScreen";
import WorkoutHistoryScreen from "../screens/WorkoutHistoryScreen";

const Stack = createNativeStackNavigator();

const WorkoutStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="WorkoutList" component={WorkoutListScreen} />
    <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} />
    <Stack.Screen
      name="WorkoutInProgress"
      component={WorkoutInProgressScreen}
    />
   <Stack.Screen name="WorkoutSummary" component={WorkoutSummaryScreen} />
<Stack.Screen name="WorkoutHistory" component={WorkoutHistoryScreen} />
</Stack.Navigator>

);

export default WorkoutStack;
