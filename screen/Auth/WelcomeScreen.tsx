import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../componets/layout/Button';

const COLORS = {
  primary: '#10B981',
  white: '#FFFFFF',
};

type WelcomeScreenProps = {
  onLogin?: () => void;
  onCreateAccount?: () => void;
};

function LogoPill() {
  return (
    <View style={styles.logoPill}>
      <View style={styles.logoIcon}>
        <Ionicons name="cart-outline" size={24} color={COLORS.white} />
      </View>
      <Text style={styles.logoText}>HappyCart</Text>
    </View>
  );
}

export default function WelcomeScreen({
  onLogin,
  onCreateAccount,
}: WelcomeScreenProps) {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <LogoPill />

        <View style={styles.card}>
          <Button
            title="Existing member? Log in"
            variant="primary"
            onPress={onLogin}
            containerStyle={styles.button}
          />
          <Button
            title="New to Happycart? Create account"
            variant="outline"
            onPress={onCreateAccount}
            containerStyle={[styles.button, styles.outlineButton]}
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 40,
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
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    fontStyle: 'italic',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    gap: 12,
  },
  button: {
    height: 51,
  },
  outlineButton: {
    backgroundColor: COLORS.white,
  },
});
