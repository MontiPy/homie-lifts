import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import StatsChart from "../components/StatsChart";

const metrics: Record<string, { label: string; data: number[] }> = {
  weight: { label: "Weight", data: [200, 198, 197, 195, 194, 192] },
  benchMax: { label: "Bench Press Max", data: [135, 145, 150, 155, 160] },
  squatMax: { label: "Squat Max", data: [185, 200, 210, 220, 230] },
};

const StatsScreen = () => {
  const [charts, setCharts] = useState<string[]>(["weight"]);
  const [nextMetric, setNextMetric] = useState<string>("benchMax");

  useEffect(() => {
    const available = Object.keys(metrics).filter((m) => !charts.includes(m));
    if (available.length && !available.includes(nextMetric)) {
      setNextMetric(available[0]);
    }
  }, [charts, nextMetric]);

  const availableToAdd = Object.keys(metrics).filter(
    (m) => !charts.includes(m),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Your Stats</Text>
      {charts.map((key) => (
        <StatsChart
          key={key}
          title={metrics[key].label}
          data={metrics[key].data}
        />
      ))}
      {availableToAdd.length > 0 && (
        <View style={styles.addContainer}>
          <Picker
            style={styles.picker}
            selectedValue={nextMetric}
            onValueChange={(val) => setNextMetric(val)}
          >
            {availableToAdd.map((key) => (
              <Picker.Item key={key} label={metrics[key].label} value={key} />
            ))}
          </Picker>
          <Button
            title="Add Chart"
            onPress={() => setCharts([...charts, nextMetric])}
          />
        </View>
      )}
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
  addContainer: {
    marginTop: 20,
  },
  picker: {
    color: "#fff",
    backgroundColor: "#333",
    marginBottom: 8,
  },
});
