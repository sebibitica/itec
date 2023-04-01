import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
} from "react-native";

export function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button title="press" onPress={() => navigation.navigate("QRScanner")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
