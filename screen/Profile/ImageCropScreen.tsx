import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  black: 'rgba(0, 0, 0, 1)',
  dim: 'rgba(0, 0, 0, 0.35)',
};

type ImageCropScreenProps = {
  image?: ImageSourcePropType;
  onCancel?: () => void;
  onDone?: (image: ImageSourcePropType) => void;
};

function CropCorner({
  position,
}: {
  position: 'tl' | 'tr' | 'bl' | 'br';
}) {
  const isTop = position === 'tl' || position === 'tr';
  const isLeft = position === 'tl' || position === 'bl';

  return (
    <View
      style={[
        styles.corner,
        isTop ? styles.cornerTop : styles.cornerBottom,
        isLeft ? styles.cornerLeft : styles.cornerRight,
      ]}
    >
      <View
        style={[
          styles.cornerArmH,
          isTop ? styles.cornerArmTop : styles.cornerArmBottom,
          isLeft ? styles.cornerArmStart : styles.cornerArmEnd,
        ]}
      />
      <View
        style={[
          styles.cornerArmV,
          isTop ? styles.cornerArmTop : styles.cornerArmBottom,
          isLeft ? styles.cornerArmStart : styles.cornerArmEnd,
        ]}
      />
    </View>
  );
}

export default function ImageCropScreen({
  image = require('../../assets/profile/personal/crop-sample.png'),
  onCancel,
  onDone,
}: ImageCropScreenProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [rotation, setRotation] = useState(0);

  // ~385/440 ≈ 87.5% image width; square crop frame
  const frameSize = useMemo(() => Math.min(width * 0.875, width - 54), [width]);

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <View
        style={[
          styles.canvas,
          {
            paddingTop: Math.max(insets.top, 16) + 24,
            paddingBottom: Math.max(insets.bottom, 12) + 64,
          },
        ]}
      >
        <View style={[styles.frame, { width: frameSize, height: frameSize }]}>
          <Image
            source={image}
            style={[
              styles.photo,
              { transform: [{ rotate: `${rotation}deg` }] },
            ]}
            resizeMode="cover"
          />

          <View style={styles.frameBorder} pointerEvents="none" />

          <CropCorner position="tl" />
          <CropCorner position="tr" />
          <CropCorner position="bl" />
          <CropCorner position="br" />
        </View>
      </View>

      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, 10) },
        ]}
      >
        <Pressable
          accessibilityRole="button"
          onPress={onCancel}
          hitSlop={10}
          style={styles.footerSide}
        >
          <Text style={styles.footerAction}>Cancel</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Rotate image"
          onPress={handleRotate}
          hitSlop={12}
          style={styles.footerCenter}
        >
          <Ionicons
            name="refresh-outline"
            size={20}
            color={COLORS.primary}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => onDone?.(image)}
          hitSlop={10}
          style={[styles.footerSide, styles.footerSideRight]}
        >
          <Text style={styles.footerAction}>Done</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  canvas: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '6.1%',
  },
  frame: {
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: COLORS.dim,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  frameBorder: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  corner: {
    position: 'absolute',
    width: '13%',
    aspectRatio: 1,
    maxWidth: 51,
    minWidth: 28,
  },
  cornerTop: {
    top: '3.5%',
  },
  cornerBottom: {
    bottom: '3.5%',
  },
  cornerLeft: {
    left: '3.5%',
  },
  cornerRight: {
    right: '3.5%',
  },
  cornerArmH: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: COLORS.black,
  },
  cornerArmV: {
    position: 'absolute',
    width: 2,
    height: '100%',
    backgroundColor: COLORS.black,
  },
  cornerArmTop: {
    top: 0,
  },
  cornerArmBottom: {
    bottom: 0,
  },
  cornerArmStart: {
    left: 0,
  },
  cornerArmEnd: {
    right: 0,
  },
  footer: {
    width: '100%',
    minHeight: 41,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // 20px / ~440 ≈ 4.5%
    paddingHorizontal: '4.5%',
    paddingTop: 10,
    backgroundColor: COLORS.white,
  },
  footerSide: {
    minWidth: '18%',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  footerSideRight: {
    alignItems: 'flex-end',
  },
  footerCenter: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerAction: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
    letterSpacing: 0.3,
  },
});
