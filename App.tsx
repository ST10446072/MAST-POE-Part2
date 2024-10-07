import * as React from 'react';
import { View, Text, TextInput, FlatList, TouchableHighlight, Button, Alert, StyleSheet } from 'react-native';
// import { Picker } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';

 function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function EnterScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function MenuScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

 const Tab = createBottomTabNavigator();

 function MyTabs() {
   return (
     <Tab.Navigator>
       <Tab.Screen name="Home" component={HomeScreen} />
       <Tab.Screen name="Menu Creator" component={EnterScreen} />
       <Tab.Screen name="View Menu" component={MenuScreen} />
     </Tab.Navigator>
   );
 }

 export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}