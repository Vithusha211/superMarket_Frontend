import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  searchBg: '#F8F8F8',
};

export type CategoryGridItem = {
  id: string;
  label: string;
  image: ImageSourcePropType;
};

const CATEGORIES: CategoryGridItem[] = [
  {
    id: 'fruits',
    label: 'Fruits & Vegetables',
    image: require('../../assets/home/category-fruits.png'),
  },
  {
    id: 'dairy',
    label: 'Dairy',
    image: require('../../assets/home/category-dairy.png'),
  },
  {
    id: 'grocery',
    label: 'Grocery & Staples',
    image: require('../../assets/home/category-grocery.png'),
  },
  {
    id: 'frozen',
    label: 'Frozen Food',
    image: require('../../assets/home/category-frozen.png'),
  },
  {
    id: 'personal-care',
    label: 'Personal Care',
    image: require('../../assets/home/category-personal-care.png'),
  },
];

type CategoryScreenProps = {
  categories?: CategoryGridItem[];
  onBack?: () => void;
  onFilterPress?: () => void;
  onCategoryPress?: (id: string) => void;
};

export default function CategoryScreen({
  categories = CATEGORIES,
  onBack,
  onFilterPress,
  onCategoryPress,
}: CategoryScreenProps) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((item) => item.label.toLowerCase().includes(q));
  }, [categories, query]);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Category"
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
            style={styles.filterButton}
            onPress={onFilterPress}
          >
            <Ionicons name="options-outline" size={18} color={COLORS.primary} />
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
            <Pressable
              style={styles.card}
              onPress={() => onCategoryPress?.(item.id)}
            >
              <View style={styles.imageWrap}>
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.label} numberOfLines={2}>
                {item.label}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No categories found</Text>
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
    paddingTop: '4%',
    paddingBottom: '3%',
  },
  filterButton: {
    width: '11.5%',
    aspectRatio: 1,
    maxWidth: 51,
    minWidth: 44,
    borderRadius: 8,
    backgroundColor: COLORS.searchBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flex: 1,
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: COLORS.searchBg,
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
  gridContent: {
    paddingHorizontal: '4.5%',
    gap: 12,
  },
  gridRow: {
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  card: {
    width: '47%',
    gap: 8,
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 164 / 120,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: '9%',
  },
});
