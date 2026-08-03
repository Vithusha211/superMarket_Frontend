import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  brand: '#9CA3AF',
  muted: '#9CA3AF',
  oldPrice: '#9CA3AF',
  badge: '#FF000A',
  imageBg: '#F8F8F8',
  border: '#F3F4F6',
};

export type ProductCardProps = {
  image: ImageSourcePropType;
  brand: string;
  name: string;
  quantity?: string;
  price: number | string;
  oldPrice?: number | string;
  discount?: string | number;
  tag?: string;
  onPress?: () => void;
  onAddPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

function formatPrice(value: number | string) {
  if (typeof value === 'number') {
    return `$${value.toFixed(2)}`;
  }
  return value.startsWith('$') ? value : `$${value}`;
}

export default function ProductCard({
  image,
  brand,
  name,
  quantity,
  price,
  oldPrice,
  discount,
  tag,
  onPress,
  onAddPress,
  style,
}: ProductCardProps) {
  const discountLabel =
    discount === undefined || discount === null
      ? null
      : typeof discount === 'number'
        ? `${discount}%`
        : discount;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.card, style]}
    >
      <View style={styles.imageArea}>
        <Image source={image} style={styles.image} resizeMode="contain" />

        {tag ? (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ) : null}

        {discountLabel ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountLabel}</Text>
          </View>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Add ${name}`}
          onPress={onAddPress}
          style={styles.addButton}
          hitSlop={6}
        >
          <Ionicons name="add" size={20} color={COLORS.white} />
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text style={styles.brand} numberOfLines={1}>
          {brand.toUpperCase()}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        {quantity ? (
          <Text style={styles.quantity} numberOfLines={1}>
            {quantity}
          </Text>
        ) : null}

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          {oldPrice !== undefined && oldPrice !== null ? (
            <Text style={styles.oldPrice}>{formatPrice(oldPrice)}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    maxWidth: '100%',
    gap: 8,
  },
  imageArea: {
    width: '100%',
    aspectRatio: 194 / 140,
    borderRadius: 12,
    backgroundColor: COLORS.imageBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '75%',
    height: '75%',
  },
  tag: {
    position: 'absolute',
    right: '4%',
    top: '34%',
    backgroundColor: COLORS.badge,
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: '700',
    textAlign: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: '5%',
    right: '5%',
    width: '18%',
    aspectRatio: 1,
    maxWidth: 36,
    borderRadius: 18,
    backgroundColor: COLORS.badge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '700',
  },
  addButton: {
    position: 'absolute',
    right: '5%',
    bottom: '5%',
    width: '16%',
    aspectRatio: 1,
    maxWidth: 32,
    minWidth: 28,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  info: {
    gap: 2,
  },
  brand: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.brand,
    letterSpacing: 0.4,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  quantity: {
    fontSize: 12,
    color: COLORS.muted,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  oldPrice: {
    fontSize: 12,
    color: COLORS.oldPrice,
    textDecorationLine: 'line-through',
  },
});
