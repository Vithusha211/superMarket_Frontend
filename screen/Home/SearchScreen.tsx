import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductCard from '../../componets/layout/Cards';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  searchBg: '#F2F2F3',
  chipBg: '#F3F4F6',
  chipBorder: '#E5E7EB',
  emptyIcon: '#D1D5DB',
};

const RECENT_SEARCHES = ['India', 'Apple', 'dell', 'monitors'];

const SUGGESTIONS = [
  'Milk',
  'Milk tea Cream',
  'Milkshake',
  'Magic bread',
  'Fresh Milk',
  'Chocolate Milk',
  'Almond Milk',
];

const FILTERS = [
  'All',
  'Price -',
  'Price +',
  'Discount',
  'Popularity',
  'Newest',
] as const;

type FilterOption = (typeof FILTERS)[number];

type SearchProduct = {
  id: string;
  image: ImageSourcePropType;
  brand: string;
  name: string;
  quantity: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  tag?: string;
  keywords: string[];
};

const PRODUCTS: SearchProduct[] = [
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
    keywords: ['milk', 'fresh', 'ambewela', 'dairy', 'cream'],
  },
  {
    id: 'fresh-milk',
    image: require('../../assets/search/product-fresh-milk.png'),
    brand: 'Maliban',
    name: 'Fresh Milk',
    quantity: '1L',
    price: 5,
    keywords: ['milk', 'fresh', 'maliban', 'dairy'],
  },
  {
    id: 'anchor-milk',
    image: require('../../assets/home/product-anchor.png'),
    brand: 'Anchor',
    name: 'Full Cream Milk',
    quantity: '1L',
    price: 5,
    keywords: ['milk', 'anchor', 'dairy', 'cream', 'chocolate'],
  },
  {
    id: 'itambe-milk',
    image: require('../../assets/home/product-itambe.png'),
    brand: 'Itambé',
    name: 'Natural Milk',
    quantity: '1L',
    price: 1,
    keywords: ['milk', 'itambe', 'dairy', 'apple'],
  },
];

type SearchScreenProps = {
  initialQuery?: string;
  onBack?: () => void;
  onProductPress?: (id: string) => void;
  onAddProduct?: (id: string) => void;
};

type TextInputHandle = {
  focus: () => void;
  blur: () => void;
};

export default function SearchScreen({
  initialQuery = '',
  onBack,
  onProductPress,
  onAddProduct,
}: SearchScreenProps) {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInputHandle | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(!!initialQuery.trim());
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [recent, setRecent] = useState(RECENT_SEARCHES);

  const trimmed = query.trim();
  const isTyping = trimmed.length > 0 && !submitted;

  const suggestions = useMemo(() => {
    if (!trimmed) return [];
    const q = trimmed.toLowerCase();
    return SUGGESTIONS.filter((item) => item.toLowerCase().includes(q));
  }, [trimmed]);

  const results = useMemo(() => {
    if (!trimmed) return [];
    const q = trimmed.toLowerCase();
    let list = PRODUCTS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.keywords.some((key) => key.includes(q) || q.includes(key)),
    );

    switch (activeFilter) {
      case 'Price -':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'Price +':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'Discount':
        list = [...list].filter((item) => !!item.discount);
        break;
      case 'Newest':
        list = [...list].reverse();
        break;
      default:
        break;
    }

    return list;
  }, [trimmed, activeFilter]);

  const rememberSearch = (value: string) => {
    const next = value.trim();
    if (!next) return;
    setRecent((prev) => [next, ...prev.filter((item) => item !== next)].slice(0, 8));
  };

  const runSearch = (value: string) => {
    const next = value.trim();
    setQuery(next);
    setSubmitted(true);
    rememberSearch(next);
    inputRef.current?.blur();
  };

  const clearQuery = () => {
    setQuery('');
    setSubmitted(false);
    setActiveFilter('All');
    inputRef.current?.focus();
  };

  const showRecent = !trimmed && !submitted;
  const showSuggestions = isTyping;
  const showEmpty = submitted && trimmed.length > 0 && results.length === 0;
  const showResults = submitted && results.length > 0;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.headerRow}>
          <Pressable style={styles.backChip} onPress={onBack} hitSlop={8}>
            <Image
              source={require('../../assets/back-icon.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.headerTitle}>Dairy</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.sheet}>
          <View style={styles.searchRow}>
            <Pressable
              style={styles.filterButton}
              onPress={() => setActiveFilter('All')}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Filter search results"
            >
              <Ionicons name="options-outline" size={18} color={COLORS.primary} />
            </Pressable>

            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color={COLORS.muted} />
              <TextInput
                ref={(ref) => {
                  inputRef.current = ref;
                }}
                value={query}
                onChangeText={(value) => {
                  setQuery(value);
                  setSubmitted(false);
                }}
                placeholder="Search"
                placeholderTextColor={COLORS.muted}
                style={styles.searchInput}
                returnKeyType="search"
                autoFocus={!initialQuery}
                onSubmitEditing={() => runSearch(query)}
              />
              {query ? (
                <Pressable onPress={clearQuery} hitSlop={8}>
                  <Ionicons name="close-circle" size={18} color={COLORS.muted} />
                </Pressable>
              ) : null}
            </View>
          </View>

          {showRecent ? (
            <View style={styles.content}>
              <Text style={styles.sectionLabel}>Recently search</Text>
              <View style={styles.chipWrap}>
                {recent.map((item) => (
                  <Pressable
                    key={item}
                    style={styles.recentChip}
                    onPress={() => runSearch(item)}
                  >
                    <Text style={styles.recentChipText}>{item}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ) : null}

          {showSuggestions ? (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.suggestions}
            >
              {suggestions.map((item) => (
                <Pressable
                  key={item}
                  style={styles.suggestionRow}
                  onPress={() => runSearch(item)}
                >
                  <Ionicons name="search" size={16} color={COLORS.muted} />
                  <Text style={styles.suggestionText}>{item}</Text>
                </Pressable>
              ))}
              {suggestions.length === 0 ? (
                <Text style={styles.helperText}>No suggestions</Text>
              ) : null}
            </ScrollView>
          ) : null}

          {showEmpty ? (
            <View style={styles.emptyState}>
              <Ionicons name="cube-outline" size={96} color={COLORS.emptyIcon} />
              <Text style={styles.emptyTitle}>
                We couldn't find what you're looking for.
              </Text>
            </View>
          ) : null}

          {showResults ? (
            <View style={styles.results}>
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
                data={results}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.gridRow}
                contentContainerStyle={[
                  styles.gridContent,
                  { paddingBottom: Math.max(insets.bottom, 20) },
                ]}
                keyboardShouldPersistTaps="handled"
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
                    compact
                    onPress={() => onProductPress?.(item.id)}
                    onAddPress={() => onAddProduct?.(item.id)}
                    style={styles.productCard}
                  />
                )}
              />
            </View>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: '4.5%',
    paddingBottom: 18,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: '4.5%',
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  backChip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  searchBar: {
    flex: 1,
    minHeight: 51,
    width: '100%',
    borderRadius: 8,
    backgroundColor: COLORS.searchBg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: '3.5%',
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: COLORS.searchBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    paddingVertical: 0,
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  content: {
    paddingHorizontal: '4.5%',
    paddingTop: 8,
    gap: 14,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recentChip: {
    height: 28,
    borderRadius: 14,
    paddingHorizontal: 12,
    backgroundColor: COLORS.chipBg,
    borderWidth: 1,
    borderColor: COLORS.chipBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentChipText: {
    fontSize: 13,
    color: COLORS.text,
  },
  suggestions: {
    paddingHorizontal: '4.5%',
    paddingTop: 16,
    gap: 4,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  suggestionText: {
    fontSize: 15,
    color: COLORS.text,
  },
  helperText: {
    marginTop: 20,
    textAlign: 'center',
    color: COLORS.muted,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '9%',
    gap: 16,
  },
  emptyTitle: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 24,
  },
  results: {
    flex: 1,
    paddingTop: 16,
  },
  filterRow: {
    paddingHorizontal: '4.5%',
    gap: 6,
    paddingBottom: 10,
  },
  filterChip: {
    height: 24,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLORS.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.text,
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  gridContent: {
    paddingHorizontal: '4.5%',
    gap: 12,
  },
  gridRow: {
    justifyContent: 'space-between',
    gap: 12,
  },
  productCard: {
    width: '48%',
    maxWidth: '48%',
  },
});
