import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";

export default function MapScreen() {
  const route = useRoute();

  const [startRegion, setStartRegion] = useState({
    latitude: 45.7492469,
    longitude: 21.2309264,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  });

  const destinationRegion = {
    latitude: route.params.latitude,
    longitude: route.params.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [showModal, setShowModal] = useState(false);

  const GOOGLE_MAPS_APIKEY = "AIzaSyBhooFvdbu2dYfRPBaApR4uDWw7pswCTa4";

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Location permission denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    setStartRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: location.coords.latitudeDelta,
      longitudeDelta: location.coords.longitudeDelta,
    });
  };

  useEffect(() => {
    //userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={startRegion}>
        <Marker coordinate={startRegion} title="Your Location" />
        <Marker
          coordinate={destinationRegion}
          title="Todea"
          image={require("../assets/MapMarker.png")}
          calloutEnabled={false}
          onPress={() => {
            setShowModal(true);
          }}
          style={{
            transform: [{ scale: 0.7 }],
          }}
        ></Marker>

        <MapViewDirections
          origin={startRegion}
          destination={destinationRegion}
          apikey={GOOGLE_MAPS_APIKEY}
          mode={"WALKING"}
          precision={"high"}
          strokeWidth={3}
          strokeColor="blue"
        />
      </MapView>

      <Modal visible={showModal} animationType="slide" style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 50,
            paddingRight: 30,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "yellow",
              borderRadius: 20,
              elevation: 10,
              shadowColor: "black",
              shadowOffset: { width: 2, height: 5 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              borderColor: "black",
              borderWidth: 0.3,
            }}
            onPress={() => setShowModal(false)}
          >
            <Text style={{ margin: 10, fontWeight: "bold" }}>Close</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{route.params.name}</Text>
          <Text>{route.params.address}</Text>
        </View>
      </Modal>
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

  map: {
    width: "100%",
    height: "100%",
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
