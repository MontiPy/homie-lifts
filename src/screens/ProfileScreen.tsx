import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { fetchUserWorkouts } from "../services/workoutService";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const ProfileScreen = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadWorkouts = async () => {
        const data = await fetchUserWorkouts();
        setWorkouts(data);
      };
      loadWorkouts();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏋️ Your Workout History</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.workoutName}</Text>
            <Text style={styles.meta}>
              {item.completionRate}% completed —{" "}
              {item.timestamp?.toDate?.().toLocaleString() ?? "No timestamp"}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No workouts yet.</Text>}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    fontSize: 26,
    color: "#4caf50",
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1f1f1f",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  meta: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  empty: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 40,
  },
});
