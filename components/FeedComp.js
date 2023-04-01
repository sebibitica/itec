import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

const EventPill = ({ name, category, description, program, location , data}) => {
  const datafrumos =
  data.slice(8, 10) + "-" + data.slice(5, 7) + "-" + data.slice(0, 4);
  const navigation = useNavigation()  
  const handleAboutPress = () => {
    navigation.navigate('EventPage', { 
      name:name,
      category:category,
      description:description,
      program:program,
      location:location,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="calendar-month" size={24} color="white" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.category}> - </Text>
          <Text style={styles.category}>{datafrumos}</Text>
        </View>

        {/* <Text style={styles.description}>{description}</Text> */}
        <View style={styles.programLocationContainer}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={19}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.program}>{program}</Text>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={19}
            color="white"
            style={styles.icon}
          />
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.location}>
            {location}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.leftButton]}
          onPress={handleAboutPress}>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.buttonText}>About</Text>
          </View>
        </TouchableOpacity>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A4A4A",
    borderRadius: 20,
    padding: 19,
    marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: "#EDC71C",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  category: {
    color: "#8F8F8F",
    fontSize: 17,
    marginBottom: 5,
    marginLeft:3,
  },
  description: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
  programLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  program: {
    color: "white",
    fontSize: 17,
    marginLeft: 5,
    marginRight: 20,
  },
  location: {
    color: "white",
    fontSize: 17,
  },
  icon: {
    marginLeft: 5,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#4A4A4A",
    paddingHorizontal: 19,
    paddingVertical: 10,
    marginTop: 14,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  leftButton: {
    backgroundColor: "#EDC71C",
    borderBottomLeftRadius: 15,
    width: "100%",
  },
  rightButton: {
    backgroundColor: "#8F8F8F",
    borderBottomRightRadius: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EventPill;
