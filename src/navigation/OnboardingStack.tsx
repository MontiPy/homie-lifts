import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UsernameScreen from "../screens/onboarding/UsernameScreen";
import GoalScreen from "../screens/onboarding/GoalScreen";
import AccessLevelScreen from "../screens/onboarding/AccessLevelScreen";
import FitnessLevelScreen from "../screens/onboarding/FitnessLevelScreen";
import AvatarSetupScreen from "../screens/onboarding/AvatarSetupScreen";
import ShameIntroScreen from "../screens/onboarding/ShameIntroScreen";

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Username" component={UsernameScreen} />
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="AccessLevel" component={AccessLevelScreen} />
      <Stack.Screen name="FitnessLevel" component={FitnessLevelScreen} />
      <Stack.Screen name="AvatarSetup" component={AvatarSetupScreen} />
      <Stack.Screen name="ShameIntro" component={ShameIntroScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
