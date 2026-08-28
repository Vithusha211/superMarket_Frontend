import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductCard from '../../componets/layout/Cards';
import Footer, { FooterTab } from '../../componets/layout/Footer';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  searchBg: '#FFFFFF',
  sheet: '#FFFFFF',
  chipBg: 'rgba(255, 255, 255, 0.25)',
  sectionTitle: '#111827',
  brandCircle: '#F3F4F6',
};

type CategoryItem = {
  id: string;
  label: string;
  image: ImageSourcePropType;
};

type BrandItem = {
  id: string;
  name: string;
  image: ImageSourcePropType;
};

type OfferItem = {
  id: string;
  image: ImageSourcePropType;
  brand: string;
  name: string;
  quantity: string;
  price: number;
  oldPrice?: number;
  discount?: number;
};

const CATEGORIES: CategoryItem[] = [
  {
    id: 'fruits',
    label: 'Fruits &\nVegetables',
    image: require('../../assets/home/category-fruits.png'),
  },
  {
    id: 'dairy',
    label: 'Dairy',
    image: require('../../assets/home/category-dairy.png'),
  },
  {
    id: 'grocery',
    label: 'Grocery &\nStaples',
    image: require('../../assets/home/category-grocery.png'),
  },
];

const BRANDS: BrandItem[] = [
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

const OFFERS: OfferItem[] = [
  {
    id: '1',
    image: require('../../assets/home/product-sugar.png'),
    brand: 'Japanese Style',
    name: 'Brown Sugar',
    quantity: '500g',
    price: 3.49,
    oldPrice: 4.29,
    discount: 18,
  },
  {
    id: '2',
    image: require('../../assets/home/product-itambe.png'),
    brand: 'Itambé',
    name: 'Natural Milk',
    quantity: '1L',
    price: 2.49,
    oldPrice: 2.99,
    discount: 15,
  },
  {
    id: '3',
    image: require('../../assets/home/product-anchor.png'),
    brand: 'Anchor',
    name: 'Full Cream Milk',
    quantity: '1L',
    price: 2.79,
    oldPrice: 3.49,
    discount: 20,
  },
];

type HomeScreenProps = {
  addressLabel?: string;
  countryFlag?: string;
  notificationCount?: number;
  onSearchPress?: () => void;
  onLocationPress?: () => void;
  onNotificationPress?: () => void;
  onCategoryPress?: (id: string) => void;
  onCategoriesSeeAll?: () => void;
  onBrandPress?: (id: string) => void;
  onBrandsSeeAll?: () => void;
  onOffersSeeAll?: () => void;
  onProductPress?: (id: string) => void;
  onAddProduct?: (id: string) => void;
  onTabPress?: (tab: FooterTab) => void;
};

export default function HomeScreen({
  addressLabel = '123 Main St, New York',
  countryFlag = '🇩🇪',
  onSearchPress,
  onLocationPress,
  onNotificationPress,
  onCategoryPress,
  onCategoriesSeeAll,
  onBrandPress,
  onBrandsSeeAll,
  onOffersSeeAll,
  onProductPress,
  onAddProduct,
  onTabPress,
}: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<FooterTab>('home');

  const handleTabPress = (tab: FooterTab) => {
    setActiveTab(tab);
    onTabPress?.(tab);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerTop}>
          <Pressable
            style={styles.locationButton}
            onPress={onLocationPress}
            hitSlop={6}
          >
            <View style={styles.headerChip}>
              <Ionicons name="location-outline" size={18} color={COLORS.white} />
            </View>
            <View style={styles.locationCopy}>
              <Text style={styles.deliverLabel}>Deliver to</Text>
              <Text style={styles.addressText} numberOfLines={1}>
                {addressLabel.replace(/^Deliver to\s*/i, '')}
              </Text>
            </View>
          </Pressable>

          <View style={styles.headerActions}>
            <View style={styles.flagChip}>
              <Text style={styles.flagText}>{countryFlag}</Text>
            </View>
            <Pressable
              style={styles.headerChip}
              onPress={onNotificationPress}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel="Notifications"
            >
              <Ionicons
                name="notifications-outline"
                size={18}
                color={COLORS.white}
              />
            </Pressable>
          </View>
        </View>

        <Pressable
          style={styles.searchBar}
          onPress={onSearchPress}
          accessibilityRole="button"
          accessibilityLabel="Search"
        >
          <Ionicons name="search" size={18} color={COLORS.muted} />
          <Text style={styles.searchPlaceholder}>Search</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.sheet}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 12) + 88 },
        ]}
      >
        <View style={styles.bannerWrap}>
          <Image
            source={require('../../assets/home/banner.png')}
            style={styles.banner}
            resizeMode="cover"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Categories</Text>
            <Pressable onPress={onCategoriesSeeAll} hitSlop={8}>
              <Image
                source={require('../../assets/home/see-all.png')}
                style={styles.seeAllIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
          >
            {CATEGORIES.map((item) => (
              <Pressable
                key={item.id}
                style={styles.categoryItem}
                onPress={() => onCategoryPress?.(item.id)}
              >
                <View style={styles.categoryBox}>
                  <Image
                    source={item.image}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.categoryLabel} numberOfLines={2}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Brands</Text>
            <Pressable onPress={onBrandsSeeAll} hitSlop={8}>
              <Image
                source={require('../../assets/home/see-all.png')}
                style={styles.seeAllIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
          >
            {BRANDS.map((item) => (
              <Pressable
                key={item.id}
                style={styles.brandItem}
                onPress={() => onBrandPress?.(item.id)}
              >
                <View style={styles.brandBox}>
                  <Image
                    source={item.image}
                    style={styles.brandImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.brandName} numberOfLines={1}>
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best Offers</Text>
            <Pressable onPress={onOffersSeeAll} hitSlop={8}>
              <Image
                source={require('../../assets/home/see-all.png')}
                style={styles.seeAllIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hList}
          >
            {OFFERS.map((item) => (
              <ProductCard
                key={item.id}
                image={item.image}
                brand={item.brand}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                oldPrice={item.oldPrice}
                discount={item.discount}
                onPress={() => onProductPress?.(item.id)}
                onAddPress={() => onAddProduct?.(item.id)}
                style={styles.offerCard}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footerWrap,
          { paddingBottom: Math.max(insets.bottom, 0) },
        ]}
      >
        <Footer activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: '4.5%',
    paddingBottom: '3%',
    gap: 14,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  locationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerChip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationCopy: {
    flex: 1,
    gap: 2,
  },
  deliverLabel: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.9,
  },
  addressText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
  },
  flagChip: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagText: {
    fontSize: 16,
  },
  searchBar: {
    width: '100%',
    height: 51,
    borderRadius: 8,
    backgroundColor: COLORS.searchBg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: COLORS.muted,
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.sheet,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  scrollContent: {
    paddingTop: '4.5%',
    paddingHorizontal: 20,
    gap: 24,
    paddingBottom: '4%',
  },
  bannerWrap: {
    width: '100%',
  },
  banner: {
    width: '100%',
    aspectRatio: 400 / 189,
    borderRadius: 16,
  },
  section: {
    gap: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.sectionTitle,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  seeAllIcon: {
    width: 24,
    height: 24,
  },
  hList: {
    paddingHorizontal: 0,
    gap: 8,
  },
  categoryItem: {
    width: 126,
    alignItems: 'center',
    gap: 4,
  },
  categoryBox: {
    width: 126,
    height: 100,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 16,
    width: '100%',
  },
  brandItem: {
    width: 126,
    alignItems: 'center',
    gap: 4,
  },
  brandBox: {
    width: 126,
    height: 100,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 12,
  },
  brandImage: {
    width: '100%',
    height: '100%',
  },
  brandName: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
  },
  offerCard: {
    width: 126,
  },
  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.white,
  },
});
