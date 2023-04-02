import React, { useState, useEffect } from "react";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Linking } from "react-native";

export default function QRScanner() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, [scanned]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let lat = parseFloat(data.split(" ")[0]),
      long = parseFloat(data.split(" ")[1]),
      name = data.split(" ")[2],
      address = data.split(" ")[3];
      tip = data.split(" ")[4],
      descriere= data.split(" ")[5],
      ora= data.split(" ")[6],
      datax= data.split(" ")[7];
    name=name.replace(/;/g, " ");
    address=address.replace(/;/g, " ");
    tip=tip.replace(/;/g, " ");
    descriere=descriere.replace(/;/g, " ");
    setScanned(false);
    navigation.navigate("EventPage", {
      latitude: lat,
      longitude: long,
      name: name,
      category: tip,
      description: descriere,
      program: ora,
      location: address,
      datax: datax,
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBox: {
    position: "absolute",
    top: SCREEN_HEIGHT - 150,
    height: "15%",
    width: "33%",
  },
  button: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
