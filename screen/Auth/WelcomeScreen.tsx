import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Button from '../../componets/layout/Button';
import Logo from '../../componets/layout/Logo';

const COLORS = {
  primary: '#10B981',
  white: '#FFFFFF',
};

type WelcomeScreenProps = {
  onLogin?: () => void;
  onCreateAccount?: () => void;
};

export default function WelcomeScreen({
  onLogin,
  onCreateAccount,
}: WelcomeScreenProps) {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <Logo height={60}/>

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
            textStyle={styles.outlineButtonText}
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
    paddingHorizontal: '9%',
    paddingTop: 250,
    gap: 30,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 16,
    gap: 20,
  },
  button: {
    height: 51,
    
  },
  outlineButton: {
    backgroundColor: COLORS.white,
  },
  outlineButtonText: {
    flex: 1,
    textAlign: 'center',
  },
});
