import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '../../components/ProductCard'; 

const HomeScreen = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'https://fakestoreapi.com/products/categories',
      );
      const data = await response.json();
      setCategories(['all', ...data]);
    } catch (error) {
      console.error('Category fetch error:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Product fetch error:', error);
    }
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(p => p.category === selectedCategory);

  const recommended = filteredProducts.filter(p => p.rating?.rate >= 4.0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greeting}>Hello Nishank</Text>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}>
        {categories.map(category => (
          <View
            key={category}
            style={[
              styles.categoryTab,
              selectedCategory === category && styles.selectedCategoryTab,
            ]}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
              onPress={() => setSelectedCategory(category)}>
              {category === 'all'
                ? 'All'
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Recommended */}
      <Text style={styles.sectionTitle}>Recommended for you</Text>
      <View style={styles.recommendWrap}>
        {recommended.map(product => (
          <ProductCard
            title={product.title}
            price={product.price}
            image={product.image}
            rating={product.rating?.rate ?? 0}
            onPress={() =>
              navigation.navigate('ProductDetail', {product: product})
            }
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  categoryTab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategoryTab: {
    backgroundColor: '#000',
  },
  categoryText: {
    fontSize: 14,
    color: '#888',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    padding:15,
    fontSize: 18,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
    color: '#007bff',
  },
  recommendWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
});
