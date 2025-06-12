import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Polyline } from "react-native-svg";

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

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const range = maxValue - minValue || 1;
      const y = height - ((value - minValue) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <Svg width={width} height={height}>
        <Polyline
          points={points}
          fill="none"
          stroke="#4caf50"
          strokeWidth="2"
        />
      </Svg>
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
