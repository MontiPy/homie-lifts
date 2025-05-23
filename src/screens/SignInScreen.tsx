// src/screens/SignInScreen.tsx
import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  // ImageBackground, // Removed
  // Image, // Removed
} from "react-native";
// Attempt to import icons
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../types/navigation";

// Define navigation prop type for this screen
type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignIn"
>;

// Props include navigation with the correct type
interface SignInScreenProps {
  navigation: SignInScreenNavigationProp;
}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async () => {
    try {
      await login(email, password);
      // navigation.replace("Main"); // navigate to main app navigator
    } catch (e: any) {
      setError(e.message);
    }
  };

  // Images removed

  return (
    // Outer View for solid background color
    <View style={styles.background}> 
      <View style={styles.container}>
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        {/* Image removed */}

        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#FFD700" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255, 221, 0, 0.7)" // Lighter gold for placeholder
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#FFD700" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 221, 0, 0.7)" // Lighter gold for placeholder
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switch}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.switchText}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  background: { // This style is now for the main View
    flex: 1,
    justifyContent: "center", // Ensures container is centered if it doesn't fill flex
    backgroundColor: "#192f6a", // Solid deep blue background
  },
  container: { // This is the content container
    flex: 1, // Takes full space of background if needed, but content drives size
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  // logo style removed
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Slightly more opaque for better icon contrast
    borderColor: "#FFD700",
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15, // Padding for the container
    width: "85%", // Adjusted width
  },
  icon: {
    marginRight: 10, // Space between icon and text input
  },
  input: {
    flex: 1, // Input takes remaining space in inputContainer
    // backgroundColor, borderColor, borderWidth, borderRadius, marginBottom, paddingHorizontal are now on inputContainer
    color: "#FFFFFF", // White text color
    paddingVertical: 10, // Vertical padding for the text input itself
    // width is now controlled by inputContainer and flex:1
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF8C00", // Vibrant orange background
    paddingVertical: 15,
    // paddingHorizontal: 30, // Removed to match SignUpScreen
    borderRadius: 25, // Rounded corners
    // marginVertical: 10, // Changed to marginBottom
    marginBottom: 20, // To match SignUpScreen
    width: "85%", // Changed from "80%" to match SignUpScreen
    alignItems: "center", // Center text horizontally
  },
  buttonText: {
    color: "#FFFFFF", // White text color
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    color: "#FF6347", // Tomato red text color
    marginBottom: 16,
    textAlign: "center",
    padding: 10, // Add some padding
    borderRadius: 10, // Rounded corners
    width: "85%", // Changed from "80%" to match SignUpScreen
  },
  switch: {
    marginTop: 24,
    alignItems: "center",
  },
  switchText: {
    color: "#FFD700", // Gold color to match input borders
    fontSize: 16, // Slightly larger font
  },
});

export default SignInScreen;
