import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../componets/layout/Header';
import Logo from '../../componets/layout/Logo';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  muted: 'rgba(114, 130, 138, 1)',
};

export type InformationPage =
  | 'About us'
  | 'Privacy Policy'
  | 'Terms of Service';

const PAGE_COPY: Record<InformationPage, string> = {
  'About us':
    'We are dedicated to creating simple, smart, and user-friendly digital solutions that make everyday tasks easier. Our app is designed with a focus on speed, reliability, and a smooth user experience. We aim to bring convenience to your fingertips while continuously improving based on user feedback.',
  'Privacy Policy':
    'We are dedicated to creating simple, smart, and user-friendly digital solutions that make everyday tasks easier. Our app is designed with a focus on speed, reliability, and a smooth user experience. We aim to bring convenience to your fingertips while continuously improving based on user feedback.',
  'Terms of Service':
    'We are dedicated to creating simple, smart, and user-friendly digital solutions that make everyday tasks easier. Our app is designed with a focus on speed, reliability, and a smooth user experience. We aim to bring convenience to your fingertips while continuously improving based on user feedback.',
};

type InformationScreenProps = {
  page: InformationPage;
  onBack?: () => void;
};

export default function InformationScreen({
  page,
  onBack,
}: InformationScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title={page}
        titleAlign="left"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            { paddingBottom: Math.max(insets.bottom, 16) + 20 },
          ]}
        >
          <Logo height={42} style={styles.logo} />
          <Text style={styles.copy}>{PAGE_COPY[page]}</Text>
        </ScrollView>
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
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    alignSelf: 'center',
  },
  copy: {
    width: '100%',
    marginTop: 20,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'justify',
    color: COLORS.muted,
  },
});
