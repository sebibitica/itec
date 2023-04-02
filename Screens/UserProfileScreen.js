import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import EventPill from '../components/FeedComp';
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native';
import { useContext } from "react";
import { AuthContext } from "./ProfileScreen";

const dateToday = new Date().toISOString().slice(0, 8);

const url =
  "https://b2bw.fluxer.io/rest/script_php_306/getEvenimenteZileNopti/";
const day = new Date().getDate();


export function UserProfileScreen({firstName, lastName}) {

    const [data1, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        const data = [];
        for (let i = 0; i < 7; i++) {
          let daytmp = day;
          if (daytmp < 10) daytmp = "0" + (daytmp + i);
          else daytmp = daytmp + i;
          let urltmp = url + dateToday + daytmp;
          const response = await fetch(urltmp);
          const responseData = await response.json();
          data.push(responseData);
        }
        const flatdata = data.flat();
        setData(flatdata);
        setLoading(false);
      };
      fetchData();
    }, []);
  
    const nowH = new Date().getHours(),
      nowM = new Date().getMinutes();
    const now = nowH + ":" + nowM;
  
    const filteredData = data1.filter((item) => {
      const eventTime = item.ora;
      return eventTime >= now || eventTime < now;
    });

    const { handleLogout } = useContext(AuthContext);

    const renderItem = ({ item }) => (
        <EventPill
          lat={item.latLngLocation.lat}
          lng={item.latLngLocation.lng}
          name={item.titlu}
          category={item.tip}
          description={item.descriere}
          program={item.ora}
          location={item.adresa}
          data={item.data}
        />)

    return (
    <View style={{ height: "100%" }}>
    <SafeAreaView style={{ flex: 1 }}>
      <View >
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.helloMessage}>Hello,</Text>
            <Text style={styles.helloMessageName}>Tudor Todea</Text>
          </View>

          <TouchableOpacity onPress={()=>{handleLogout()}} style={{marginRight: 15}}>
            <Ionicons name="log-out-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.upcomingEvents}>
          <Text style={styles.title}>Your upcoming events</Text>
          {/* Add your upcoming events components here */}
        </View>
        {filteredData.length === 0 && (
          <Text style={{ textAlign: "center" }}>No upcoming events today</Text>
        )}
        {filteredData.length > 0 && (
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            style={{ flexGrow: 1, margin: 10, marginBottom: 190 }}
          />
        )}
      </View>
      </SafeAreaView>
      </View>
    );
    }

const styles = StyleSheet.create({
    helloMessage: {
      fontSize: 34,
      color: '#4A4A4A',
      marginBottom: 16,
      marginLeft:10,
      fontWeight:'bold'
    },

    helloMessageName: {
        fontSize: 34,
        color: '#EDC71C',
        marginBottom: 16,
        marginLeft:10,
        fontWeight:'bold'
    },

    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 8,
    },
    upcomingEvents: {
      backgroundColor: '#4A4A4A',
      padding: 12,
      borderRadius: 8,
      margin:5
    },
  });



// write me the code for this function, including css, 