import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Your Stats</Text>
      <Text style={styles.placeholder}>Stats will live here soon: PRs, graphs, totals, etc.</Text>
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 16,
  },
  placeholder: {
    color: "#ccc",
    fontSize: 16,
  },
});
