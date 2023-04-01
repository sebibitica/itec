import React from 'react';
import { StyleSheet, View } from 'react-native';
import EventPill from '../components/FeedComp';
import data from '../events.json'
import { Text } from 'react-native';
import { FlatList } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'

const FeedScreen = () => {

    const renderItem = ({item}) => (
        <EventPill
        key={item.id}
        name={item.name}
        category={item.category}
        description={item.description}
        program={item.program}
        location={item.location}
        date={item.date}
        />
    )

    return (
        <View style={{height:"100%"}}>
        <SafeAreaView style={{flex:1}} >
        <Text style = {styles.title}>Events today</Text>
        <FlatList
        data={data.events}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={{flexGrow:1, margin:10}}
        />
        </SafeAreaView>
        </View>
    );
  };

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 200,
        marginBottom: 20,
        color: '#333',
        textShadowColor: '#ccc',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
      },
      scrollViewContent: {
        minHeight: '100%',
        padding: 10,
        marginBottom:100,
      },

});

export default FeedScreen;

