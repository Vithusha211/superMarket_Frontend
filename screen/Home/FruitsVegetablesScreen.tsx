import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  FlatList,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductCard from '../../componets/layout/Cards';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  searchBg: '#FFFFFF',
  chipBg: '#F3F4F6',
};

const FILTERS = [
  'All',
  'Price ↓',
  'Price ↑',
  'Discount',
  'Popularity',
  'Newest',
] as const;

type FilterOption = (typeof FILTERS)[number];

export type FruitProduct = {
  id: string;
  image: ImageSourcePropType;
  brand: string;
  name: string;
  quantity: string;
  price: number;
  oldPrice?: number;
  discount?: number;
};

const PRODUCTS: FruitProduct[] = [
  {
    id: 'sweet-melon-1',
    image: require('../../assets/product/sweet-melon.png'),
    brand: 'Supermarket',
    name: 'Sweet Melon',
    quantity: '1kg',
    price: 5,
    oldPrice: 6.25,
    discount: 20,
  },
  {
    id: 'sweet-melon-2',
    image: require('../../assets/product/sweet-melon.png'),
    brand: 'Supermarket',
    name: 'Sweet Melon',
    quantity: '1kg',
    price: 5,
    discount: 20,
  },
  {
    id: 'sweet-melon-3',
    image: require('../../assets/product/sweet-melon.png'),
    brand: 'Supermarket',
    name: 'Sweet Melon',
    quantity: '1kg',
    price: 4.5,
    oldPrice: 6,
    discount: 25,
  },
  {
    id: 'sweet-melon-4',
    image: require('../../assets/product/sweet-melon.png'),
    brand: 'Supermarket',
    name: 'Sweet Melon',
    quantity: '1kg',
    price: 5.5,
  },
  {
    id: 'sweet-melon-5',
    image: require('../../assets/product/sweet-melon.png'),
    brand: 'Supermarket',
    name: 'Sweet Melon',
    quantity: '2kg',
    price: 9,
    discount: 15,
  },
  {
    id: 'sweet-melon-6',
    image: require('../../assets/product/sweet-melon.png'),
    brand: 'Supermarket',
    name: 'Sweet Melon',
    quantity: '500g',
    price: 3,
  },
];

type FruitsVegetablesScreenProps = {
  onBack?: () => void;
  onSearchPress?: () => void;
  onMenuPress?: () => void;
  onProductPress?: (product: FruitProduct) => void;
  onAddProduct?: (product: FruitProduct) => void;
};

export default function FruitsVegetablesScreen({
  onBack,
  onSearchPress,
  onMenuPress,
  onProductPress,
  onAddProduct,
}: FruitsVegetablesScreenProps) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Newest');

  const products = useMemo(() => {
    let list = [...PRODUCTS];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q),
      );
    }

    switch (activeFilter) {
      case 'Price ↓':
        return list.sort((a, b) => b.price - a.price);
      case 'Price ↑':
        return list.sort((a, b) => a.price - b.price);
      case 'Discount':
        return list.filter((item) => !!item.discount);
      case 'Popularity':
        return list.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
      case 'Newest':
        return list.reverse();
      case 'All':
      default:
        return list;
    }
  }, [query, activeFilter]);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Fruits & Vegetables"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
        right={
          <Pressable
            onPress={onSearchPress}
            hitSlop={8}
            style={styles.headerIcon}
          >
            <Ionicons name="search" size={20} color={COLORS.white} />
          </Pressable>
        }
      />

      <View style={styles.sheet}>
        <View style={styles.searchRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open menu"
            style={styles.menuButton}
            onPress={onMenuPress}
          >
            <Ionicons name="options-outline" size={18} color={COLORS.text} />
          </Pressable>
          <Pressable style={styles.searchBar} onPress={onSearchPress}>
            <Ionicons name="search" size={18} color={COLORS.primary} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search"
              placeholderTextColor={COLORS.muted}
              style={styles.searchInput}
              returnKeyType="search"
            />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {FILTERS.map((filter) => {
            const active = activeFilter === filter;
            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    active && styles.filterChipTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={[
            styles.gridContent,
            { paddingBottom: Math.max(insets.bottom, 20) },
          ]}
          renderItem={({ item }) => (
            <ProductCard
              image={item.image}
              brand={item.brand}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              oldPrice={item.oldPrice}
              discount={item.discount}
              onPress={() => onProductPress?.(item)}
              onAddPress={() => onAddProduct?.(item)}
              style={styles.productCard}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No fruits or vegetables found</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: '4.5%',
    paddingTop: '3.5%',
    marginBottom: 12,
  },
  menuButton: {
    width: '11.5%',
    aspectRatio: 1,
    maxWidth: 51,
    minWidth: 44,
    borderRadius: 8,
    backgroundColor: COLORS.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flex: 1,
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: COLORS.searchBg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: '3%',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    paddingVertical: 0,
  },
  filterRow: {
    paddingHorizontal: '4.5%',
    gap: 8,
    paddingBottom: 12,
  },
  filterChip: {
    minHeight: 32,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  gridContent: {
    paddingHorizontal: '4.5%',
    paddingTop: '3%',
  },
  gridRow: {
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  productCard: {
    width: '47%',
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: '9%',
  },
});
