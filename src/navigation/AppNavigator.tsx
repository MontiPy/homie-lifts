// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import WorkoutStack from "./WorkoutStack";

type TabParamList = {
  Home: undefined;
  Groups: undefined;
  Workout: undefined;
  Workouts: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "ellipse-outline";

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Workout") {
              iconName = focused ? "barbell" : "barbell-outline";
            }

            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#FF0000",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        {/* <Tab.Screen   name="Groups"  component={GroupsScreen} /> */}
        <Tab.Screen name="Workout" component={WorkoutStack} />
        {/* <Tab.Screen   name="Workouts" component={WorkoutListScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
