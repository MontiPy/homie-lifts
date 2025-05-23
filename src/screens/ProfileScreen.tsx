// // src/screens/ProfileScreen.tsx

import React, { useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";

const stats = [
  { label: "Workouts", value: "too many" },
  { label: "Friends", value: "unlimited" },
  { label: "Goals", value: "already did them" },
];

const activities = [
  {
    icon: <MaterialCommunityIcons name="run" size={24} color="#FFFFFF" />,
    title: "Morning Run",
    subtitle: "30 min · 200 calories",
  },
  {
    icon: <MaterialCommunityIcons name="dumbbell" size={24} color="#fff" />,
    title: "Weightlifting",
    subtitle: "45 min · 350 calories",
  },
  {
    icon: <MaterialCommunityIcons name="bike" size={24} color="#fff" />,
    title: "Cycling",
    subtitle: "60 min · 500 calories",
  },
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  // export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const onLogout = async () => {
    try {
      await logout();
    } catch (e: any) {
      console.error("Failed to log out:", e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ width: 40, alignItems: "flex-start" }}>
          <TouchableOpacity
            onPress={() => navigation.canGoBack() && navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Profile</Text>

        <View style={{ width: 40, alignItems: "flex-end" }}>
          <TouchableOpacity onPress={onLogout}>
            <Ionicons name="log-out" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_e_wRDaXevmDW7MXcWvoA1RWbiD-1P-ETrYe1EHKUIzbC6ZmJ2xSWxyMPNXf0j-E0vPvtf5wf4qApw8r8dYL3Hct3Kf3YrQWmwZOlwOBHF2BPB6rWXRslTETBM22ON5pP9SMcwDI8hTWljQsZKj45XvNCvshIkPvubwi3WjKcaYz-vnkS0OZ2X8uKv97IcDKPlJgx8zRm20yBCikvY7xGpmn6q7aAFl6G8i18FweraNWdN7jQjBXX7piHXhIeVrclmJPc-suYDmg",
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Cory-kun</Text>
          <Text style={styles.username}>@lucyboi</Text>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {activities.map((act, idx) => (
          <View key={idx} style={styles.activityRow}>
            <View style={styles.activityIconBg}>{act.icon}</View>
            <View style={styles.activityText}>
              <Text style={styles.activityTitle}>{act.title}</Text>
              <Text style={styles.activitySubtitle}>{act.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111418",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
    backgroundColor: "#111418",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "#293038",
    marginBottom: 16,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  username: {
    color: "#9DABB8",
    fontSize: 16,
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: "#293038",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    minWidth: 120,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: 100,
    borderWidth: 1,
    borderColor: "#3C4753",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },
  statLabel: {
    color: "#9DABB8",
    fontSize: 14,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#111418",
  },
  activityIconBg: {
    backgroundColor: "#293038",
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  activitySubtitle: {
    color: "#9DABB8",
    fontSize: 14,
  },
});
