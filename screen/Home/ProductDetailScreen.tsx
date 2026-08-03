import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../componets/layout/Button';
import FloatingCartButton from '../../componets/layout/FloatingCartButton';
import Header from '../../componets/layout/Header';
import ProductCard from '../../componets/layout/Cards';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  border: '#E5E7EB',
  imageBg: '#F3F4F6',
};

export type ProductDetail = {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: ImageSourcePropType;
};

const DEFAULT_PRODUCT: ProductDetail = {
  id: 'fresh-milk',
  title: 'Fresh Milk',
  category: 'Dairy',
  price: 5,
  description:
    'Fresh full cream milk sourced daily. Rich in calcium and vitamins for your everyday nutrition.',
  image: require('../../assets/search/product-ambewela.png'),
};

const RELATED: {
  id: string;
  image: ImageSourcePropType;
  brand: string;
  name: string;
  quantity: string;
  price: number;
}[] = [
  {
    id: 'chocolate-milk',
    image: require('../../assets/product/chocolate-milk.png'),
    brand: 'Kotmale',
    name: 'Chocolate Milk',
    quantity: '1L',
    price: 5,
  },
  {
    id: 'faluda-milk',
    image: require('../../assets/product/faluda-milk.png'),
    brand: 'RichLife',
    name: 'Faluda Milk',
    quantity: '180ml',
    price: 2,
  },
  {
    id: 'sweet-melon',
    image: require('../../assets/product/sweet-melon.png'),
    brand: 'Fresh Farm',
    name: 'Sweet Melon',
    quantity: '2kg',
    price: 5,
  },
  {
    id: 'value-pack',
    image: require('../../assets/product/value-pack.png'),
    brand: 'Highland',
    name: 'Value Pack',
    quantity: '8 pcs',
    price: 12,
  },
];

type ProductScreenProps = {
  product?: ProductDetail;
  cartCount?: number;
  onBack?: () => void;
  onSearchPress?: () => void;
  onAddToCart?: (product: ProductDetail, quantity: number) => void;
  onOpenCart?: () => void;
  onRelatedPress?: (id: string) => void;
};

export default function ProductScreen({
  product = DEFAULT_PRODUCT,
  cartCount = 0,
  onBack,
  onSearchPress,
  onAddToCart,
  onOpenCart,
  onRelatedPress,
}: ProductScreenProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [quantity, setQuantity] = useState(1);
  const [bottomBarHeight, setBottomBarHeight] = useState(isTablet ? 130 : 118);

  const total = useMemo(
    () => Number((product.price * quantity).toFixed(2)),
    [product.price, quantity],
  );

  const relatedCardWidth = isTablet ? '31%' : '47%';
  // FAB sits clearly above the sticky Add to Cart bar
  const fabBottom = bottomBarHeight + 16;

  const handleAddToCart = () => {
    onAddToCart?.(product, quantity);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title={product.category}
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
        right={
          <Pressable onPress={onSearchPress} hitSlop={8} style={styles.headerIcon}>
            <Ionicons name="search" size={20} color={COLORS.white} />
          </Pressable>
        }
      />

      <View style={styles.sheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: 24,
            },
          ]}
        >
          <View style={[styles.heroCard, { minHeight: isTablet ? 240 : 200 }]}>
            <Image
              source={product.image}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>$ {product.price.toFixed(2)} / each</Text>
          </View>

          <View style={styles.aboutBlock}>
            <Text style={styles.aboutTitle}>About this product</Text>
            <Text style={styles.aboutText}>{product.description}</Text>
          </View>

          <Text style={styles.sectionTitle}>Related Products</Text>
          <View style={styles.relatedGrid}>
            {RELATED.map((item) => (
              <ProductCard
                key={item.id}
                image={item.image}
                brand={item.brand}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                onPress={() => onRelatedPress?.(item.id)}
                onAddPress={() =>
                  onAddToCart?.(
                    {
                      id: item.id,
                      title: item.name,
                      category: product.category,
                      price: item.price,
                      description: '',
                      image: item.image,
                    },
                    1,
                  )
                }
                style={[styles.relatedCard, { width: relatedCardWidth }]}
              />
            ))}
          </View>
        </ScrollView>

        <View
          style={[
            styles.bottomBar,
            { paddingBottom: Math.max(insets.bottom, 12) },
          ]}
          onLayout={(e) => setBottomBarHeight(e.nativeEvent.layout.height)}
        >
          <View style={styles.qtyRow}>
            <View style={styles.qtyControls}>
              <Pressable
                style={styles.qtyBtn}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Ionicons name="remove" size={18} color={COLORS.text} />
              </Pressable>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <Pressable
                style={styles.qtyBtn}
                onPress={() => setQuantity((q) => q + 1)}
              >
                <Ionicons name="add" size={18} color={COLORS.text} />
              </Pressable>
            </View>
            <Text style={styles.totalText}>$ {total.toFixed(2)}</Text>
          </View>

          <Button
            title="Add to Cart"
            onPress={handleAddToCart}
            containerStyle={styles.addButton}
            textStyle={styles.addButtonText}
          />
        </View>
      </View>

      {/* True floating cart — fixed over screen, above Add to Cart bar */}
      <FloatingCartButton
        count={cartCount}
        onPress={onOpenCart}
        bottomOffset={fabBottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
    position: 'relative',
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
    overflow: 'hidden',
  },
  scrollContent: {
    width: '100%',
    paddingHorizontal: '4.5%',
    paddingTop: '4%',
    gap: 16,
  },
  heroCard: {
    width: '100%',
    aspectRatio: 400 / 200,
    borderRadius: 12,
    backgroundColor: COLORS.imageBg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroImage: {
    width: '70%',
    height: '85%',
  },
  infoBlock: {
    width: '100%',
    gap: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  aboutBlock: {
    width: '100%',
    gap: 8,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.muted,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  relatedGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  relatedCard: {
    marginBottom: 4,
  },
  bottomBar: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingHorizontal: '4.5%',
    paddingTop: 12,
    gap: 10,
  },
  qtyRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.imageBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyValue: {
    minWidth: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  addButton: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
