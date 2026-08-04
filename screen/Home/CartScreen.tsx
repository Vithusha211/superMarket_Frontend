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
import Footer, { FooterTab } from '../../componets/layout/Footer';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  border: '#E5E7EB',
  cardBorder: '#07C187',
  danger: '#EF4444',
  link: '#2563EB',
  imageBg: '#F3F4F6',
};

export type CartItem = {
  id: string;
  name: string;
  quantityLabel: string;
  price: number;
  qty: number;
  image: ImageSourcePropType;
};

const DEFAULT_ITEMS: CartItem[] = [
  {
    id: 'sweet-melon',
    name: 'Sweet Melon',
    quantityLabel: '2kg',
    price: 5,
    qty: 1,
    image: require('../../assets/product/sweet-melon.png'),
  },
  {
    id: 'value-pack',
    name: 'Yoghurt Pack',
    quantityLabel: '8 pcs',
    price: 5,
    qty: 2,
    image: require('../../assets/product/value-pack.png'),
  },
  {
    id: 'faluda-milk',
    name: 'Faluda Milk',
    quantityLabel: '180ml',
    price: 5,
    qty: 1,
    image: require('../../assets/product/faluda-milk.png'),
  },
  {
    id: 'chocolate-milk',
    name: 'Chocolate Milk',
    quantityLabel: '1L',
    price: 5,
    qty: 1,
    image: require('../../assets/product/chocolate-milk.png'),
  },
];

type CartScreenProps = {
  items?: CartItem[];
  address?: string;
  onBack?: () => void;
  onChangeAddress?: () => void;
  onProceed?: () => void;
  onTabPress?: (tab: FooterTab) => void;
  onItemsChange?: (items: CartItem[]) => void;
};

export default function CartScreen({
  items: controlledItems,
  address = '102 St Marks Pl, New York',
  onBack,
  onChangeAddress,
  onProceed,
  onTabPress,
  onItemsChange,
}: CartScreenProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [items, setItems] = useState<CartItem[]>(
    controlledItems ?? DEFAULT_ITEMS,
  );

  const updateItems = (next: CartItem[]) => {
    setItems(next);
    onItemsChange?.(next);
  };

  const subtotal = useMemo(
    () =>
      Number(
        items
          .reduce((sum, item) => sum + item.price * item.qty, 0)
          .toFixed(2),
      ),
    [items],
  );

  const changeQty = (id: string, delta: number) => {
    updateItems(
      items.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    updateItems(items.filter((item) => item.id !== id));
  };

  const thumbSize = isTablet ? '14%' : '18%';

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="My Cart"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: Math.max(insets.bottom, 12) + (isTablet ? 180 : 160),
            },
          ]}
        >
          <View style={styles.addressCard}>
            <View style={styles.addressLeft}>
              <Ionicons name="location" size={18} color={COLORS.primary} />
              <Text style={styles.addressText} numberOfLines={1}>
                {address}
              </Text>
            </View>
            <Pressable onPress={onChangeAddress} hitSlop={8}>
              <Text style={styles.changeText}>Change</Text>
            </Pressable>
          </View>

          <View style={styles.list}>
            {items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={[styles.thumb, { width: thumbSize }]}>
                  <Image
                    source={item.image}
                    style={styles.thumbImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemMeta}>{item.quantityLabel}</Text>
                  <Text style={styles.itemPrice}>
                    $ {item.price.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.itemActions}>
                  <Pressable onPress={() => removeItem(item.id)} hitSlop={8}>
                    <Image
                      source={require('../../assets/cart/delete.png')}
                      style={styles.deleteIcon}
                      resizeMode="contain"
                    />
                  </Pressable>
                  <View style={styles.qtyControls}>
                    <Pressable
                      style={styles.qtyBtn}
                      onPress={() => changeQty(item.id, -1)}
                    >
                      <Ionicons name="remove" size={14} color={COLORS.text} />
                    </Pressable>
                    <Text style={styles.qtyValue}>{item.qty}</Text>
                    <Pressable
                      style={styles.qtyBtn}
                      onPress={() => changeQty(item.id, 1)}
                    >
                      <Ionicons name="add" size={14} color={COLORS.text} />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View
          style={[
            styles.checkoutBar,
            { paddingBottom: Math.max(insets.bottom, 8) },
          ]}
        >
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>Subtotal:</Text>
            <Text style={styles.subtotalValue}>$ {subtotal.toFixed(2)}</Text>
          </View>
          <Button
            title="Proceed order"
            onPress={onProceed}
            containerStyle={styles.proceedButton}
            textStyle={styles.proceedText}
          />
          <Footer
            activeTab="cart"
            onTabPress={(tab) => onTabPress?.(tab)}
            style={styles.footer}
          />
        </View>
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
    overflow: 'hidden',
  },
  scrollContent: {
    width: '100%',
    paddingHorizontal: '4.5%',
    paddingTop: '4%',
    gap: 16,
  },
  addressCard: {
    width: '100%',
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.white,
    paddingHorizontal: '3.5%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  addressLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addressText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.link,
  },
  list: {
    width: '100%',
    gap: 12,
  },
  itemRow: {
    width: '100%',
    minHeight: 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    paddingHorizontal: '3%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  thumb: {
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: COLORS.imageBg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbImage: {
    width: '80%',
    height: '80%',
  },
  itemInfo: {
    flex: 1,
    gap: 2,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  itemMeta: {
    fontSize: 12,
    color: COLORS.muted,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 2,
  },
  itemActions: {
    alignItems: 'flex-end',
    gap: 10,
  },
  deleteIcon: {
    width: 28,
    height: 28,
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: COLORS.imageBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyValue: {
    minWidth: 16,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  checkoutBar: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#DCE7E7',
    backgroundColor: COLORS.white,
    paddingHorizontal: '4.5%',
    paddingTop: 12,
    gap: 10,
  },
  subtotalRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtotalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  subtotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  proceedButton: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
  },
  proceedText: {
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    marginHorizontal: '-4.5%',
    borderTopWidth: 0,
  },
});
