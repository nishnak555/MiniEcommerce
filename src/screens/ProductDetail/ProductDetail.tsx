import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { product }: any = route.params;

 const handleAddToCart = async () => {
  const json = await AsyncStorage.getItem('cart');
  const existing = json ? JSON.parse(json) : [];

  const found = existing.find((item: any) => item.id === product.id);
  if (found) {
    found.quantity += 1;
  } else {
    existing.push({ ...product, quantity: 1 });
  }

  await AsyncStorage.setItem('cart', JSON.stringify(existing));

  Alert.alert(
    'Added to Cart',
    'Do you want to go to the cart?',
    [
      { text: 'Stay', style: 'cancel' },
      {
        text: 'Go to Cart',
        onPress: () => navigation.navigate('MainTabs', {
          screen: 'CartScreen',
        }),
      },
    ]
  );
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>

      <Text style={styles.rating}>
        ⭐ {product.rating?.rate?.toFixed(1) ?? 'N/A'} ({product.rating?.count ?? 0} ratings)
      </Text>

      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Add to Cart" onPress={handleAddToCart} color="black" />
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    height: 300,
    width: '100%',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 30,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '100%',
  },
});
