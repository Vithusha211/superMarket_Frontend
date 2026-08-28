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
import SideBar from '../../componets/layout/SideBar';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  border: '#E5E7EB',
  chipBg: '#F3F4F6',
};

type SortKey = 'all' | 'price-desc' | 'price-asc' | 'popularity' | 'newest';

type SortChip = {
  key: SortKey;
  label: string;
  arrow?: 'up' | 'down';
};

const SORT_CHIPS: SortChip[] = [
  { key: 'all', label: 'All' },
  { key: 'price-desc', label: 'Price', arrow: 'down' },
  { key: 'price-asc', label: 'Price', arrow: 'up' },
  { key: 'popularity', label: 'Popularity' },
  { key: 'newest', label: 'Newest' },
];

export type OfferProduct = {
  id: string;
  image: ImageSourcePropType;
  brand: string;
  name: string;
  quantity: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  popularity: number;
  addedAt: number;
  description: string;
};

const OFFERS: OfferProduct[] = [
  {
    id: 'ambewela-fresh-1l',
    image: require('../../assets/search/product-ambewela.png'),
    brand: 'Ambewela',
    name: 'Fresh Milk',
    quantity: '1L',
    price: 12,
    oldPrice: 15,
    discount: 30,
    popularity: 98,
    addedAt: 8,
    description:
      'Fresh full cream milk sourced daily. Rich in calcium and vitamins.',
  },
  {
    id: 'ambewela-fresh-500',
    image: require('../../assets/search/product-ambewela.png'),
    brand: 'Ambewela',
    name: 'Fresh Milk',
    quantity: '500ml',
    price: 12,
    oldPrice: 15,
    discount: 30,
    popularity: 92,
    addedAt: 7,
    description: 'Fresh full cream milk in a handy 500ml pack.',
  },
  {
    id: 'maliban-fresh-milk',
    image: require('../../assets/brands/fresh-milk.png'),
    brand: 'Maliban',
    name: 'Fresh Milk',
    quantity: '1L',
    price: 12,
    oldPrice: 15,
    discount: 30,
    popularity: 88,
    addedAt: 6,
    description: 'Fresh full cream milk. Pure, nutritious and ready to drink.',
  },
  {
    id: 'kiri-milk-powder',
    image: require('../../assets/brands/kiri-milk-powder.png'),
    brand: 'Maliban',
    name: 'Kiri Milk Powder',
    quantity: '400g',
    price: 18,
    oldPrice: 22,
    discount: 20,
    popularity: 84,
    addedAt: 5,
    description: 'Full cream milk powder for rich, creamy milk anytime.',
  },
  {
    id: 'chocolate-milk',
    image: require('../../assets/product/chocolate-milk.png'),
    brand: 'Kotmale',
    name: 'Chocolate Milk',
    quantity: '1L',
    price: 5,
    oldPrice: 7,
    discount: 25,
    popularity: 76,
    addedAt: 4,
    description: 'Smooth chocolate flavoured milk packed with calcium.',
  },
  {
    id: 'sweet-melon',
    image: require('../../assets/product/sweet-melon.png'),
    brand: 'Fresh Farm',
    name: 'Sweet Melon',
    quantity: '500g',
    price: 5,
    oldPrice: 6,
    discount: 15,
    popularity: 71,
    addedAt: 3,
    description: 'Fresh sweet melon, juicy and ripe.',
  },
  {
    id: 'value-pack-yoghurt',
    image: require('../../assets/product/value-pack.png'),
    brand: 'Highland',
    name: 'Yoghurt Pack',
    quantity: '8 pcs',
    price: 12,
    oldPrice: 16,
    discount: 25,
    popularity: 65,
    addedAt: 2,
    description: 'Buy 7 get 1 free yoghurt value pack for the whole family.',
  },
  {
    id: 'vanilla-ice-cream',
    image: require('../../assets/dairy/vanilla-ice-cream.png'),
    brand: 'Dairy',
    name: 'Vanilla Ice Cream',
    quantity: '2L',
    price: 18,
    oldPrice: 20,
    discount: 10,
    popularity: 58,
    addedAt: 1,
    description: 'Smooth dairy vanilla ice cream. Family pack 2 litre tub.',
  },
];

type BestOffersScreenProps = {
  onBack?: () => void;
  onMenuPress?: () => void;
  onProductPress?: (product: OfferProduct) => void;
  onAddProduct?: (product: OfferProduct) => void;
};

export default function BestOffersScreen({
  onBack,
  onMenuPress,
  onProductPress,
  onAddProduct,
}: BestOffersScreenProps) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [activeSort, setActiveSort] = useState<SortKey>('all');
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const products = useMemo(() => {
    let list = [...OFFERS];

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q),
      );
    }

    if (activeSort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'popularity') {
      list.sort((a, b) => b.popularity - a.popularity);
    } else if (activeSort === 'newest') {
      list.sort((a, b) => b.addedAt - a.addedAt);
    }

    return list;
  }, [query, activeSort]);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Best offers"
        titleAlign="left"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <View style={styles.searchRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open filters"
            style={styles.menuButton}
            onPress={() => setIsMenuVisible(true)}
          >
            <Ionicons name="options-outline" size={18} color={COLORS.text} />
          </Pressable>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={COLORS.muted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search"
              placeholderTextColor={COLORS.muted}
              style={styles.searchInput}
              returnKeyType="search"
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {SORT_CHIPS.map((chip) => {
            const active = activeSort === chip.key;
            return (
              <Pressable
                key={chip.key}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                onPress={() => setActiveSort(chip.key)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text
                  style={[styles.chipText, active && styles.chipTextActive]}
                >
                  {chip.label}
                </Text>
                {chip.arrow ? (
                  <Ionicons
                    name={chip.arrow === 'up' ? 'arrow-up' : 'arrow-down'}
                    size={12}
                    color={active ? COLORS.white : COLORS.text}
                  />
                ) : null}
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
            <Text style={styles.emptyText}>No offers found</Text>
          }
        />
      </View>

      <SideBar
        asModal
        visible={isMenuVisible}
        activeCategoryId="dairy"
        activeSubCategoryId="milk"
        onBack={() => setIsMenuVisible(false)}
        onClose={() => setIsMenuVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
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
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    gap: 8,
    paddingBottom: 12,
  },
  chip: {
    minHeight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.chipBg,
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: COLORS.primary,
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
