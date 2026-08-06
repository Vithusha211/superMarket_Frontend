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
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(0, 0, 0, 1)',
  brand: 'rgba(156, 163, 175, 1)',
  muted: 'rgba(156, 163, 175, 1)',
  oldPrice: 'rgba(156, 163, 175, 1)',
  badge: 'rgba(239, 68, 68, 1)',
  imageBg: 'rgba(243, 244, 246, 1)',
  border: 'rgba(243, 244, 246, 1)',
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
    height: 100,
    borderRadius: 12,
    backgroundColor: COLORS.imageBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
  tag: {
    position: 'absolute',
    right: 8,
    top: '34%',
    backgroundColor: COLORS.badge,
    borderRadius: 4,
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
    top: 6,
    right: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
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
    right: 6,
    bottom: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
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
