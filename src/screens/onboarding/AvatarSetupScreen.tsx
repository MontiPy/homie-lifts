import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";

const avatars = [
  { id: "red", src: require("../../../assets/avatars/red.png") },
  { id: "blue", src: require("../../../assets/avatars/blue.png") },
  { id: "green", src: require("../../../assets/avatars/green.png") },
  { id: "yellow", src: require("../../../assets/avatars/yellow.png") },
];

const AvatarSetupScreen = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const handleNext = async () => {
    const user = auth.currentUser;
    if (!user || !selectedAvatar) return;

    await setDoc(
      doc(db, "users", user.uid),
      {
        avatarId: selectedAvatar,
      },
      { merge: true }
    );

    navigation.navigate("ShameIntro");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick your Homie Avatar</Text>

      <FlatList
        data={avatars}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.avatarList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.avatarCard,
              selectedAvatar === item.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedAvatar(item.id)}
          >
            <Image source={item.src} style={styles.avatarImage} />
            <Text style={styles.avatarName}>{item.id}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={[styles.button, !selectedAvatar && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedAvatar}
      >
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
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  avatarList: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    alignItems: "center",
    flexGrow: 1,
  },
  avatarCard: {
    backgroundColor: "#1f1f1f",
    padding: 10,
    marginHorizontal: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    alignSelf: "flex-start",
  },
  selectedCard: {
    borderColor: "#4caf50",
    backgroundColor: "#2e2e2e",
  },
  avatarImage: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  avatarName: {
    color: "#fff",
    fontSize: 14,
    textTransform: "capitalize",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#555",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
