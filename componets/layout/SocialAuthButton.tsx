import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';

export type SocialAccount = {
  id: string;
  email: string;
  name: string;
  picture?: string;
};

export type SocialProvider = 'google' | 'facebook';

type SocialAuthButtonProps = {
  provider: SocialProvider;
  authenticate?: () => Promise<SocialAccount>;
  onSuccess: (account: SocialAccount) => void;
  onError: (message: string) => void;
  style?: ViewStyle;
};

const providerIcons = {
  google: require('../../assets/social/google.png'),
  facebook: require('../../assets/social/facebook.png'),
};

export default function SocialAuthButton({
  provider,
  authenticate,
  onSuccess,
  onError,
  style,
}: SocialAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    if (!authenticate) {
      onError(
        'Kinde is not configured. Set EXPO_PUBLIC_KINDE_DOMAIN and EXPO_PUBLIC_KINDE_CLIENT_ID in your environment, then restart the app.',
      );
      return;
    }

    setIsLoading(true);
    try {
      onSuccess(await authenticate());
    } catch (error) {
      onError(
        error instanceof Error
          ? `${provider} sign-in failed: ${error.message}`
          : `${provider} sign-in failed: ${String(error)}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Continue with ${provider}`}
      accessibilityState={{ disabled: isLoading, busy: isLoading }}
      disabled={isLoading}
      onPress={() => void handlePress()}
      style={[styles.button, style]}
    >
      {isLoading ? (
        <ActivityIndicator color="#4285F4" />
      ) : (
        <Image
          source={providerIcons[provider]}
          style={styles.icon}
          resizeMode="contain"
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#F7F8F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  icon: {
    width: 25,
    height: 25,
  },
});
