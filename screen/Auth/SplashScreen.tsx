import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const COLORS = {
  primary: '#10B981',
  white: '#FFFFFF',
};

type SplashScreenProps = {
  onPress?: () => void;
};

function CartIcon() {
  return (
    <View style={styles.iconCircle}>
      <Ionicons name="cart-outline" size={24} color={COLORS.white} />
    </View>
  );
}

export default function SplashScreen({ onPress }: SplashScreenProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <StatusBar style="light" />
      <View style={styles.logoPill}>
        <CartIcon />
        <Text style={styles.brandText}>HappyCart</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 10,
    borderRadius: 100,
    backgroundColor: COLORS.white,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
});
