import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../componets/layout/Button';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(13, 13, 13, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  border: 'rgba(229, 231, 235, 1)',
  overlay: 'rgba(0, 0, 0, 0.45)',
  radioIdle: 'rgba(209, 213, 219, 1)',
};

export type SavedAddress = {
  id: string;
  label: string;
  line: string;
};

type AddressScreenProps = {
  visible?: boolean;
  addresses?: SavedAddress[];
  initialSelectedId?: string;
  onBack?: () => void;
  onSave?: (address: SavedAddress) => void;
  onAddNew?: () => void;
};

const DEFAULT_ADDRESSES: SavedAddress[] = [
  {
    id: 'home',
    label: 'Home',
    line: 'Jaffna town, st 123, North',
  },
  {
    id: 'office',
    label: 'Office',
    line: 'Jaffna town, st 123, North',
  },
  {
    id: 'work',
    label: 'Work',
    line: 'Jaffna town, st 123, North',
  },
];

export default function AddressScreen({
  visible = true,
  addresses = DEFAULT_ADDRESSES,
  initialSelectedId = 'home',
  onBack,
  onSave,
  onAddNew,
}: AddressScreenProps) {
  const insets = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState(initialSelectedId);

  const selected =
    addresses.find((item) => item.id === selectedId) ?? addresses[0];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onBack}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onBack} />

        <View
          style={[
            styles.sheet,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <Text style={styles.title}>Address</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          >
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
                    <Text
                      style={[
                        styles.addressLabel,
                        active && styles.addressLabelActive,
                      ]}
                    >
                      {item.label}
                    </Text>
                    <View style={styles.lineRow}>
                      <Ionicons
                        name="location-outline"
                        size={14}
                        color={COLORS.text}
                      />
                      <Text style={styles.addressLine} numberOfLines={2}>
                        {item.line}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>

          <View style={styles.actions}>
            <Button
              title="Add new address"
              variant="outline"
              onPress={onAddNew}
              containerStyle={styles.addButton}
              textStyle={styles.addButtonText}
            />
            <Button
              title="Save"
              onPress={() => selected && onSave?.(selected)}
              containerStyle={styles.saveButton}
              textStyle={styles.saveText}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.overlay,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '75%',
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  list: {
    gap: 12,
    paddingBottom: 4,
  },
  addressRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: COLORS.white,
  },
  addressRowActive: {
    borderColor: COLORS.primary,
  },
  radioOuter: {
    width: 20,
    height: 20,
    marginTop: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.radioIdle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  addressCopy: {
    flex: 1,
    gap: 6,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  addressLabelActive: {
    color: COLORS.primary,
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addressLine: {
    flex: 1,
    fontSize: 13,
    color: COLORS.text,
  },
  actions: {
    gap: 12,
    paddingTop: 4,
  },
  addButton: {
    width: '100%',
    height: 52,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  addButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 15,
  },
  saveButton: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
});
