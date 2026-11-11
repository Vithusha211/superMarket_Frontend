import  {
  Image,
  ImageSourcePropType,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from '../../componets/layout/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../componets/layout/Button';
import Header from '../../componets/layout/Header';
import * as FileSystem from 'expo-file-system/legacy';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { useLocale } from '../../context/LocaleContext';
import { createInvoiceHtml, createInvoicePdf } from '../../utils/invoicePdf';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  border: '#E5E7EB',
  imageBg: '#F3F4F6',
};

export type InvoiceItem = {
  id: string;
  name: string;
  quantityLabel: string;
  qty: number;
  price: number;
  image: ImageSourcePropType;
};

type InvoiceScreenProps = {
  orderDate?: string;
  orderTime?: string;
  customerName?: string;
  orderType?: string;
  deliveryLocation?: string;
  items?: InvoiceItem[];
  subtotal?: number;
  onBack?: () => void;
};

const DEFAULT_ITEMS: InvoiceItem[] = [
  {
    id: '1',
    name: 'Sweet Melon',
    quantityLabel: '500g',
    qty: 1,
    price: 5,
    image: require('../../assets/product/sweet-melon.png'),
  },
  {
    id: '2',
    name: 'Sweet Melon',
    quantityLabel: '500g',
    qty: 1,
    price: 5,
    image: require('../../assets/product/sweet-melon.png'),
  },
];

export default function InvoiceScreen({
  orderDate = '2024-03-12',
  orderTime = '04:23:09 PM',
  customerName = 'John Doe',
  orderType = 'Delivery',
  deliveryLocation = 'Jaffna Town, at NO North',
  items = DEFAULT_ITEMS,
  subtotal = 25,
  onBack,
}: InvoiceScreenProps) {
  const insets = useSafeAreaInsets();
  const { showError } = useToast();
  const { translate } = useLocale();
  const [busyAction, setBusyAction] = useState<'download' | null>(null);
  const invoiceData = {
    orderDate,
    orderTime,
    customerName,
    orderType,
    deliveryLocation,
    items: items.map((item) => ({
      ...item,
      name: translate(item.name),
    })),
    subtotal,
    labels: {
      title: translate('HappyCart Invoice'),
      orderDate: translate('Order date'),
      orderTime: translate('Order time'),
      customerName: translate('Customer name'),
      orderType: translate('Order type'),
      deliveryLocation: translate('Delivery location'),
      item: translate('Item'),
      quantity: translate('Quantity'),
      price: translate('Price'),
      total: translate('Total'),
      subtotal: translate('Subtotal'),
    },
  };

  const handleDownload = async () => {
    setBusyAction('download');
    try {
      if (Platform.OS === 'web') {
        await Print.printAsync({ html: createInvoiceHtml(invoiceData) });
        return;
      }

      const { uri, base64 } = await createInvoicePdf(invoiceData);
      if (Platform.OS === 'android' && Number(Platform.Version) >= 30) {
        const permission =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (!permission.granted) return;

        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          permission.directoryUri,
          `HappyCart-Invoice-${Date.now()}.pdf`,
          'application/pdf',
        );
        if (!base64) {
          throw new Error('Unable to generate the invoice file.');
        }
        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });
        return;
      }

      if (!(await Sharing.isAvailableAsync())) {
        throw new Error('Invoice sharing is not available on this device.');
      }
      await Sharing.shareAsync(uri, {
        dialogTitle: 'Save invoice',
        mimeType: 'application/pdf',
        UTI: 'com.adobe.pdf',
      });
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : 'Unable to download invoice. Please try again.',
      );
    } finally {
      setBusyAction(null);
    }
  };

  const rows = [
    { label: 'Order date', value: orderDate },
    { label: 'Order time', value: orderTime },
    { label: 'Customer name', value: customerName },
    { label: 'Order type', value: orderType },
  ];

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Invoice"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 16) + 90 },
          ]}
        >
          <View style={styles.qrWrap}>
            <View style={styles.qrBox}>
              <Ionicons name="qr-code" size={88} color={COLORS.text} />
            </View>
          </View>

          <View style={styles.infoCard}>
            {rows.map((row) => (
              <View key={row.label} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{row.label}</Text>
                <Text style={styles.infoValue}>{row.value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.locationCard}>
            <Ionicons name="location" size={18} color={COLORS.primary} />
            <View style={styles.locationCopy}>
              <Text style={styles.locationLabel}>Delivery location</Text>
              <Text style={styles.locationValue}>{deliveryLocation}</Text>
            </View>
          </View>

          <View style={styles.items}>
            {items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.thumb}>
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
                  <Text style={styles.itemQty}>QTY: {item.qty}</Text>
                </View>
                <Text style={styles.itemPrice}>$ {item.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.subtotalValue}>$ {subtotal.toFixed(2)}</Text>
          </View>
        </ScrollView>

        <View
          style={[
            styles.footer,
            { paddingBottom: Math.max(insets.bottom, 16) },
          ]}
        >
          <Button
            title="Download Invoice"
            onPress={handleDownload}
            loading={busyAction === 'download'}
            disabled={busyAction !== null}
            containerStyle={styles.downloadButton}
            textStyle={styles.downloadText}
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
    paddingTop: '5%',
    gap: 16,
  },
  qrWrap: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: '3%',
  },
  qrBox: {
    width: '35%',
    aspectRatio: 1,
    maxWidth: 150,
    minWidth: 120,
    borderRadius: 12,
    backgroundColor: COLORS.imageBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    width: '100%',
    gap: 10,
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.muted,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'right',
    flexShrink: 1,
  },
  locationCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: '3%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  locationCopy: {
    flex: 1,
    gap: 4,
  },
  locationLabel: {
    fontSize: 13,
    color: COLORS.muted,
  },
  locationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  items: {
    width: '100%',
    gap: 12,
  },
  itemRow: {
    width: '100%',
    minHeight: 90,
    flexDirection: 'row',
    alignItems: 'center',
    gap: '3%',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  thumb: {
    width: '18%',
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
    fontWeight: '700',
    color: COLORS.text,
  },
  itemMeta: {
    fontSize: 12,
    color: COLORS.muted,
  },
  itemQty: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtotalRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '2%',
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
  footer: {
    width: '100%',
    paddingHorizontal: '4.5%',
    paddingTop: 12,
    gap: 10,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  downloadButton: {
    width: '100%',
    minHeight: 52,
    backgroundColor: COLORS.primary,
  },
  downloadText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
