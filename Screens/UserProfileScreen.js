import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import EventPill from '../components/FeedComp';
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from 'react-native';
import { useContext } from "react";
import { AuthContext } from "./ProfileScreen";
import { SafeAreaView } from 'react-native-safe-area-context';
import { firestore } from '../firebase';
import { auth } from '../firebase';
import { RefreshControl } from 'react-native';

const dateToday = new Date().toISOString().slice(0, 8);

const url =
  "https://b2bw.fluxer.io/rest/script_php_306/getEvenimenteZileNopti/";
const day = new Date().getDate();


export function UserProfileScreen({firstName, lastName}) {

  const [userEvents, setUserEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      await firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("events")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setUserEvents(data);
      })
      .catch((error) => {
        console.log("Error getting events: ", error);
      });
    }

    getEvents();
  }, [refreshing]);

  const [userData, setUserData] = useState("");
  const [data1, setData] = useState([]);
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
      };
      fetchData();
    }, [refreshing]);
  
    const nowH = new Date().getHours(),
      nowM = new Date().getMinutes();
    const now = nowH + ":" + nowM;
  
    const filteredData = data1.filter((item) => {
      const eventTime = item.ora;
      return eventTime >= now || eventTime < now;
    });

    const [finalData, setFinalData] = useState([]);
    
  useEffect(() => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserData(snapshot.data());
        }
      });
  }, []);

  useEffect(() => {
    if (userEvents.length > 0 || filteredData.length > 0) {
      const eventsName = userEvents.map((event) => event.name);
      const eventsDate = userEvents.map((event) => event.date);

      const finalData = filteredData.filter((item) => {
        const name = item.titlu;
        const date = item.data;
        let reversedDate = date.split("-").reverse().join("-");
        return eventsName.includes(name) && eventsDate.includes(reversedDate);
      });
      setFinalData(finalData);
    }
  }, [data1, userEvents]);


    //titlu

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
            <Text style={styles.helloMessageName}>{userData.firstname} {userData.lastname}</Text>
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
            data={finalData}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh}  />
            }
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