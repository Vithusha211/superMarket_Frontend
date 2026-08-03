import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Button from '../../componets/layout/Button';

const COLORS = {
  primary: '#07C187',
  white: '#FFFFFF',
  text: '#111827',
  muted: '#9CA3AF',
  skipBg: '#F2F2F3',
  progressTrack: '#E5E7EB',
};

type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

const STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Happycart',
    description:
      'Get your grocery needs at your service within a minute, fast, efficient, and convenient.',
    image: require('../../assets/onboarding/cart.png'),
  },
  {
    id: 'packages',
    title: 'Get any packages delivered',
    description:
      'Get all your items conveniently, ensuring everything you need arrive without any hassle.',
    image: require('../../assets/onboarding/truck.png'),
  },
  {
    id: 'protected',
    title: 'Protected package delivery.',
    description:
      'Your groceries are carefully packaged to ensure they arrive safely and in perfect condition.',
    image: require('../../assets/onboarding/box.png'),
  },
  {
    id: 'price',
    title: 'Best price guaranteed',
    description:
      'Allowing you to stock up on your favorite items while staying within your budget.',
    image: require('../../assets/onboarding/register.png'),
  },
];

type OnboardingScreenProps = {
  onSkip?: () => void;
  onFinish?: () => void;
};

function LogoPill() {
  return (
    <View style={styles.logoPill}>
      <View style={styles.logoIcon}>
        <Ionicons name="cart-outline" size={20} color={COLORS.white} />
      </View>
      <Text style={styles.logoText}>HappyCart</Text>
    </View>
  );
}

function ProgressBar({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) {
  return (
    <View style={styles.progressRow}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressSegment,
            index <= currentIndex
              ? styles.progressSegmentActive
              : styles.progressSegmentInactive,
          ]}
        />
      ))}
    </View>
  );
}

export default function OnboardingScreen({
  onSkip,
  onFinish,
}: OnboardingScreenProps) {
  const insets = useSafeAreaInsets();
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onFinish?.();
      return;
    }
    setStepIndex((prev) => prev + 1);
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top + 12 }]}>
      <StatusBar style="light" />

      <LogoPill />

      <View
        style={[
          styles.card,
          {
            marginBottom: Math.max(insets.bottom, 20),
          },
        ]}
      >
        <ProgressBar currentIndex={stepIndex} total={STEPS.length} />

        <View style={styles.content}>
          <View style={styles.illustration}>
            <Image
              source={step.image}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>{step.title}</Text>
          <Text style={styles.description}>{step.description}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={onSkip}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>

          <Button
            title="Next"
            onPress={handleNext}
            containerStyle={styles.nextButton}
            textStyle={styles.nextText}
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
    alignItems: 'center',
    paddingHorizontal: '4.5%',
    gap: 20,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'italic',
    color: COLORS.primary,
  },
  card: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: '4.5%',
    paddingTop: 20,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  progressRow: {
    flexDirection: 'row',
    gap: 8,
    height: 10,
  },
  progressSegment: {
    flex: 1,
    height: 10,
    borderRadius: 100,
  },
  progressSegmentActive: {
    backgroundColor: COLORS.primary,
  },
  progressSegmentInactive: {
    backgroundColor: COLORS.progressTrack,
  },
  content: {
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 8,
  },
  illustration: {
    width: '100%',
    aspectRatio: 400 / 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationImage: {
    width: '90%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  skipButton: {
    flex: 1,
    height: 52,
    borderRadius: 100,
    backgroundColor: COLORS.skipBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  nextButton: {
    flex: 1,
    height: 52,
    backgroundColor: COLORS.primary,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
