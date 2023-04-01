import React from "react";
import { StyleSheet, Button, View } from "react-native";
import EventPill from "../components/FeedComp";
import data from "../events.json";
import { Text } from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";

const dateToday = new Date().toISOString().slice(0, 10);
console.log(dateToday);

const url =
  "https://b2bw.fluxer.io/rest/script_php_306/getEvenimenteZileNopti/"+dateToday;

const FeedScreen = () => {
  const navigation = useNavigation();
  const [data1, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  console.log(data1);

  const nowH = new Date().getHours(),
    nowM = new Date().getMinutes();
  const now = nowH + ":" + nowM;

  const filteredData = data1.filter((item) => {
    const eventTime = item.ora;
    return eventTime >= now;
  });

  const renderItem = ({ item }) => (
    <EventPill
      name={item.titlu}
      category={item.tip}
      description={item.descriere}
      program={item.ora}
      location={item.adresa}
    />
  );

  return (
    <View style={{ height: "100%" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Button
          title="press"
          onPress={() => navigation.navigate("QRScanner")}
        />
        <Text style={styles.title}>Events today</Text>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          style={{ flexGrow: 1, margin: 10 }}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 200,
    marginBottom: 20,
    color: "#333",
    textShadowColor: "#ccc",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  scrollViewContent: {
    minHeight: "100%",
    padding: 10,
    marginBottom: 100,
  },
});

export default FeedScreen;
