import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { auth, db } from "../../services/firebase";
import {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const UsernameScreen = () => {
  const [username, setUsername] = useState("");
  const navigation = useNavigation<any>();

  const handleNext = async () => {
    console.log("Username entered:", username);

    const q = query(
      collection(db, "users"),
      where("username", "==", username.toLowerCase())
    );
    const snapshot = await getDocs(q);
    console.log("Username taken:", !snapshot.empty);

    const user = auth.currentUser;
    console.log("auth.currentUser:", user);

    if (!username || !user) {
      console.log("Exiting early due to missing username or user");
      return;
    }

    await setDoc(
      doc(db, "users", user.uid),
      {
        username: username.toLowerCase(),
      },
      { merge: true }
    );

    console.log("Navigating to Goal");

    navigation.navigate("Goal");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="homielifter"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next ➡️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UsernameScreen;

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
  input: {
    backgroundColor: "#1f1f1f",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    opacity: 0.8,
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
