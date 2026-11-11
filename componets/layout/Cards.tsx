import { Ionicons } from '@expo/vector-icons';
import  {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Text } from './AppText';
import {
  useResponsiveFontScale,
  useResponsiveScale,
} from './useResponsiveScale';

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
  compact?: boolean;
  imageAreaHeight?: number;
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
  compact = false,
  imageAreaHeight,
  onPress,
  onAddPress,
  style,
}: ProductCardProps) {
  const scale = useResponsiveScale();
  const controlScale = scale * useResponsiveFontScale();
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
      style={[
        styles.card,
        compact && styles.compactCard,
        { width: 120 * scale, gap: (compact ? 5 : 8) * scale },
        style,
      ]}
    >
      <View
        style={[
          styles.imageArea,
          compact && styles.compactImageArea,
          {
            height:
              (imageAreaHeight ?? (compact ? 76 : 100)) * scale,
            borderRadius: 18 * scale,
          },
        ]}
      >
        <Image
          source={image}
          style={[styles.image, compact && styles.compactImage]}
          resizeMode="contain"
        />

        {tag ? (
          <View style={styles.tag}>
            <Text style={[styles.tagText, compact && styles.compactTagText]}>{tag}</Text>
          </View>
        ) : null}

        {discountLabel ? (
          <View
            style={[
              styles.discountBadge,
              {
                width: 36 * controlScale,
                height: 36 * controlScale,
                borderRadius: 18 * controlScale,
                top: 8 * controlScale,
                right: 8 * controlScale,
              },
            ]}
          >
            <Text style={[styles.discountText, compact && styles.compactDiscountText]}>{discountLabel}</Text>
          </View>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Add ${name}`}
          onPress={onAddPress}
          style={[
            styles.addButton,
            compact && styles.compactAddButton,
            {
              width: (compact ? 24 : 26) * controlScale,
              height: (compact ? 24 : 26) * controlScale,
              borderRadius: (compact ? 12 : 13) * controlScale,
            },
          ]}
          hitSlop={6}
        >
          <Ionicons name="add" size={18 * controlScale} color={COLORS.white} />
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text style={[styles.brand, compact && styles.compactBrand]} numberOfLines={1}>
          {brand.toUpperCase()}
        </Text>
        <Text style={[styles.name, compact && styles.compactName]} numberOfLines={2}>
          {name}
        </Text>
        {quantity ? (
          <Text style={[styles.quantity, compact && styles.compactQuantity]} numberOfLines={1}>
            {quantity}
          </Text>
        ) : null}

        <View style={styles.priceRow}>
          <Text style={[styles.price, compact && styles.compactPrice]}>{formatPrice(price)}</Text>
          {oldPrice !== undefined && oldPrice !== null ? (
            <Text style={[styles.oldPrice, compact && styles.compactOldPrice]}>{formatPrice(oldPrice)}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    maxWidth: '100%',
    gap: 8,
  },
  imageArea: {
    width: '100%',
    height: 100,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '78%',
    height: '78%',
  },
  compactCard: {
    gap: 5,
  },
  compactImageArea: {
    height: 76,
  },
  compactImage: {
    width: '76%',
    height: '76%',
  },
  compactAddButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  compactTagText: {
    fontSize: 7,
  },
  compactDiscountText: {
    fontSize: 9,
  },
  compactBrand: {
    fontSize: 9,
  },
  compactName: {
    fontSize: 12,
  },
  compactQuantity: {
    fontSize: 10,
  },
  compactPrice: {
    fontSize: 12,
  },
  compactOldPrice: {
    fontSize: 10,
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
    top: 8,
    right: 8,
    width: 36,
    height: 36,
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
    right: 10,
    bottom: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#D7FFF0',
  },
  info: {
    gap: 2,
    paddingHorizontal: 2,
  },
  brand: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.brand,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 18,
  },
  quantity: {
    fontSize: 11,
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
