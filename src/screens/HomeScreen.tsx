import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/saiyans.png")}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.tag_overlay}>
          <Text style={styles.tagline}>
            <>SHAME YOUR FRIENDS.{"\n"}GET FIT TOGETHER!</>
          </Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1, alignSelf: "baseline" }}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.overlay}>
              {/* <View style={styles.section}>
                <Text style={styles.sectionTitle}>Last Workout</Text>
                <Text style={styles.sectionText}>PHUL - Power Upper</Text>
                <Text style={styles.sectionText}>Completed: 3 days ago</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Start Again</Text>
                </TouchableOpacity>
              </View> */}

              <View style={styles.section}>
                {/* <Text style={styles.sectionTitle}>Quick Actions</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Start Custom Workout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Workout History</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.shameButton}>
            <Text style={styles.shameButtonText}>Shame</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate("WorkoutHistory")}
>
  <Text style={styles.buttonText}>View Workout History</Text>
</TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "flex-end",
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 16,
    verticalAlign: "bottom",
  },
  tag_overlay: {
    padding: 5,
  },
  tagline: {
    color: "#fff",
    fontFamily: "Papyrus",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContent: {
    alignItems: "center",
    paddingTop: height * 0.03,
    paddingBottom: Platform.OS === "android" ? 60 : 20,
  },
  backdropBox: {
    width: "90%",
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    backgroundColor: "rgba(255, 0, 0, 0.38)",
    borderRadius: 20,
    alignItems: "center",
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: width * 0.045,
    color: "#333",
    marginBottom: height * 0.03,
  },
  section: {
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.01,
    color: "#000",
  },
  sectionText: {
    fontSize: width * 0.04,
    color: "#444",
    marginBottom: height * 0.005,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 10,
    marginVertical: height * 0.007,
    width: width * 0.75,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
  shameButton: {
    width: width * 0.35,
    height: width * 0.35,
    borderRadius: width * 0.175,
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.04,
    marginBottom: Platform.OS === "android" ? 20 : 0,
  },
  shameButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: width * 0.06,
    textTransform: "uppercase",
  },
  footerContainer: {
    position: "absolute",
    bottom: Platform.OS === "android" ? 20 : 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  
});

export default HomeScreen;
