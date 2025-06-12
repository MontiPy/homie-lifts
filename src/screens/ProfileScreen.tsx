import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { fetchUserWorkouts } from "../services/workoutService";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  fetchFriendsWithShameLevel,
  addFriendByIdentifier,
} from "../services/friendService";
import { Friend } from "../types/friendTypes";

const GOALS = [
  "Build Muscle",
  "Lose Fat",
  "Improve Endurance",
  "Get Stronger",
  "Just Be Consistent",
];

const ACCESS_OPTIONS = [
  "Bodyweight Only",
  "Some Weights (Kettlebells, Bands, etc.)",
  "Full Gym Access",
];

const FITNESS_LEVELS = ["Beginner", "Intermediate", "Advanced", "OVER 9000"];

const AVATARS = [
  { id: "red", src: require("../../assets/avatars/red.png") },
  { id: "blue", src: require("../../assets/avatars/blue.png") },
  { id: "green", src: require("../../assets/avatars/green.png") },
  { id: "yellow", src: require("../../assets/avatars/yellow.png") },
];

const ProfileScreen = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [userPrefs, setUserPrefs] = useState<any>({});
  const [loadingPrefs, setLoadingPrefs] = useState(true);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendIdentifier, setFriendIdentifier] = useState("");

  const fetchUserPrefs = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setUserPrefs(snap.data());
    }
    const friendsData = await fetchFriendsWithShameLevel();
    setFriends(friendsData);
    setLoadingPrefs(false);
  };

  useFocusEffect(
    useCallback(() => {
      const loadWorkouts = async () => {
        const data = await fetchUserWorkouts();
        setWorkouts(data);
      };
      loadWorkouts();
      fetchUserPrefs();
    }, []),
  );

  const handleSavePrefs = async () => {
    const user = auth.currentUser;
    if (!user) return;
    await updateDoc(doc(db, "users", user.uid), {
      goal: userPrefs.goal,
      accessLevel: userPrefs.accessLevel,
      fitnessLevel: userPrefs.fitnessLevel,
      avatarId: userPrefs.avatarId,
    });
    setShowPreferences(false);
  };

  const handleAddFriend = async () => {
    try {
      await addFriendByIdentifier(friendIdentifier.trim());
      const data = await fetchFriendsWithShameLevel();
      setFriends(data);
      setFriendIdentifier("");
      setShowAddFriend(false);
    } catch (e) {
      console.log("Failed to add friend", e);
    }
  };

  const renderOption = (options: string[], field: string) =>
    options.map((option) => (
      <TouchableOpacity
        key={option}
        style={[
          styles.option,
          userPrefs[field] === option && styles.selectedOption,
        ]}
        onPress={() => setUserPrefs({ ...userPrefs, [field]: option })}
      >
        <Text
          style={[
            styles.optionText,
            userPrefs[field] === option && styles.selectedOptionText,
          ]}
        >
          {option}
        </Text>
      </TouchableOpacity>
    ));

  const renderAvatarOptions = () => (
    <View style={styles.avatarList}>
      {AVATARS.map((avatar) => (
        <TouchableOpacity
          key={avatar.id}
          style={[
            styles.avatarCard,
            userPrefs.avatarId === avatar.id && styles.selectedCard,
          ]}
          onPress={() => setUserPrefs({ ...userPrefs, avatarId: avatar.id })}
        >
          <Image source={avatar.src} style={styles.avatarImage} />
          <Text style={styles.avatarName}>{avatar.id}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏋️ Your Workout History</Text>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.workoutName}</Text>
            <Text style={styles.meta}>
              {item.completionRate}% completed —{" "}
              {item.timestamp?.toDate?.().toLocaleString() ?? "No timestamp"}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No workouts yet.</Text>}
      />

      <Text style={[styles.header, { marginTop: 30 }]}>👥 Your Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.displayName}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No friends yet.</Text>}
      />

      <TouchableOpacity
        style={styles.addFriendButton}
        onPress={() => setShowAddFriend(true)}
      >
        <Text style={styles.editButtonText}>Add Friend</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setShowPreferences(true)}
      >
        <Text style={styles.editButtonText}>Edit Preferences</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={showPreferences}
        onRequestClose={() => setShowPreferences(false)}
      >
        <ScrollView style={styles.drawer}>
          <Text style={styles.drawerHeader}>Edit Preferences</Text>

          <Text style={styles.drawerLabel}>Fitness Goal</Text>
          {renderOption(GOALS, "goal")}

          <Text style={styles.drawerLabel}>Access Level</Text>
          {renderOption(ACCESS_OPTIONS, "accessLevel")}

          <Text style={styles.drawerLabel}>Fitness Level</Text>
          {renderOption(FITNESS_LEVELS, "fitnessLevel")}

          <Text style={styles.drawerLabel}>Avatar</Text>
          {renderAvatarOptions()}

          <TouchableOpacity style={styles.saveButton} onPress={handleSavePrefs}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowPreferences(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      <Modal
        animationType="slide"
        visible={showAddFriend}
        onRequestClose={() => setShowAddFriend(false)}
      >
        <View style={styles.drawer}>
          <Text style={styles.drawerHeader}>Add Friend</Text>
          <TextInput
            style={styles.input}
            placeholder="Username or Email"
            placeholderTextColor="#ccc"
            value={friendIdentifier}
            onChangeText={setFriendIdentifier}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleAddFriend}>
            <Text style={styles.saveButtonText}>Send Invite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setShowAddFriend(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    fontSize: 26,
    color: "#4caf50",
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1f1f1f",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  meta: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  empty: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 40,
  },
  editButton: {
    marginTop: 20,
    backgroundColor: "#4caf50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  drawer: {
    backgroundColor: "#121212",
    padding: 20,
    flex: 1,
  },
  drawerHeader: {
    fontSize: 24,
    color: "#4caf50",
    marginBottom: 20,
    textAlign: "center",
  },
  drawerLabel: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 20,
    marginBottom: 10,
  },
  option: {
    backgroundColor: "#1f1f1f",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  selectedOption: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  selectedOptionText: {
    color: "#121212",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4caf50",
    padding: 14,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#ccc",
    fontSize: 16,
  },
  avatarList: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    flexWrap: "wrap",
  },
  avatarCard: {
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#333",
    backgroundColor: "#1f1f1f",
  },
  selectedCard: {
    borderColor: "#4caf50",
    backgroundColor: "#2e2e2e",
  },
  avatarImage: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  avatarName: {
    color: "#fff",
    fontSize: 14,
    textTransform: "capitalize",
  },
  addFriendButton: {
    marginTop: 10,
    backgroundColor: "#2196f3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#1f1f1f",
    color: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
});
