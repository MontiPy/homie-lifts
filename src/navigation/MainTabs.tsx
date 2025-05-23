// src/navigation/AppNavigator.tsx
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import WorkoutStack from "./WorkoutStack";
import ProfileScreen from "../screens/ProfileScreen";

type TabParamList = {
  Home: undefined;
  Groups: undefined;
  Workout: undefined;
  Workouts: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "ellipse-outline";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Workout") {
            iconName = focused ? "barbell" : "barbell-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF0000",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      {/* <Tab.Screen   name="Groups"  component={GroupsScreen} /> */}
      <Tab.Screen name="Workout" component={WorkoutStack} />
      {/* <Tab.Screen   name="Workouts" component={WorkoutListScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* <Tab.Screen   name="Settings"  component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}
