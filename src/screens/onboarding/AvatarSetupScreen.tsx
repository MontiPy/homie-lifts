import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AvatarSetupScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are your fitness goals?</Text>
      {/* Add goal selection UI later */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ShameIntro")}>
        <Text style={styles.buttonText}>Next ➡️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarSetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
