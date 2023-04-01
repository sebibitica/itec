import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export function EventPage ({ latitdue,longitude,name, category, description, program, location,datax }){
    const navigation=useNavigation();
    const route = useRoute();
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
                    <TouchableOpacity style={[styles.button, styles.aboutButton]}>
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