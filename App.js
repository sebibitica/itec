import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
import QRScanner from "./Screens/QRScanner";
import MapScreen from "./Screens/MapScreen";
import FeedScreen from "./Screens/FeedScreen";
import { EventPage } from "./Screens/EventPage";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="FeedScreen"
          component={FeedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QRScanner"
          component={QRScanner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventPage"
          component={EventPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
