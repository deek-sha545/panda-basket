import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

export default function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⚠️ IMPORTANT: replace localhost with your PC IP if testing on phone
    fetch("http://172.16.48.33:4000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* App Logo */}
      <Image source={require("../assets/images/logo.jpg")} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Users from Backend</Text>

      {/* Content */}
      {loading ? (
        <Text>Loading...</Text>
      ) : users.length > 0 ? (
        users.map((user, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.name}>{user.email}</Text>
            <Text style={styles.role}>{user.role}</Text>
          </View>
        ))
      ) : (
        <Text>No users found</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center", // center logo & content
    backgroundColor: "#fff",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2e7d32", // green theme
  },
  card: {
    width: "100%",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  role: {
    fontSize: 14,
    color: "gray",
  },
});

