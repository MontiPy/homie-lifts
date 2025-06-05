import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShameScreen from "../screens/ShameScreen";
import ShamePreviewScreen from "../screens/ShamePreviewScreen";

const Stack = createNativeStackNavigator();

const ShameStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ShameMain" component={ShameScreen} />
    <Stack.Screen name="ShamePreview" component={ShamePreviewScreen} />
  </Stack.Navigator>
);

export default ShameStack;
