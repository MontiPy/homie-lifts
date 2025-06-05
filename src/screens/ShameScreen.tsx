import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ShameScreen = () => {
  const navigation = useNavigation<any>();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scaleAnim]);

  return (
    <ImageBackground
      source={require("../../assets/images/homie-bg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={styles.shameButton}
            onPress={() => navigation.navigate("ShamePreview")}
          >
            <Text style={styles.shameText}>SHAME</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default ShameScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // optional but good for full coverage
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  shameButton: {
    backgroundColor: "#e53935",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 100,
    shadowColor: "#e53935",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  shameText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
});
