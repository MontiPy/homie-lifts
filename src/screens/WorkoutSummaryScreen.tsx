import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { saveWorkoutSummary } from "../services/workoutService";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { generateShameMessage } from "../utils/shameUtils";
import { fetchFriendsWithShameLevel } from "../services/friendService";
import { Friend } from "../types/friendTypes";



interface PerformanceEntry {
  exercise: string;
  setsCompleted: boolean[];
}

interface RouteParams {
  workoutName: string;
  performance: PerformanceEntry[];
}

const WorkoutSummaryScreen = () => {
  const route = useRoute();
  const { workoutName, performance } = route.params as RouteParams;

  useEffect(() => {
  saveWorkoutSummary(workoutName, performance);
  }, []);


  const totalSets = performance.reduce((total, ex) => total + ex.setsCompleted.length, 0);
  const completedSets = performance.reduce(
    (count, ex) => count + ex.setsCompleted.filter(Boolean).length,
    0
  );

  const completionRate = Math.round((completedSets / totalSets) * 100);

  const navigation = useNavigation<any>();

  return (
    <><View style={styles.container}>
      <Text style={styles.header}>✅ Workout Complete!</Text>
      <Text style={styles.subheader}>{workoutName}</Text>
      <Text style={styles.completion}>{completionRate}% of sets completed</Text>

      <FlatList
        data={performance}
        keyExtractor={(item) => item.exercise}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.exercise}>{item.exercise}</Text>
            <Text style={styles.sets}>
              {item.setsCompleted.filter(Boolean).length} / {item.setsCompleted.length} sets completed
            </Text>
          </View>
        )} />
    </View><View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.statsButton}
          onPress={() => navigation.navigate("Stats")} // You'll create this screen
        >
          <Text style={styles.buttonText}>📈 View Your Stats</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shameButton}
            onPress={() => navigation.navigate("ShamePreview")}
          >
          <Text style={styles.buttonText}>😤 SHAME</Text>
        </TouchableOpacity>

      </View></>

  );
  
};

export default WorkoutSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 8,
  },
  subheader: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 8,
  },
  completion: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1f1f1f",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  exercise: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  sets: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },buttonContainer: {
  marginTop: 30,
  },
statsButton: {
  backgroundColor: "#4caf50",
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
  marginBottom: 12,
   },
shameButton: {
  backgroundColor: "#e53935",
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
 },
buttonText: {
  color: "#fff",
  fontWeight: "bold",
},

  
});
