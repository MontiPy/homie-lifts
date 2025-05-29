import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";
import { Timestamp } from "firebase/firestore";

interface WorkoutLog {
  id: string;
  workoutName: string;
  completedAt: Timestamp;
  performance: {
    exercise: string;
    setsCompleted: boolean[];
  }[];
}

const WorkoutHistoryScreen = () => {
  const [history, setHistory] = useState<WorkoutLog[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = "demoUser123"; // Replace with actual user ID once auth is added

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const q = query(
          collection(db, "userWorkouts"),
          where("userId", "==", userId),
          orderBy("completedAt", "desc")
        );
        const snapshot = await getDocs(q);
        const logs: WorkoutLog[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WorkoutLog));
        setHistory(logs);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (history.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>No workout history yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏋️ Workout History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const totalSets = item.performance.reduce((acc, ex) => acc + ex.setsCompleted.length, 0);
          const completedSets = item.performance.reduce(
            (acc, ex) => acc + ex.setsCompleted.filter(Boolean).length,
            0
          );
          const date = item.completedAt.toDate().toLocaleDateString();

          return (
            <View style={styles.card}>
              <Text style={styles.title}>{item.workoutName}</Text>
              <Text style={styles.meta}>{date}</Text>
              <Text style={styles.meta}>{completedSets} / {totalSets} sets completed</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default WorkoutHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1f1f1f",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  meta: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  noData: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
});
