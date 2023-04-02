import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MapScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [mapRegion, setMapRegion] = useState({
    latitude: route.params.latitude,
    longitude: route.params.longitude,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  });

  const [startRegion, setStartRegion] = useState({
    latitude: 45.7492469,
    longitude: 21.2309264,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  });

  const destinationRegion = {
    latitude: route.params.latitude,
    longitude: route.params.longitude,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  };

  const [showModal, setShowModal] = useState(false);
  const [directionsActive, getDirections] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const GOOGLE_MAPS_APIKEY = "AIzaSyBhooFvdbu2dYfRPBaApR4uDWw7pswCTa4";


  const getUserLocation = async () => {
    setIsLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location permission denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    setStartRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0121,
    });

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0122,
      longitudeDelta: 0.0121,
    })

    getDirections(true);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={mapRegion}>
            {directionsActive ? (
                <Marker coordinate={startRegion} title="Your location"/>
            ) : null}
           
            <Marker
                coordinate={destinationRegion}
                title="Event location">
            </Marker>

            {
                directionsActive ? (<MapViewDirections
                    origin={startRegion}
                    destination={destinationRegion}
                    apikey={GOOGLE_MAPS_APIKEY}
                    mode={"WALKING"}
                    precision={"high"}
                    strokeWidth={3}
                    strokeColor="blue"
                />) : null
            }
        </MapView>
      </View>

      {/* Indicator de incarcare */}
      {isLoading ? (
        <View style={{ position: "absolute", flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"#999999"} />
      </View>
      ) : null}

      {/* Buton de mers inapoi */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.pop(2)}}>
            <Image style={styles.backButtonImg} source={require("../assets/backButton.png")}/>
        </TouchableOpacity>
      </View>

      {/* Buton de aratat directia */}
      {
        !directionsActive ? (
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={()=>{getUserLocation()}}>
                    <Text style={styles.buttonText}>Get directions</Text>
                </TouchableOpacity>
            </View>
        ) : null
      }
    </View>
  );
}

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const SCREEN_WIDTH = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  mapContainer:{
    width: "100%",
    alignItems: "center"
  },

  map: {
    width: "100%",
    height: "100%",
    borderColor: 'black'
  },

  backButtonContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
  },

  backButton: {
    bottom: SCREEN_HEIGHT/2 - 100,
    right: SCREEN_WIDTH/2 - 60,
  },

  backButtonImg: {
    width: 50,
    height: 50,
    backgroundColor:"#EDC71C",
    borderRadius: 50,
  },

  buttonContainer: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
  },

  button:{
    backgroundColor: "#EDC71C",
    width: "50%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    top: SCREEN_HEIGHT/2 - 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },

  buttonText:{
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
});
