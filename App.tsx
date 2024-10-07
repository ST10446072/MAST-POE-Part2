import * as React from 'react';
import { View, Text, TextInput, FlatList, TouchableHighlight, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import for Picker
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';

interface Course {
  id: number;
  courseName: string;
}

interface Dish {
  name: string;
  description: string;
  price: number;
  course: string;
}

function HomeScreen() {

  const courseList: Course[] = [
    { id: 1, courseName: 'Hors D Oeuvre' },
    { id: 2, courseName: 'Amuse-Bouche' },
    { id: 3, courseName: 'Soup' },
    { id: 4, courseName: 'Salad' },
    { id: 5, courseName: 'Appetiser' },
    { id: 6, courseName: 'Fish' },
    { id: 7, courseName: 'Main Course' },
    { id: 8, courseName: 'Palate Cleanser' },
    { id: 9, courseName: 'Second Main Course' },
    { id: 10, courseName: 'Cheese' },
    { id: 11, courseName: 'Dessert' },
    { id: 12, courseName: 'Mignardise' },
  ];

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [dishList, setDishList] = useState<Dish[]>([]);

  const handleSaveDish = (): void => {
    const theName = name;
    const theDescription = description;
    const thePrice = parseFloat(price);
    const theCourse = course;

    let errors: string[] = [];
    if (!theName) errors.push("Dish Name is required");
    if (!theDescription) errors.push("Dish Description is required");
    if (isNaN(thePrice) || thePrice <= 0) errors.push("Price of dish must be a positive number");
    if (!theCourse) errors.push("Course is required");

    if (errors.length > 0) {
      Alert.alert("Error", errors.join(", "));
      return;
    }

    const newDish: Dish = { name: theName, description: theDescription, price: thePrice, course: theCourse };
    setDishList((prevDishList) => [...prevDishList, newDish]);
  };

  return (
    <View>
      <View>
        <Text>ADD DISH</Text>
      </View>

      <View>
        {/* Input */}
        <TextInput
          placeholder='Enter Dish Name'
          onChangeText={setName}
          value={name}
        />
        <TextInput
          placeholder='Enter Dish Description'
          onChangeText={setDescription}
          value={description}
        />
        <TextInput
          placeholder='Enter Dish Price'
          onChangeText={setPrice}
          value={price}
          keyboardType="numeric"
        />
        <Picker
          onValueChange={(itemValue) => { setCourse(itemValue); }}
          selectedValue={course}
        >
          {courseList.map((item) => (
            <Picker.Item label={item.courseName} value={item.courseName} key={item.id} />
          ))}
        </Picker>
      </View>

      <View>
        {/* Buttons */}
        <TouchableHighlight onPress={handleSaveDish}>
          <Text>SAVE</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

function EnterScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Menu Creator!</Text>
    </View>
  );
}

function MenuScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>View Menu!</Text>
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
