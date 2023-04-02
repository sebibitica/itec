import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import QRScanner from "./Screens/QRScanner";
import MapScreen from "./Screens/MapScreen";
import FeedScreen from "./Screens/FeedScreen";
import { EventPage } from "./Screens/EventPage";
import ProfileScreen from "./Screens/ProfileScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ForgotScreen from "./Screens/ForgotScreen";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tab" options={{headerShown: false}} component={Tabs} />
        <Stack.Screen name="EventPage" options={{headerShown: false}} component={EventPage} />
        <Stack.Screen name="MapScreen" options={{headerShown: false}} component={MapScreen} />
        <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterScreen} />
        <Stack.Screen name="Forgot" options={{headerShown: false}} component={ForgotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs(){
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#4A4A4A",
          height: "8%",
          left: 22,
          right: 22,
          bottom: 30,
          borderTopWidth: 0,
          borderRadius: 20,
          paddingTop: 15,
        },

        tabBarIcon: ({ color, size, focused }) => {
          let icoName;
          let iconColor = focused ? "#EDC71C" : "white";

          if (route.name === "Feed") {
            icoName = focused ? "home" : "home-outline";
          } else if (route.name === "QRScanner") {
            icoName = focused ? "qr-code-outline" : "qr-code-outline";
          } else if (route.name === "Profile") {
            icoName = focused ? "person" : "person-outline";
          } else if (route.name === "AddBookTab") {
            icoName = "add-circle";
          }

          return <Ionicons name={icoName} color={iconColor} size={size} />;
        },

      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="QRScanner" component={QRScanner} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
