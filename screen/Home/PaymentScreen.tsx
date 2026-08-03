import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Button from '../../componets/layout/Button';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  border: '#E5E7EB',
  optionBorder: '#078574',
  sheet: '#FFFFFF',
};

export type PaymentMethodId = 'google' | 'apple';

type PaymentScreenProps = {
  subtotal?: number;
  onBack?: () => void;
  onPay?: (method: PaymentMethodId) => void;
};

const METHODS: { id: PaymentMethodId; label: string }[] = [
  { id: 'google', label: 'Google pay' },
  { id: 'apple', label: 'Apple pay' },
];

export default function PaymentScreen({
  subtotal = 25,
  onBack,
  onPay,
}: PaymentScreenProps) {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<PaymentMethodId>('google');

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Payment Method"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Quick payment</Text>

          <View style={styles.methods}>
            {METHODS.map((method) => {
              const active = selected === method.id;
              return (
                <Pressable
                  key={method.id}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                  onPress={() => setSelected(method.id)}
                  style={[styles.methodRow, active && styles.methodRowActive]}
                >
                  <View
                    style={[styles.radioOuter, active && styles.radioOuterActive]}
                  >
                    {active ? <View style={styles.radioInner} /> : null}
                  </View>
                  <Text style={styles.methodLabel}>{method.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>Subtotal:</Text>
            <Text style={styles.subtotalValue}>$ {subtotal.toFixed(2)}</Text>
          </View>

          <Button
            title="Pay"
            onPress={() => onPay?.(selected)}
            containerStyle={styles.payButton}
            textStyle={styles.payText}
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
    backgroundColor: COLORS.sheet,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: '4.5%',
    paddingTop: '5%',
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  methods: {
    width: '100%',
    gap: 12,
  },
  methodRow: {
    width: '100%',
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4%',
    paddingVertical: '2.5%',
    paddingHorizontal: '3.5%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  methodRowActive: {
    borderColor: COLORS.optionBorder,
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
  methodLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.text,
  },
  footer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: '4.5%',
    paddingTop: '4%',
    gap: 12,
    backgroundColor: COLORS.white,
  },
  subtotalRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  subtotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  payButton: {
    width: '100%',
    minHeight: 52,
    backgroundColor: COLORS.primary,
  },
  payText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
