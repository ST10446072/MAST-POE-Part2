import * as React from 'react';
import { View, Text, TextInput, FlatList, TouchableHighlight, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import for Picker
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useMemo } from 'react';
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

  const totalMenuItems = useMemo(() => dishList.length, [dishList]);

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
    // Clear input fields after saving
    setName('');
    setDescription('');
    setPrice('');
    setCourse('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ADD DISH</Text>

      <View>
        <Text style={styles.totalDish}>Total: {totalMenuItems}</Text>
      </View>
      <View>
        <Text style={styles.subHeading}>Menu</Text>
        {dishList.map((dish, index) => (
          <Text style={styles.dishColor }key={index}>
            {dish.name} - {dish.description} - R{dish.price.toFixed(2)} - {dish.course}
          </Text>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder='Enter Dish Name'
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter Dish Description'
        onChangeText={setDescription}
        value={description}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter Dish Price'
        onChangeText={setPrice}
        value={price}
        keyboardType="numeric"
      />
      <Picker
        onValueChange={(itemValue) => { setCourse(itemValue); }}
        selectedValue={course}
        style={styles.picker}
      >
        <Picker.Item label="Select a Course" value="" />
        {courseList.map((item) => (
          <Picker.Item label={item.courseName} value={item.courseName} key={item.id} />
        ))}
      </Picker>

      <TouchableHighlight style={styles.button} onPress={handleSaveDish}>
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableHighlight>
    </View>
  );
}

function EnterScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Menu Creator!</Text>
    </View>
  );
}

function MenuScreen() {
  return (
    <View style={styles.screenContainer}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  totalDish: {
    color: 'white',
  },
  subHeading: {
    fontSize: 22,
    height: 200,
    marginTop: 30,
    marginBottom: 30,
    textAlign:  'center',
    textDecorationLine: 'underline',
    color: 'white',
    marginVertical: 10,
  },
  input: {
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: 'gray',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    marginVertical: 10,
  },

  inputText: {
    color: 'white',
  },

  dishColor: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:  'center',
    marginTop: 15,
    fontSize: 19,
  },

  picker: {
    marginTop: 30,
    backgroundColor: 'gray',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'gold',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
