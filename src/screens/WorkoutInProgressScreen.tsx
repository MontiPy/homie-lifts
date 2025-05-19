import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  CheckBox
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface Workout {
  name: string;
  category: string;
  durationWeeks: number;
  exercises: Exercise[];
}

const WorkoutInProgressScreen = () => {
  const route = useRoute();
  const { workoutId } = route.params as { workoutId: string };

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [completedSets, setCompletedSets] = useState<{ [key: string]: boolean[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const docRef = doc(db, "workouts", workoutId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Workout;
          setWorkout(data);
          const initialState: { [key: string]: boolean[] } = {};
          data.exercises.forEach((ex) => {
            initialState[ex.name] = Array(ex.sets).fill(false);
          });
          setCompletedSets(initialState);
        } else {
          console.warn("No such workout!");
        }
      } catch (error) {
        console.error("Error fetching workout:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [workoutId]);

  const toggleSet = (exerciseName: string, setIndex: number) => {
    setCompletedSets((prev) => {
      const updated = [...(prev[exerciseName] || [])];
      updated[setIndex] = !updated[setIndex];
      return { ...prev, [exerciseName]: updated };
    });
  };

  const handleFinishWorkout = () => {
    console.log("Workout complete! Tracking data coming soon.");
    // Later: push to userWorkouts collection in Firestore
  };

  if (loading || !workout) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 {workout.name}</Text>
      <FlatList
        data={workout.exercises}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseDetails}>{item.reps} reps @ {item.weight} lbs</Text>
            {completedSets[item.name]?.map((checked, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.setRow}
                onPress={() => toggleSet(item.name, idx)}
              >
                <View style={[styles.checkbox, checked && styles.checkedBox]} />
                <Text style={styles.setText}>Set {idx + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

      <TouchableOpacity style={styles.finishButton} onPress={handleFinishWorkout}>
        <Text style={styles.finishButtonText}>Finish Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutInProgressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
  },
  exerciseCard: {
    backgroundColor: "#1f1f1f",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 10,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#888",
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  setText: {
    color: "#ccc",
  },
  finishButton: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#4caf50",
    borderRadius: 8,
  },
  finishButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
