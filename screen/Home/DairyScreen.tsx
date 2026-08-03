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
import SideBar, {
  SideBarBrand,
  SideBarCategory,
  SideBarSubCategory,
} from '../../componets/layout/SideBar';

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
  'Price -',
  'Price +',
  'Discount',
  'Popularity',
  'Newest',
] as const;

type FilterOption = (typeof FILTERS)[number];

type DairyProduct = {
  id: string;
  image: ImageSourcePropType;
  brand: string;
  name: string;
  quantity: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  tag?: string;
};

const PRODUCTS: DairyProduct[] = [
  {
    id: 'ambewela-fresh',
    image: require('../../assets/search/product-ambewela.png'),
    brand: 'Ambewela',
    name: 'Fresh Milk',
    quantity: '1L',
    price: 12,
    oldPrice: 15,
    discount: 20,
    tag: 'FULL CREAM',
  },
  {
    id: 'maliban-fresh',
    image: require('../../assets/search/product-fresh-milk.png'),
    brand: 'Maliban',
    name: 'Fresh Milk',
    quantity: '1L',
    price: 5,
  },
  {
    id: 'anchor-cream',
    image: require('../../assets/home/product-anchor.png'),
    brand: 'Kotmale',
    name: 'Chocolate Milk',
    quantity: '1L',
    price: 5,
  },
  {
    id: 'apple-milk',
    image: require('../../assets/home/product-itambe.png'),
    brand: 'Kotmale',
    name: 'Apple',
    quantity: '100ml',
    price: 1,
  },
];

type DairyScreenProps = {
  onBack?: () => void;
  onSearchPress?: () => void;
  onProductPress?: (id: string) => void;
  onAddProduct?: (id: string) => void;
  onBrandPress?: (brand: SideBarBrand) => void;
};

export default function DairyScreen({
  onBack,
  onSearchPress,
  onProductPress,
  onAddProduct,
  onBrandPress,
}: DairyScreenProps) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('Milk');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Newest');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    'dairy',
  );
  const [activeSubCategoryId, setActiveSubCategoryId] = useState<string | null>(
    'milk',
  );

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

    if (activeSubCategoryId && activeSubCategoryId !== 'milk') {
      // Keep milk-focused sample catalog for other dairy subs for now
      list = list.filter((item) =>
        item.name.toLowerCase().includes(activeSubCategoryId),
      );
    }

    switch (activeFilter) {
      case 'Price -':
        return list.sort((a, b) => a.price - b.price);
      case 'Price +':
        return list.sort((a, b) => b.price - a.price);
      case 'Discount':
        return list.filter((item) => !!item.discount);
      case 'Newest':
        return list.reverse();
      default:
        return list;
    }
  }, [query, activeFilter, activeSubCategoryId]);

  const handleSubCategoryPress = (
    category: SideBarCategory,
    subCategory: SideBarSubCategory,
  ) => {
    setActiveCategoryId(category.id);
    setActiveSubCategoryId(subCategory.id);
    setQuery(subCategory.label);
    setSidebarOpen(false);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Dairy"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <View style={styles.searchRow}>
          <Pressable
            style={styles.filterButton}
            onPress={() => setSidebarOpen(true)}
          >
            <Ionicons name="options-outline" size={18} color={COLORS.text} />
          </Pressable>
          <Pressable style={styles.searchBar} onPress={onSearchPress}>
            <Ionicons name="search" size={18} color={COLORS.primary} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Milk"
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
              tag={item.tag}
              onPress={() => onProductPress?.(item.id)}
              onAddPress={() => onAddProduct?.(item.id)}
              style={styles.productCard}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No dairy products found</Text>
          }
        />
      </View>

      <SideBar
        asModal
        visible={sidebarOpen}
        activeCategoryId={activeCategoryId}
        activeSubCategoryId={activeSubCategoryId}
        onBack={() => setSidebarOpen(false)}
        onClose={() => setSidebarOpen(false)}
        onCategoryPress={(category) => setActiveCategoryId(category.id)}
        onSubCategoryPress={handleSubCategoryPress}
        onBrandPress={(brand) => {
          setSidebarOpen(false);
          onBrandPress?.(brand);
        }}
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
    paddingTop: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.searchBg,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    paddingVertical: 0,
  },
  filterRow: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 12,
  },
  filterChip: {
    height: 32,
    borderRadius: 12,
    paddingHorizontal: 10,
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
    paddingHorizontal: 20,
    gap: 12,
  },
  gridRow: {
    justifyContent: 'space-between',
    gap: 12,
  },
  productCard: {
    width: '48%',
    maxWidth: 194,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 40,
  },
});
