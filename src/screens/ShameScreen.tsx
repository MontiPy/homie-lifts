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
          toValue: 1.25,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [scaleAnim]);

  return (
    <ImageBackground
      source={require("../../assets/images/temple.png")}
      style={styles.background}
      resizeMode="cover"
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shameButton: {
    backgroundColor: "#e53935",
    paddingVertical: 30,
    paddingHorizontal: 60,
    borderRadius: 100,
    shadowColor: "#e53935",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },
  shameText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 36,
  },
});
