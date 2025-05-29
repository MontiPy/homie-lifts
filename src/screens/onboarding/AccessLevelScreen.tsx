import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";

const ACCESS_OPTIONS = [
  "Bodyweight Only",
  "Some Weights (Kettlebells, Bands, etc.)",
  "Full Gym Access",
];

const AccessLevelScreen = () => {
  const [selectedAccess, setSelectedAccess] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const handleSelect = (option: string) => {
    setSelectedAccess(option);
  };

  const handleNext = async () => {
    const user = auth.currentUser;
    if (!user || !selectedAccess) return;

    await setDoc(
      doc(db, "users", user.uid),
      {
        accessLevel: selectedAccess,
      },
      { merge: true }
    );

    navigation.navigate("FitnessLevel");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What equipment do you have access to?</Text>

      <FlatList
        data={ACCESS_OPTIONS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selectedAccess === item && styles.selectedOption,
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text
              style={[
                styles.optionText,
                selectedAccess === item && styles.selectedOptionText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={[styles.button, !selectedAccess && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedAccess}
      >
        <Text style={styles.buttonText}>Next ➡️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccessLevelScreen;

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
  option: {
    backgroundColor: "#1f1f1f",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  selectedOption: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  selectedOptionText: {
    color: "#121212",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4caf50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
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
