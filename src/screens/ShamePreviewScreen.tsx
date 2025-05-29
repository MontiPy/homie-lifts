import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchFriendsWithShameLevel } from "../services/friendService";
import { generateShameMessage } from "../utils/shameUtils";
import { Friend } from "../types/friendTypes";

const ShamePreviewScreen = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadFriends = async () => {
      const data = await fetchFriendsWithShameLevel();
      setFriends(data);
      const initialSelection: Record<string, boolean> = {};
      data.forEach(friend => initialSelection[friend.id] = true);
      setSelected(initialSelection);
    };
    loadFriends();
  }, []);

  const handleToggle = (id: string) => {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSendShame = () => {
    friends.forEach(friend => {
      if (selected[friend.id]) {
        const message = generateShameMessage(friend.shameLevel, friend.displayName);
        console.log(`SHAMING ${friend.displayName}:`, message);
      }
    });
    navigation.goBack(); // or navigate somewhere else if desired
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Friends to SHAME</Text>
      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.cardText}>
                <Text style={styles.name}>{item.displayName}</Text>
                <Text style={styles.message}>
                  {generateShameMessage(item.shameLevel, item.displayName)}
                </Text>
              </View>
              <Switch
                value={selected[item.id]}
                onValueChange={() => handleToggle(item.id)}
              />
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendShame}>
        <Text style={styles.buttonText}>😤 Send SHAME</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShamePreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e53935",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1f1f1f",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#ccc",
  },
  button: {
    backgroundColor: "#e53935",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
