import { StyleSheet, Text, View } from 'react-native';
import { getFirstUnmetPasswordRequirement } from '../../utils/passwordValidation';

const COLORS = {
  error: 'rgba(227, 52, 70, 1)',
};

type PasswordRequirementsProps = {
  password: string;
};

export default function PasswordRequirements({
  password,
}: PasswordRequirementsProps) {
  if (!password) {
    return null;
  }

  const unmet = getFirstUnmetPasswordRequirement(password);

  if (!unmet) {
    return null;
  }

  return (
    <View style={styles.row}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.label}>{unmet.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.error,
  },
  label: {
    flex: 1,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: COLORS.error,
  },
});
