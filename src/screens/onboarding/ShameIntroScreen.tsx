import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import { saveUserProfile } from "../../services/userService";
import { auth, db } from "../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthContext";

const exampleMessages = [
  {
    level: 1,
    text: "Hey bro, just FYI someone worked out today and you didn’t. No big deal. 😇",
  },
  { level: 5, text: "Hey man… the gym misses you. Unlike your gains." },
  { level: 10, text: "SHAME. SHAME. SHAME. 🔔" },
];

const ShameIntroScreen = () => {
  const navigation = useNavigation<any>();
  const { setOnboardingComplete } = useContext(AuthContext);

  const handleFinish = async () => {
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, "users", user.uid), {
        onboardingComplete: true,
      });
      setOnboardingComplete(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Introducing: SHAME</Text>
      <Text style={styles.subtitle}>
        A feature that lets your friends know when you're slacking.
      </Text>

      <FlatList
        data={exampleMessages}
        keyExtractor={(item) => item.level.toString()}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => (
          <View style={styles.messageCard}>
            <Text style={styles.levelText}>Level {item.level}</Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>GET SHAMING</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShameIntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  messageList: {
    paddingBottom: 24,
  },
  messageCard: {
    backgroundColor: "#1f1f1f",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  levelText: {
    color: "#4caf50",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
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
