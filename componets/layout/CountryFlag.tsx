import { StyleSheet, Text, View } from 'react-native';

type CountryFlagProps = {
  flag: string;
  size?: number;
};

function getFlagId(flag: string) {
  if (flag === '🇩🇪') return 'de';
  if (flag === '🇬🇧') return 'gb';
  if (flag === '🇫🇷') return 'fr';
  return null;
}

export default function CountryFlag({ flag, size = 20 }: CountryFlagProps) {
  const id = getFlagId(flag);
  const height = size * 0.7;

  if (!id) {
    return <Text style={[styles.fallback, { fontSize: size * 0.8 }]}>{flag}</Text>;
  }

  return (
    <View
      accessibilityLabel={`${id} country flag`}
      style={[styles.flag, { width: size, height }]}
    >
      {id === 'de' ? (
        <>
          <View style={[styles.band, styles.black, { height: height / 3 }]} />
          <View style={[styles.band, styles.red, { height: height / 3 }]} />
          <View style={[styles.band, styles.gold, { height: height / 3 }]} />
        </>
      ) : id === 'fr' ? (
        <>
          <View style={[styles.band, styles.blue, { width: size / 3 }]} />
          <View style={[styles.band, styles.white, { width: size / 3 }]} />
          <View style={[styles.band, styles.red, { width: size / 3 }]} />
        </>
      ) : (
        <View style={[styles.gbBase, { width: size, height }]}>
          <View style={[styles.gbDiagonal, styles.gbDiagonalA]} />
          <View style={[styles.gbDiagonal, styles.gbDiagonalB]} />
          <View style={[styles.gbCrossHorizontal, { height: height * 0.22 }]} />
          <View style={[styles.gbCrossVertical, { width: size * 0.22 }]} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flag: {
    overflow: 'hidden',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  band: {
    flex: 1,
  },
  black: { backgroundColor: '#111111' },
  red: { backgroundColor: '#E51B23' },
  gold: { backgroundColor: '#F5C400' },
  blue: { backgroundColor: '#1D4F91' },
  white: { backgroundColor: '#FFFFFF' },
  gbBase: {
    overflow: 'hidden',
    backgroundColor: '#1D4F91',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gbDiagonal: {
    position: 'absolute',
    width: '145%',
    height: 2,
    backgroundColor: '#FFFFFF',
  },
  gbDiagonalA: { transform: [{ rotate: '27deg' }] },
  gbDiagonalB: { transform: [{ rotate: '-27deg' }] },
  gbCrossHorizontal: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  gbCrossVertical: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  fallback: {
    width: 20,
    textAlign: 'center',
  },
});