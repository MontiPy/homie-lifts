import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { VictoryChart, VictoryLine } from "victory-native";

interface StatsChartProps {
  title: string;
  data: number[];
  width?: number;
  height?: number;
}

const StatsChart: React.FC<StatsChartProps> = ({
  title,
  data,
  width = 300,
  height = 150,
}) => {
  if (data.length === 0) return null;

  const chartData = data.map((y, x) => ({ x, y }));

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <VictoryChart width={width} height={height}>
        <VictoryLine
          interpolation="monotoneX"
          style={{ data: { stroke: "#4caf50" } }}
          data={chartData}
        />
      </VictoryChart>
    </View>
  );
}; 

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 24,
  },
  chartTitle: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StatsChart;
