// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen    from '../screens/HomeScreen';
import GroupsScreen  from '../screens/GroupsScreen';
import WorkoutScreen from '../screens/WorkoutScreen';

type TabParamList = {
  Home: undefined;
  Groups: undefined;
  Workout: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen   name="Home"    component={HomeScreen} />
        <Tab.Screen   name="Groups"  component={GroupsScreen} />
        <Tab.Screen   name="Workout" component={WorkoutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
