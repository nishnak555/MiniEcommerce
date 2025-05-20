/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    saveCart();
  }, [cartItems]);

  const loadCart = async () => {
    const json = await AsyncStorage.getItem('cart');
    if (json) {
      setCartItems(JSON.parse(json));
    }
  };

  const saveCart = async () => {
    await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
  };

  const increaseQty = (id: number) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
  };

  const decreaseQty = (id: number) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    );
    setCartItems(updated);
  };

  const removeItem = (id: number) => {
    Alert.alert("Remove Item", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Remove",
        onPress: () => {
          const updated = cartItems.filter(item => item.id !== id);
          setCartItems(updated);
        },
        style: "destructive"
      }
    ]);
  };

  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQty(item.id)} style={styles.qtyButton}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQty(item.id)} style={styles.qtyButton}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${getTotal()}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  list: {
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 14,
    borderRadius: 12,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 12,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  qty: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  remove: {
    color: '#e53935',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 6,
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right',
  },
  empty: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
    color: '#888',
  },
});
