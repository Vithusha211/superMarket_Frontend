import { useState } from 'react';
import  {
  Image,
  Alert,
  Linking,
  StyleSheet,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import { Text } from '../../componets/layout/AppText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../componets/layout/Button';
import Header from '../../componets/layout/Header';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(13, 13, 13, 1)',
  muted: 'rgba(114, 130, 138, 1)',
};

type EnableLocationScreenProps = {
  onBack?: () => void;
  onSetManually?: () => void;
};

export default function EnableLocationScreen({
  onBack,
  onSetManually,
}: EnableLocationScreenProps) {
  const insets = useSafeAreaInsets();
  const [isOpeningMap, setIsOpeningMap] = useState(false);

  const allowOpenStreetMap = async () => {
    setIsOpeningMap(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location permission needed',
          'Enable location access in your device settings to open OpenStreetMap at your current location.'
        );
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const { latitude, longitude } = position.coords;
      const mapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;
      await Linking.openURL(mapUrl);
    } catch (error) {
      console.error('Unable to open OpenStreetMap at the current location.', error);
      Alert.alert(
        'Unable to open OpenStreetMap',
        'Please try again or set your location manually.'
      );
    } finally {
      setIsOpeningMap(false);
    }
  };

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
            title="Allow OpenStreetMap"
            onPress={allowOpenStreetMap}
            loading={isOpeningMap}
            containerStyle={styles.primaryButton}
            textStyle={styles.buttonText}
          />

          <Button
            title="Set Manually"
            variant="outline"
            onPress={onSetManually}
            containerStyle={styles.outlineButton}
            textStyle={styles.buttonText}
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
    gap:15,
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
    gap: 20,
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
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
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
    gap: 20,
    width: '100%',
    paddingTop: 12,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: COLORS.primary,
  },
  outlineButton: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
