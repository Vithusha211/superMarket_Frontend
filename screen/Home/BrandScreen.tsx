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
import Header from '../../componets/layout/Header';
import ProductCard from '../../componets/layout/Cards';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  chipBg: '#F2F2F3',
  chipActive: '#07C187',
  searchBg: '#F8F8F8',
  sheet: '#FFFFFF',
};

export type BrandProduct = {
  id: string;
  image: ImageSourcePropType;
  brand: string;
  name: string;
  quantity: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category: string;
  description: string;
};

const MALIBAN_PRODUCTS: BrandProduct[] = [
  {
    id: 'cream-cracker',
    image: require('../../assets/brands/cream-cracker.png'),
    brand: 'Maliban',
    name: 'Cream Cracker',
    quantity: '490g',
    price: 12,
    category: 'Biscuits',
    description:
      'Classic Maliban cream crackers. Light, crispy and perfect with tea or cheese.',
  },
  {
    id: 'real-chocolate',
    image: require('../../assets/brands/real-chocolate.png'),
    brand: 'Maliban',
    name: 'Real Chocolate',
    quantity: '400g',
    price: 15,
    discount: 10,
    category: 'Biscuits',
    description:
      'Rich chocolate coated biscuits from Maliban. A sweet treat for everyday snacking.',
  },
  {
    id: 'gold-marie',
    image: require('../../assets/brands/gold-marie.png'),
    brand: 'Maliban',
    name: 'Gold Marie',
    quantity: '350g',
    price: 8,
    category: 'Biscuits',
    description:
      'Soft and tasty Marie biscuits. Ideal with milk for kids and family tea time.',
  },
  {
    id: 'ginger-biscuit',
    image: require('../../assets/brands/ginger-biscuit.png'),
    brand: 'Maliban',
    name: 'Ginger Biscuit',
    quantity: '240g',
    price: 7,
    category: 'Biscuits',
    description:
      'Spicy ginger biscuits with a crunchy bite. Great with hot tea.',
  },
  {
    id: 'digestive',
    image: require('../../assets/brands/digestive.png'),
    brand: 'Maliban',
    name: 'Digestive Biscuit',
    quantity: '120g',
    price: 6,
    category: 'Biscuits',
    description:
      'Wholesome digestive biscuits made with wheat. A healthy everyday snack.',
  },
  {
    id: 'kiri-milk-powder',
    image: require('../../assets/brands/kiri-milk-powder.png'),
    brand: 'Maliban',
    name: 'Kiri Milk Powder',
    quantity: '400g',
    price: 18,
    category: 'Milk & Dairy',
    description:
      'Full cream milk powder for rich, creamy milk anytime at home.',
  },
  {
    id: 'maliban-fresh-milk',
    image: require('../../assets/brands/fresh-milk.png'),
    brand: 'Maliban',
    name: 'Fresh Milk',
    quantity: '1L',
    price: 5,
    category: 'Milk & Dairy',
    description:
      'Fresh full cream milk. Pure, nutritious and ready to drink.',
  },
];

const CHIPS = ['All', 'Tea', 'Milk & Dairy', 'Biscuits', 'Dairy', 'Spreads'];

type BrandScreenProps = {
  brandName?: string;
  products?: BrandProduct[];
  onBack?: () => void;
  onMenuPress?: () => void;
  onSearchPress?: () => void;
  onProductPress?: (product: BrandProduct) => void;
  onAddProduct?: (product: BrandProduct) => void;
};

export default function BrandScreen({
  brandName = 'Maliban',
  products = MALIBAN_PRODUCTS,
  onBack,
  onMenuPress,
  onSearchPress,
  onProductPress,
  onAddProduct,
}: BrandScreenProps) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [activeChip, setActiveChip] = useState('All');

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeChip !== 'All') {
      list = list.filter((item) => item.category === activeChip);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q),
      );
    }
    return list;
  }, [products, activeChip, query]);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title={brandName}
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
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
              placeholder={`Search ${brandName}`}
              placeholderTextColor={COLORS.muted}
              style={styles.searchInput}
              returnKeyType="search"
            />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {CHIPS.map((chip) => {
            const active = activeChip === chip;
            return (
              <Pressable
                key={chip}
                onPress={() => setActiveChip(chip)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text
                  style={[styles.chipText, active && styles.chipTextActive]}
                >
                  {chip}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <FlatList
          data={filtered}
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
            <Text style={styles.emptyText}>No products found</Text>
          }
        />
      </View>
    </View>
  );
}

export { MALIBAN_PRODUCTS };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.sheet,
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
  chipRow: {
    paddingHorizontal: '4.5%',
    gap: 12,
    paddingBottom: 12,
  },
  chip: {
    minHeight: 32,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: COLORS.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: COLORS.chipActive,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
  },
  chipTextActive: {
    color: COLORS.white,
  },
  gridContent: {
    paddingHorizontal: '4.5%',
    paddingTop: '3%',
    gap: 10,
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
