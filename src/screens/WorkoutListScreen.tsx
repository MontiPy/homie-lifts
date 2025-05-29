import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

import { useNavigation } from '@react-navigation/native';
import { WorkoutScreenNavigationProp } from '../types/navigation';


interface Workout {
  id: string;
  name: string;
  category: string;
  durationWeeks: number;
}

const WorkoutListScreen = () => {
  const [workouts, setWorkouts] = useState<(Workout & { id: string })[]>([]);
  const navigation = useNavigation<WorkoutScreenNavigationProp>();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const querySnapshot = await getDocs(collection(db, "workouts"));
      const fetched: (Workout & { id: string })[] = querySnapshot.docs.map(doc => ({
            ...(doc.data() as Workout),
            id: doc.id,}));
      setWorkouts(fetched);
    };

    fetchWorkouts();
  }, []);

  const renderItem = ({ item }: { item: Workout }) => (
    <TouchableOpacity style={styles.card} 
    onPress={() => navigation.navigate("WorkoutDetail", { workoutId: item.id })}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.duration}>{item.durationWeeks} weeks</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Workout Programs</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={renderItem}
      />
    </View>
  );
};

export default WorkoutListScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  header: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 12,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  category: {
    color: "#ccc",
    marginTop: 4,
  },
  duration: {
    color: "#888",
    marginTop: 2,
    fontSize: 12,
  },
});
