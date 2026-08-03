import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../componets/layout/Button';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
};

type GetStartedScreenProps = {
  onContinue?: () => void;
};

export default function GetStartedScreen({ onContinue }: GetStartedScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 24 }]}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <View style={styles.logoPill}>
          <View style={styles.logoIcon}>
            <Ionicons name="cart-outline" size={24} color={COLORS.white} />
          </View>
          <Text style={styles.logoText}>HappyCart</Text>
        </View>

        <View style={styles.copy}>
          <Text style={styles.title}>Let's get started!</Text>
          <Text style={styles.subtitle}>
            Your location is saved. Start shopping your daily essentials.
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, 24) },
        ]}
      >
        <Button
          title="Continue"
          onPress={onContinue}
          containerStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 28,
  },
  logoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 10,
    borderRadius: 100,
    backgroundColor: COLORS.white,
  },
  logoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    paddingHorizontal: 8,
  },
  copy: {
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.white,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
