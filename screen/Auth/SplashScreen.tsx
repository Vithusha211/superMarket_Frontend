import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet } from 'react-native';
import Logo from '../../componets/layout/Logo';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
};

type SplashScreenProps = {
  onPress?: () => void;
};

export default function SplashScreen({ onPress }: SplashScreenProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <StatusBar style="light" />
      <Logo height={70} />
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
});
