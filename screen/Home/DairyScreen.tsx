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
  muted: '#72828A',
  searchBg: '#FFFFFF',
  chipBg: '#F3F4F6',
};

const SUB_CHIPS = [
  'All',
  'Milk',
  'Butter',
  'Cheese',
  'Yoghurt',
  'Ice Cream',
] as const;

type SubChip = (typeof SUB_CHIPS)[number];

export type DairyProduct = {
  id: string;
  image: ImageSourcePropType;
  brand: string;
  name: string;
  quantity: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  tag?: string;
  subCategory: SubChip;
  description: string;
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
    subCategory: 'Milk',
    description:
      'Fresh full cream milk sourced daily. Rich in calcium and vitamins.',
  },
  {
    id: 'maliban-fresh',
    image: require('../../assets/brands/fresh-milk.png'),
    brand: 'Maliban',
    name: 'Fresh Milk',
    quantity: '1L',
    price: 5,
    subCategory: 'Milk',
    description: 'Fresh full cream milk. Pure, nutritious and ready to drink.',
  },
  {
    id: 'chocolate-milk',
    image: require('../../assets/product/chocolate-milk.png'),
    brand: 'Kotmale',
    name: 'Chocolate Milk',
    quantity: '1L',
    price: 5,
    subCategory: 'Milk',
    description: 'Smooth chocolate flavoured milk packed with calcium.',
  },
  {
    id: 'faluda-milk',
    image: require('../../assets/product/faluda-milk.png'),
    brand: 'RichLife',
    name: 'Faluda Milk',
    quantity: '180ml',
    price: 2,
    subCategory: 'Milk',
    description: 'RichLife faluda flavoured milk in a handy pack.',
  },
  {
    id: 'kotmale-butter',
    image: require('../../assets/dairy/kotmale-butter.png'),
    brand: 'Kotmale',
    name: 'Butter',
    quantity: '200g',
    price: 8,
    subCategory: 'Butter',
    description: 'Creamy Kotmale butter. Perfect for cooking and spreading.',
  },
  {
    id: 'vanilla-ice-cream',
    image: require('../../assets/dairy/vanilla-ice-cream.png'),
    brand: 'Dairy',
    name: 'Vanilla Ice Cream',
    quantity: '2L',
    price: 18,
    discount: 10,
    subCategory: 'Ice Cream',
    description: 'Smooth dairy vanilla ice cream. Family pack 2 litre tub.',
  },
  {
    id: 'value-yoghurt',
    image: require('../../assets/product/value-pack.png'),
    brand: 'Highland',
    name: 'Yoghurt Pack',
    quantity: '8 pcs',
    price: 12,
    subCategory: 'Yoghurt',
    description: 'Buy 7 get 1 free yoghurt value pack for the whole family.',
  },
  {
    id: 'kiri-powder',
    image: require('../../assets/brands/kiri-milk-powder.png'),
    brand: 'Maliban',
    name: 'Kiri Milk Powder',
    quantity: '400g',
    price: 18,
    subCategory: 'Milk',
    description: 'Full cream milk powder for rich, creamy milk anytime.',
  },
];

type DairyScreenProps = {
  onBack?: () => void;
  onSearchPress?: () => void;
  onMenuPress?: () => void;
  onProductPress?: (product: DairyProduct) => void;
  onAddProduct?: (product: DairyProduct) => void;
};

export default function DairyScreen({
  onBack,
  onSearchPress,
  onMenuPress,
  onProductPress,
  onAddProduct,
}: DairyScreenProps) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [activeChip, setActiveChip] = useState<SubChip>('All');
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const products = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeChip !== 'All') {
      list = list.filter((item) => item.subCategory === activeChip);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.subCategory.toLowerCase().includes(q),
      );
    }
    return list;
  }, [query, activeChip]);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Dairy"
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
            onPress={() => setIsMenuVisible(true)}
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
          contentContainerStyle={styles.chipRow}
        >
          {SUB_CHIPS.map((chip) => {
            const active = activeChip === chip;
            return (
              <Pressable
                key={chip}
                onPress={() => setActiveChip(chip)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {chip}
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
              onPress={() => onProductPress?.(item)}
              onAddPress={() => onAddProduct?.(item)}
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
  chipRow: {
    paddingHorizontal: '4.5%',
    gap: 8,
    paddingBottom: 12,
  },
  chip: {
   
    height: 22,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#72828A',
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
