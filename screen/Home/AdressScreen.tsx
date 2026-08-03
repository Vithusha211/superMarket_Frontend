import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../componets/layout/Button';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  border: '#E5E7EB',
  bannerBg: '#E8F8F2',
  link: '#07C187',
};

export type SavedAddress = {
  id: string;
  label: string;
  line: string;
};

type AddressScreenProps = {
  /** 'change' = from cart; 'add' = adding from cart address list */
  mode?: 'change' | 'add';
  addresses?: SavedAddress[];
  initialSelectedId?: string;
  deliveringTo?: string;
  onBack?: () => void;
  onSave?: (address: SavedAddress) => void;
  onAddNew?: () => void;
  onChangeBanner?: () => void;
};

const DEFAULT_ADDRESSES: SavedAddress[] = [
  {
    id: 'home',
    label: 'Home',
    line: 'Jaffna town, NY 122 North',
  },
  {
    id: 'office',
    label: 'Office',
    line: 'Jaffna town, NY 122 North',
  },
  {
    id: 'mum',
    label: 'Mum',
    line: 'Jaffna town, NY 122 North',
  },
];

export default function AddressScreen({
  mode = 'change',
  addresses = DEFAULT_ADDRESSES,
  initialSelectedId = 'office',
  deliveringTo = 'Jaffna town, NY 122 North',
  onBack,
  onSave,
  onAddNew,
}: AddressScreenProps) {
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  const selected =
    addresses.find((item) => item.id === selectedId) ?? addresses[0];

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
            { paddingBottom: Math.max(insets.bottom, 16) + 100 },
          ]}
        >
          <View style={styles.banner}>
            <View style={styles.bannerLeft}>
              <Ionicons name="location" size={18} color={COLORS.primary} />
              <Text style={styles.bannerText} numberOfLines={2}>
                Delivering to {deliveringTo}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Address</Text>

          <View style={styles.list}>
            {addresses.map((item) => {
              const active = item.id === selectedId;
              return (
                <Pressable
                  key={item.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                  onPress={() => setSelectedId(item.id)}
                  style={[styles.addressRow, active && styles.addressRowActive]}
                >
                  <View
                    style={[
                      styles.radioOuter,
                      active && styles.radioOuterActive,
                    ]}
                  >
                    {active ? <View style={styles.radioInner} /> : null}
                  </View>
                  <View style={styles.addressCopy}>
                    <Text style={styles.addressLabel}>{item.label}</Text>
                    <Text style={styles.addressLine} numberOfLines={2}>
                      {item.line}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <Button
            title="Add New Address"
            variant="outline"
            onPress={onAddNew}
            containerStyle={styles.addButton}
            textStyle={styles.addButtonText}
          />
        </ScrollView>

        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <Button
            title="SAVE"
            onPress={() => selected && onSave?.(selected)}
            containerStyle={styles.saveButton}
            textStyle={styles.saveText}
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
  },
  scrollContent: {
    width: '100%',
    paddingHorizontal: '4.5%',
    paddingTop: '4%',
    gap: 16,
  },
  banner: {
    width: '100%',
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingVertical: '2.5%',
    paddingHorizontal: '3.5%',
    borderRadius: 10,
    backgroundColor: COLORS.bannerBg,
  },
  bannerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bannerText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  list: {
    width: '100%',
    gap: 10,
  },
  addressRow: {
    width: '100%',
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: '3.5%',
    paddingVertical: '3%',
    paddingHorizontal: '3.5%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  addressRowActive: {
    borderColor: COLORS.primary,
  },
  radioOuter: {
    width: '5.5%',
    aspectRatio: 1,
    maxWidth: 22,
    minWidth: 18,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: '55%',
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
  },
  addressCopy: {
    flex: 1,
    gap: 4,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  addressLine: {
    fontSize: 13,
    color: COLORS.muted,
  },
  addButton: {
    width: '100%',
    minHeight: 48,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  addButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  footer: {
    width: '100%',
    paddingHorizontal: '4.5%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  saveButton: {
    width: '100%',
    minHeight: 52,
    backgroundColor: COLORS.primary,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
