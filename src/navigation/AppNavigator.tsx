// src/navigation/AppNavigator.tsx
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MainTabs from "./MainTabs";
import OnboardingStack from "./OnboardingStack";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const Stack = createStackNavigator();

function Routes() {
  const { user, loading, onboardingComplete } = useContext(AuthContext);

  if (loading || (user && onboardingComplete === null)) {
    return null; // or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : !onboardingComplete ? (
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
