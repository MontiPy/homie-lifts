// src/screens/SignInScreen.tsx
import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
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

  const backgroundImage = require("../../assets/images/homie-bg.png");
  const saiyansImage = require("../../assets/images/saiyans.png");

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        <Image source={saiyansImage} style={styles.logo} />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
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
          <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center", // Center items horizontally
  },
  logo: {
    width: 150, // Adjust width as needed
    height: 150, // Adjust height as needed
    resizeMode: "contain",
    marginBottom: 20, // Add some space below the logo
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Semi-transparent white background
    borderColor: "#FFD700", // Gold border color
    borderWidth: 2,
    borderRadius: 25, // Rounded corners
    color: "#FFFFFF", // White text color
    marginBottom: 15, // Increased margin
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "80%",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF8C00", // Vibrant orange background
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25, // Rounded corners
    marginVertical: 10, // Add some vertical margin
    width: "80%",
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
    width: "80%", // Match input width
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
