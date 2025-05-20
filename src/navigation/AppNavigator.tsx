/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Home/homeScreen';
import ProductListScreen from '../screens/ProductList/ProductListScreen';
import CartScreen from '../screens/Cart/CartScreen';
import ProductDetailScreen from '../screens/ProductDetail/ProductDetail'; 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const BrowseStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProductList"
      component={ProductListScreen}
      options={{ title: 'Browse Products' }}
    />
  </Stack.Navigator>
);

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
     let iconName = 'home-outline';

        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Browse') {
          iconName = 'search-outline';
        } else if (route.name === 'CartScreen') {
          iconName = 'cart-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerShown: false,
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Browse" component={BrowseStack} />
    <Tab.Screen name="CartScreen" component={CartScreen} />
  </Tab.Navigator>
);


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Product Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
