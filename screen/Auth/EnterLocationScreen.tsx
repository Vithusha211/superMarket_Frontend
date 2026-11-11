import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import  {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Text, TextInput } from '../../componets/layout/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../componets/layout/Button';
import Header from '../../componets/layout/Header';
import * as Location from 'expo-location';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(13, 13, 13, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  border: 'rgba(229, 231, 235, 1)',
  pin: 'rgba(236, 28, 36, 1)',
  searchBg: 'rgba(255, 255, 255, 1)',
};

const PREVIOUS_ADDRESS = 'Jaffna, Uduvil east, St 123';

type PlaceSuggestion = {
  place_id: number;
  display_name: string;
};

type EnterLocationScreenProps = {
  onBack?: () => void;
  onAllowMaps?: () => void;
  onUseCurrentLocation?: (address: string) => void;
  onSelectAddress?: (address: string) => void;
};

export default function EnterLocationScreen({
  onBack,
  onAllowMaps,
  onUseCurrentLocation,
  onSelectAddress,
}: EnterLocationScreenProps) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PlaceSuggestion[]>([]);
  const [isSearchingPlaces, setIsSearchingPlaces] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const isSearching = query.trim().length > 0;

  useEffect(() => {
    const search = query.trim();
    if (!search) {
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=8&q=${encodeURIComponent(search)}`,
          {
            headers: {
              'Accept-Language': 'en',
              'User-Agent': 'HappyCart/1.0',
            },
          }
        );
        const places = await response.json() as PlaceSuggestion[];
        setResults(Array.isArray(places) ? places : []);
      } catch {
        setResults([]);
      } finally {
        setIsSearchingPlaces(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      setIsSearchingPlaces(false);
    } else {
      setIsSearchingPlaces(true);
    }
  };

  const useCurrentLocation = async () => {
    setIsLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location permission needed',
          'Allow location access to use your current location, or search for an address.'
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const addresses = await Location.reverseGeocodeAsync(position.coords);
      const address = addresses[0];
      let resolvedAddress: string;

      if (address) {
        const parts = [
          address.name,
          address.street,
          address.city,
          address.region,
          address.postalCode,
          address.country,
        ].filter(Boolean);
        resolvedAddress =
          [...new Set(parts)].join(', ') ||
          `${position.coords.latitude}, ${position.coords.longitude}`;
      } else {
        resolvedAddress = `${position.coords.latitude}, ${position.coords.longitude}`;
      }

      if (onUseCurrentLocation) {
        onUseCurrentLocation(resolvedAddress);
      } else {
        onSelectAddress?.(resolvedAddress);
      }
    } catch {
      Alert.alert(
        'Unable to get current location',
        'Please try again or search for your address manually.'
      );
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Enter your location"
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
              onChangeText={handleQueryChange}
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
              keyExtractor={(item) => String(item.place_id)}
              keyboardShouldPersistTaps="handled"
              style={styles.resultsList}
              contentContainerStyle={styles.resultsContent}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.addressRow}
                  onPress={() => onSelectAddress?.(item.display_name)}
                >
                  <Ionicons name="location" size={18} color={COLORS.pin} />
                  <Text style={styles.addressText}>{item.display_name}</Text>
                </Pressable>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  {isSearchingPlaces ? 'Searching OpenStreetMap...' : 'No locations found'}
                </Text>
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
                title="Use current location"
                variant="outline"
                onPress={useCurrentLocation}
                loading={isLocating}
                containerStyle={styles.currentLocationButton}
              />
              <Button
                title="Allow OpenStreetMap"
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
    gap: 15,
  },
  flex: {
    flex: 1,
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: '4.5%',
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
  currentLocationButton: {
    marginBottom: 12,
    width: '100%',
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
