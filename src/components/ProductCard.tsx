import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ProductCardProps {
  title: string;
  price: string | number;
  image: string;
  rating: number;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, rating, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    width: '48%',
    marginBottom: 16,
  },
  image: {
    height: 120,
    marginBottom: 10,
  },
  title: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rating: {
    color: '#555',
    fontSize: 14,
    marginTop: 4,
  },
});
