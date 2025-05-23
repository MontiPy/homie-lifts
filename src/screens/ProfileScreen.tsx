// src/screens/ProfileScreen.tsx
import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);

  const onLogout = async () => {
    try {
      await logout();
    } catch (e: any) {
      console.error("Failed to log out:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.email}>Signed in as: {user?.email}</Text>
      <Button title="Log Out" onPress={onLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  email: { marginBottom: 24, textAlign: "center" },
});
