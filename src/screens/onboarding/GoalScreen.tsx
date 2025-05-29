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

const GOALS = [
  "Build Muscle",
  "Lose Fat",
  "Improve Endurance",
  "Get Stronger",
  "Just Be Consistent",
];

const GoalScreen = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  const handleSelect = (goal: string) => {
    setSelectedGoal(goal);
  };

  const handleNext = async () => {
    const user = auth.currentUser;
    if (!user || !selectedGoal) return;

    await setDoc(
      doc(db, "users", user.uid),
      {
        goal: selectedGoal,
      },
      { merge: true }
    );

    navigation.navigate("AccessLevel");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are your fitness goals?</Text>

      <FlatList
        data={GOALS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              selectedGoal === item && styles.selectedOption,
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text
              style={[
                styles.optionText,
                selectedGoal === item && styles.selectedOptionText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={[styles.button, !selectedGoal && styles.disabledButton]}
        onPress={handleNext}
        disabled={!selectedGoal}
      >
        <Text style={styles.buttonText}>Next ➡️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoalScreen;

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
