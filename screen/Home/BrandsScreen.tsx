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
  cardBg: '#F3F4F6',
};

export type BrandGridItem = {
  id: string;
  name: string;
  image: ImageSourcePropType;
};

const BRANDS: BrandGridItem[] = [
  {
    id: 'maliban',
    name: 'Maliban',
    image: require('../../assets/home/brand-maliban.png'),
  },
  {
    id: 'magic',
    name: 'Magic',
    image: require('../../assets/home/brand-magic.png'),
  },
  {
    id: 'kotmale',
    name: 'Kotmale',
    image: require('../../assets/home/brand-kotmale.png'),
  },
];

type BrandsScreenProps = {
  brands?: BrandGridItem[];
  onBack?: () => void;
  onBrandPress?: (brand: BrandGridItem) => void;
};

export default function BrandsScreen({
  brands = BRANDS,
  onBack,
  onBrandPress,
}: BrandsScreenProps) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brands;
    return brands.filter((item) => item.name.toLowerCase().includes(q));
  }, [brands, query]);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Brands"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <View style={styles.searchWrap}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={COLORS.primary} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search brands"
              placeholderTextColor={COLORS.muted}
              style={styles.searchInput}
            />
          </View>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.gridRow}
          contentContainerStyle={[
            styles.gridContent,
            { paddingBottom: Math.max(insets.bottom, 20) },
          ]}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => onBrandPress?.(item)}
            >
              <View style={styles.logoWrap}>
                <Image
                  source={item.image}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No brands found</Text>
          }
        />
      </View>
    </View>
  );
}

export { BRANDS };

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
  searchWrap: {
    paddingHorizontal: '4.5%',
    paddingTop: '4%',
    paddingBottom: '3%',
  },
  searchBar: {
    width: '100%',
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: COLORS.searchBg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: '3.5%',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    paddingVertical: 0,
  },
  gridContent: {
    paddingHorizontal: '4.5%',
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '30%',
    alignItems: 'center',
    gap: 8,
  },
  logoWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: COLORS.cardBg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '10%',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 12,
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
