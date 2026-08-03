import {
  Image,
  Pressable,
  StyleSheet,
  Text,
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
};

type EnableLocationScreenProps = {
  onBack?: () => void;
  onAllowMaps?: () => void;
  onSetManually?: () => void;
};

export default function EnableLocationScreen({
  onBack,
  onAllowMaps,
  onSetManually,
}: EnableLocationScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <Header
        title="Enable location"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <View style={styles.content}>
          <View style={styles.illustration}>
            <Image
              source={require('../../assets/location-map.png')}
              style={styles.mapImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.copy}>
            <Text style={styles.title}>Set your location</Text>
            <Text style={styles.subtitle}>
              We will use your location for best shopping experience.
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.actions,
            { paddingBottom: Math.max(insets.bottom, 20) },
          ]}
        >
          <Button
            title="Allow Google Maps"
            onPress={onAllowMaps}
            containerStyle={styles.primaryButton}
            textStyle={styles.primaryButtonText}
          />

          <Pressable onPress={onSetManually} hitSlop={8}>
            <Text style={styles.manualText}>Set Manually</Text>
          </Pressable>
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
    justifyContent: 'space-between',
    paddingHorizontal: '4.5%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
    paddingTop: 24,
  },
  illustration: {
    width: '100%',
    maxWidth: '78%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  copy: {
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
  actions: {
    gap: 14,
    alignItems: 'center',
    paddingTop: 12,
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
  manualText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.primary,
    textAlign: 'center',
  },
});
