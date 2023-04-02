import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth } from '../firebase';
import { useState, useEffect } from 'react';
import { firestore } from '../firebase';


export function EventPage ({ latitdue,longitude,name, category, description, program, location,datax }){
    const navigation=useNavigation();
    const route = useRoute();

    const [logged, setLogged] = useState(false);

    const checkIfLoggedIn = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLogged(true);
            } else {
                setLogged(false);
            }
        });
    }

   useEffect(() => {
     checkIfLoggedIn();
   }, []);

   const [userEvents, setUserEvents] = useState([]);

   useEffect(() => {
    if(logged){
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
    }
  }, [logged]);

   const handleInterested = () => {
        if(!logged){
            alert("You need to be logged in to do this");
            return;
        }
        else{
            const eventsName = userEvents.map((event) => event.name);
            const eventsDate = userEvents.map((event) => event.date);
            
            if(eventsName.includes(route.params.name) && eventsDate.includes(route.params.datax)){
                Alert.alert(
                    "You are already interested in this event",
                    "Do you want to remove it from your list?",
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                        { text: "Yes", onPress: () => {
                            firestore
                            .collection("users")
                            .doc(auth.currentUser.uid)
                            .collection("events")
                            .where("name", "==", route.params.name)
                            .where("date", "==", route.params.datax)
                            .get()
                            .then(querySnapshot => {
                                querySnapshot.forEach(doc => {
                                doc.ref.delete().then(() => {
                                    alert("Event removed from your list");
                                }).catch(error => {
                                    console.log("Error removing event: ", error);
                                });
                                });
                            })
                            .catch(error => {
                                console.log("Error querying events: ", error);
                            });
                        } }
                    ],
                    { cancelable: false }
                )
                return;
            }
            else { 
                firestore
                .collection("users")
                .doc(auth.currentUser.uid)
                .collection("events")
                .add({
                    name: route.params.name,
                    date: route.params.datax
                })
                .then(() => {
                    alert("Event added to your list");
                })
                .catch((error) => {
                    console.log("Error adding event: ", error);
                });
            }
        }
   }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View>
                <View style={styles.header} className>
                    <Text style={styles.title}>{route.params.name}</Text>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.category}>{route.params.category}</Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.category}>{route.params.program}</Text>
                        <Text style={styles.divider}>|</Text>
                        <Text style={styles.category}>{route.params.datax}</Text>
                    </View>
                </View>
                

                <View style={styles.content}>
                    <Text style={styles.description}>{route.params.description}</Text>
                    <View style={styles.locationContainer}>
                        <Text style={styles.location}>{route.params.location}</Text>
                        <MaterialCommunityIcons
                            name="map-marker-outline"
                            size={19}
                            color="black"
                            style={styles.icon}
                        />
                    </View>
                </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.button, styles.aboutButton]} onPress={()=>{handleInterested()}}>
                        <Text style={styles.buttonText}>I'm interested</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.mapsButton]} onPress={()=>navigation.navigate("MapScreen",{
                        latitude:route.params.latitude,
                        longitude:route.params.longitude,
                    })}>
                        <Text style={styles.buttonText}>Maps</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    header: {
        padding: 20,
        backgroundColor: '#4A4A4A',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
    },
    category: {
        color: '#EDC71C',
        fontSize: 16,
        marginRight: 10,
    },
    divider: {
        color: '#EDC71C',
        fontSize: 16,
        marginHorizontal: 5,
    },
    content: {
        padding: 20,
    },
    description: {
        fontSize: 18,
        marginBottom: 20,
        lineHeight: 28,
        color: '#4A4A4A',
    },
    locationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 30,
    },
    button: {
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
    },
    aboutButton: {
        backgroundColor: '#4A4A4A',
    },
    mapsButton: {
        backgroundColor: '#EDC71C',
        
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});