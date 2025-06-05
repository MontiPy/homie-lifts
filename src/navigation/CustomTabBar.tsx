import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (route.name === "Shame") {
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={[
                styles.shameButton,
                isFocused && styles.shameButtonActive,
              ]}
            >
              <Text style={styles.shameText}>SHAME</Text>
            </TouchableOpacity>
          );
        }

        const icon =
          options.tabBarIcon &&
          options.tabBarIcon({
            focused: isFocused,
            color: isFocused ? "#FF0000" : "gray",
            size: 24,
          });

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tab}
          >
            {icon}
            <Text
              style={[styles.label, { color: isFocused ? "#FF0000" : "gray" }]}
            >
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingBottom: 8,
    paddingTop: 4,
    height: 60,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shameButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e53935",
  },
  shameButtonActive: {
    backgroundColor: "#c62828",
  },
  shameText: {
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});
