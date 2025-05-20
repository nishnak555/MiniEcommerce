/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import ProductCard from '../../components/ProductCard';
import {useNavigation} from '@react-navigation/native';

const ProductListScreen = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        console.log(res, 'ressss');
        const json = await res.json();
        setProducts(json);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search products"
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item}) => (
          <ProductCard
            title={item.title}
            price={item.price}
            image={item.image}
            rating={item.rating?.rate ?? 0}
            onPress={() =>
              navigation.navigate('ProductDetail', {product: item})
            }
          />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  list: {
    paddingBottom: 20,
  },
});
