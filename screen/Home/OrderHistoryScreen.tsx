import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Footer, { FooterTab } from '../../componets/layout/Footer';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(0, 0, 0, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  border: 'rgba(228, 231, 236, 1)',
  statusBg: 'rgba(255, 152, 0, 0.12)',
  statusText: 'rgba(255, 152, 0, 1)',
  completedBg: 'rgba(7, 193, 135, 0.12)',
  itemsBg: 'rgba(7, 193, 135, 0.12)',
};

export type OrderStatus = 'in-progress' | 'completed';

export type OrderHistoryItem = {
  id: string;
  orderId: string;
  status: OrderStatus;
  orderDate: string;
  orderTime: string;
  deliveryLocation: string;
  itemsCount: number;
  subtotal: number;
};

type OrderTab = 'in-progress' | 'completed';

type OrderHistoryScreenProps = {
  orders?: OrderHistoryItem[];
  onBack?: () => void;
  onOrderPress?: (order: OrderHistoryItem) => void;
  onTabPress?: (tab: FooterTab) => void;
};

const DEFAULT_ORDERS: OrderHistoryItem[] = [
  {
    id: '1',
    orderId: 'ORD-1234',
    status: 'in-progress',
    orderDate: '2024-01-12',
    orderTime: '04:33:04 PM',
    deliveryLocation: 'Jaffna town, st 123, North',
    itemsCount: 3,
    subtotal: 25,
  },
  {
    id: '2',
    orderId: 'ORD-1235',
    status: 'in-progress',
    orderDate: '2024-01-12',
    orderTime: '04:33:04 PM',
    deliveryLocation: 'Jaffna town, st 123, North',
    itemsCount: 3,
    subtotal: 25,
  },
  {
    id: '3',
    orderId: 'ORD-2001',
    status: 'completed',
    orderDate: '2024-01-10',
    orderTime: '02:15:00 PM',
    deliveryLocation: 'Jaffna town, st 123, North',
    itemsCount: 2,
    subtotal: 18,
  },
  {
    id: '4',
    orderId: 'ORD-2002',
    status: 'completed',
    orderDate: '2024-01-08',
    orderTime: '11:40:20 AM',
    deliveryLocation: 'Jaffna town, st 123, North',
    itemsCount: 4,
    subtotal: 32,
  },
];

export default function OrderHistoryScreen({
  orders = DEFAULT_ORDERS,
  onBack,
  onOrderPress,
  onTabPress,
}: OrderHistoryScreenProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<OrderTab>('in-progress');

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) =>
        activeTab === 'in-progress'
          ? order.status === 'in-progress'
          : order.status === 'completed',
      ),
    [orders, activeTab],
  );

  const isEmpty = filteredOrders.length === 0;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Order History"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <View style={styles.tabsWrap}>
          <View style={styles.tabs}>
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === 'in-progress' }}
              onPress={() => setActiveTab('in-progress')}
              style={[
                styles.tab,
                activeTab === 'in-progress' && styles.tabActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'in-progress' && styles.tabTextActive,
                ]}
              >
                In-Progress
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === 'completed' }}
              onPress={() => setActiveTab('completed')}
              style={[
                styles.tab,
                activeTab === 'completed' && styles.tabActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'completed' && styles.tabTextActive,
                ]}
              >
                Completed orders
              </Text>
            </Pressable>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            isEmpty && styles.contentEmpty,
            { paddingBottom: Math.max(insets.bottom, 16) + 88 },
          ]}
        >
          {isEmpty ? (
            <View style={styles.emptyState}>
              <Image
                source={require('../../assets/orders/empty-box.png')}
                style={styles.emptyIcon}
                resizeMode="contain"
                tintColor={COLORS.muted}
              />
              <Text style={styles.emptyText}>
                {activeTab === 'in-progress'
                  ? 'You have no active orders right now.'
                  : 'You have no completed orders right now.'}
              </Text>
            </View>
          ) : (
            filteredOrders.map((order) => {
              const isCompleted = order.status === 'completed';

              return (
                <Pressable
                  key={order.id}
                  accessibilityRole="button"
                  onPress={() => onOrderPress?.(order)}
                  style={styles.card}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.orderId}>{order.orderId}</Text>
                    <View
                      style={[
                        styles.statusBadge,
                        isCompleted
                          ? styles.statusBadgeCompleted
                          : styles.statusBadgeProgress,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          isCompleted
                            ? styles.statusTextCompleted
                            : styles.statusTextProgress,
                        ]}
                      >
                        {isCompleted ? 'Completed' : 'In-progress'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>Order date</Text>
                      <View style={styles.metaValueRow}>
                        <Ionicons
                          name="calendar-outline"
                          size={14}
                          color={COLORS.muted}
                        />
                        <Text style={styles.metaValue}>{order.orderDate}</Text>
                      </View>
                    </View>

                    <View style={styles.metaItem}>
                      <Text style={styles.metaLabel}>Order time</Text>
                      <View style={styles.metaValueRow}>
                        <Ionicons
                          name="time-outline"
                          size={14}
                          color={COLORS.muted}
                        />
                        <Text style={styles.metaValue}>{order.orderTime}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.detailBlock}>
                    <Text style={styles.metaLabel}>Delivery location</Text>
                    <View style={styles.metaValueRow}>
                      <Ionicons
                        name="location-outline"
                        size={14}
                        color={COLORS.muted}
                      />
                      <Text style={styles.metaValue} numberOfLines={2}>
                        {order.deliveryLocation}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailBlock}>
                    <Text style={styles.metaLabel}>Items count</Text>
                    <View style={styles.itemsBadge}>
                      <Text style={styles.itemsBadgeText}>
                        {order.itemsCount} items
                      </Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.subtotalRow}>
                    <Text style={styles.subtotalLabel}>Subtotal:</Text>
                    <Text style={styles.subtotalValue}>
                      $ {order.subtotal.toFixed(2)}
                    </Text>
                  </View>
                </Pressable>
              );
            })
          )}
        </ScrollView>
      </View>

      <View
        style={[
          styles.footerWrap,
          { paddingBottom: Math.max(insets.bottom, 0) },
        ]}
      >
        <Footer activeTab="orders" onTabPress={(tab) => onTabPress?.(tab)} />
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
  tabsWrap: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  tabs: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 100,
    backgroundColor: COLORS.white,
  },
  tab: {
    flex: 1,
    height: 36,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
  },
  tabTextActive: {
    color: COLORS.white,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 12,
  },
  contentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingBottom: 40,
  },
  emptyIcon: {
    width: 100,
    height: 100,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: COLORS.muted,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusBadgeProgress: {
    backgroundColor: COLORS.statusBg,
  },
  statusBadgeCompleted: {
    backgroundColor: COLORS.completedBg,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusTextProgress: {
    color: COLORS.statusText,
  },
  statusTextCompleted: {
    color: COLORS.primary,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flex: 1,
    gap: 6,
  },
  detailBlock: {
    gap: 6,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.muted,
  },
  metaValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaValue: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text,
  },
  itemsBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: COLORS.itemsBg,
  },
  itemsBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
  },
  subtotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtotalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  subtotalValue: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text,
  },
  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.white,
  },
});
