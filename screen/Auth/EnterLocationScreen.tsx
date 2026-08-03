import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../componets/layout/Button';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  border: '#E5E7EB',
  pin: '#EF4444',
  searchBg: '#FFFFFF',
};

const PREVIOUS_ADDRESS = 'Jaffna, Uduvil east, St 123';

const SUGGESTIONS = [
  'Jaffna, Uduvil east, St 123',
  'Jaffna, Uduvil east, St 123',
  'Jaffna, Uduvil east, St 123',
  'Jaffna, Uduvil east, St 123',
];

type EnterLocationScreenProps = {
  onBack?: () => void;
  onAllowMaps?: () => void;
  onSelectAddress?: (address: string) => void;
};

export default function EnterLocationScreen({
  onBack,
  onAllowMaps,
  onSelectAddress,
}: EnterLocationScreenProps) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const isSearching = query.trim().length > 0;

  const results = useMemo(() => {
    if (!isSearching) return [];
    const q = query.trim().toLowerCase();
    return SUGGESTIONS.filter((item) => item.toLowerCase().includes(q));
  }, [isSearching, query]);

  return (
    <View style={styles.screen}>
      <Header
        title="Enter your location"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.sheet}>
          <View style={styles.searchWrap}>
            <Ionicons name="search" size={20} color={COLORS.muted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search"
              placeholderTextColor={COLORS.muted}
              style={styles.searchInput}
              returnKeyType="search"
              autoCorrect={false}
            />
          </View>

          {!isSearching ? (
            <>
              <Text style={styles.helper}>
                Providing a complete address helps ensure more accurate search
                results.
              </Text>

              <View style={styles.previousSection}>
                <Text style={styles.previousTitle}>Previous address</Text>
                <Pressable
                  style={styles.addressRow}
                  onPress={() => onSelectAddress?.(PREVIOUS_ADDRESS)}
                >
                  <Ionicons name="location" size={18} color={COLORS.pin} />
                  <Text style={styles.addressText}>{PREVIOUS_ADDRESS}</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <FlatList
              data={results}
              keyExtractor={(item, index) => `${item}-${index}`}
              keyboardShouldPersistTaps="handled"
              style={styles.resultsList}
              contentContainerStyle={styles.resultsContent}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.addressRow}
                  onPress={() => onSelectAddress?.(item)}
                >
                  <Ionicons name="location" size={18} color={COLORS.pin} />
                  <Text style={styles.addressText}>{item}</Text>
                </Pressable>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No locations found</Text>
              }
            />
          )}

          {!isSearching ? (
            <View
              style={[
                styles.footer,
                { paddingBottom: Math.max(insets.bottom, 16) },
              ]}
            >
              <Button
                title="Allow Google Maps"
                onPress={onAllowMaps}
                containerStyle={styles.primaryButton}
                textStyle={styles.primaryButtonText}
              />
            </View>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  flex: {
    flex: 1,
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: COLORS.searchBg,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    paddingVertical: 0,
  },
  helper: {
    marginTop: 14,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.muted,
  },
  previousSection: {
    marginTop: 28,
    gap: 14,
  },
  previousTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  resultsList: {
    flex: 1,
    marginTop: 12,
  },
  resultsContent: {
    paddingBottom: 24,
  },
  emptyText: {
    marginTop: 24,
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 16,
  },
  primaryButton: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
