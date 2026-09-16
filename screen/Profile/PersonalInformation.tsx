import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../componets/layout/Button';
import Header from '../../componets/layout/Header';
import InputField from '../../componets/layout/InputField';

const COLORS = {
  primary: 'rgba(2, 193, 133, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(0, 0, 0, 1)',
  value: 'rgba(18, 18, 18, 1)',
  label: 'rgba(114, 130, 138, 1)',
  placeholder: 'rgba(114, 130, 138, 1)',
  avatarBg: 'rgba(217, 217, 217, 1)',
  icon: 'rgba(114, 130, 138, 1)',
  overlay: 'rgba(0, 0, 0, 0.45)',
  section: 'rgba(114, 130, 138, 1)',
  danger: 'rgba(235, 87, 87, 1)',
  inputBg: 'rgba(242, 242, 243, 1)',
  borderIdle: 'rgba(229, 231, 235, 1)',
};

const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Prefer not to say',
  'Other',
] as const;

type GenderOption = (typeof GENDER_OPTIONS)[number];

type InfoField = {
  id: string;
  label: string;
  value?: string;
  placeholder?: string;
  icon: ImageSourcePropType;
};

type EditSource = 'camera' | 'gallery';

type PersonalInformationScreenProps = {
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  avatar?: ImageSourcePropType;
  onBack?: () => void;
  onEditAvatar?: () => void;
  onPickCamera?: () => void;
  onPickGallery?: () => void;
  onRemoveProfile?: () => void;
  onSaveName?: (name: string) => void;
  onSaveGender?: (gender: string) => void;
  onSaveDateOfBirth?: (dateOfBirth: string) => void;
  onFieldPress?: (fieldId: string) => void;
};

function formatDateOfBirth(input: string) {
  const digits = input.replace(/\D/g, '').slice(0, 8);
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);

  return [day, month, year].filter(Boolean).join('/');
}

function resolveGenderSelection(value: string): {
  option: GenderOption;
  otherText: string;
} {
  if ((GENDER_OPTIONS as readonly string[]).includes(value)) {
    return { option: value as GenderOption, otherText: '' };
  }
  if (!value.trim()) {
    return { option: 'Female', otherText: '' };
  }
  return { option: 'Other', otherText: value };
}

export default function PersonalInformationScreen({
  name = 'Kishana Yogathasan',
  email = 'example@gmail.com',
  phone = '0775512445',
  gender = '',
  dateOfBirth = '',
  avatar,
  onBack,
  onEditAvatar,
  onPickCamera,
  onPickGallery,
  onRemoveProfile,
  onSaveName,
  onSaveGender,
  onSaveDateOfBirth,
  onFieldPress,
}: PersonalInformationScreenProps) {
  const insets = useSafeAreaInsets();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditFullname, setShowEditFullname] = useState(false);
  const [showEditGender, setShowEditGender] = useState(false);
  const [showEditDob, setShowEditDob] = useState(false);
  const [fullName, setFullName] = useState(name);
  const [draftName, setDraftName] = useState(name);
  const [selectedGender, setSelectedGender] = useState(gender);
  const [birthDate, setBirthDate] = useState(dateOfBirth);
  const [draftBirthDate, setDraftBirthDate] = useState(dateOfBirth);
  const dobInputRef = useRef<TextInput>(null);
  const initialGender = resolveGenderSelection(gender);
  const [draftGenderOption, setDraftGenderOption] = useState<GenderOption>(
    initialGender.option,
  );
  const [draftOtherGender, setDraftOtherGender] = useState(
    initialGender.otherText,
  );

  const fields: InfoField[] = [
    {
      id: 'fullName',
      label: 'Fullname',
      value: fullName,
      icon: require('../../assets/profile/personal/name.png'),
    },
    {
      id: 'email',
      label: 'Email Address',
      value: email,
      icon: require('../../assets/profile/personal/email.png'),
    },
    {
      id: 'phone',
      label: 'Phone number',
      value: phone,
      icon: require('../../assets/profile/personal/phone.png'),
    },
    {
      id: 'gender',
      label: 'Gender',
      value: selectedGender,
      placeholder: 'Add your gender',
      icon: require('../../assets/profile/personal/gender.png'),
    },
    {
      id: 'dateOfBirth',
      label: 'Date of Birth',
      value: birthDate,
      placeholder: 'Add your date of birth',
      icon: require('../../assets/profile/personal/calendar.png'),
    },
  ];

  const openEditProfile = () => {
    setShowEditProfile(true);
    onEditAvatar?.();
  };

  const closeEditProfile = () => setShowEditProfile(false);

  const openEditFullname = () => {
    setDraftName(fullName);
    setShowEditFullname(true);
  };

  const closeEditFullname = () => setShowEditFullname(false);

  const handleSaveFullname = () => {
    const next = draftName.trim();
    if (!next) {
      return;
    }
    setFullName(next);
    onSaveName?.(next);
    closeEditFullname();
  };

  const openEditGender = () => {
    const next = resolveGenderSelection(selectedGender);
    setDraftGenderOption(next.option);
    setDraftOtherGender(next.otherText);
    setShowEditGender(true);
  };

  const closeEditGender = () => setShowEditGender(false);

  const handleSaveGender = () => {
    const next =
      draftGenderOption === 'Other'
        ? draftOtherGender.trim() || 'Other'
        : draftGenderOption;
    setSelectedGender(next);
    onSaveGender?.(next);
    closeEditGender();
  };

  const openEditDob = () => {
    setDraftBirthDate(formatDateOfBirth(birthDate));
    setShowEditDob(true);
  };

  const closeEditDob = () => setShowEditDob(false);

  const handleSaveDob = () => {
    const next = draftBirthDate.trim();
    if (next.length < 10) {
      return;
    }
    setBirthDate(next);
    onSaveDateOfBirth?.(next);
    closeEditDob();
  };

  const handleFieldPress = (fieldId: string) => {
    if (fieldId === 'fullName') {
      openEditFullname();
    }
    if (fieldId === 'gender') {
      openEditGender();
    }
    if (fieldId === 'dateOfBirth') {
      openEditDob();
    }
    onFieldPress?.(fieldId);
  };

  const handlePick = (source: EditSource) => {
    closeEditProfile();
    if (source === 'camera') {
      onPickCamera?.();
      return;
    }
    onPickGallery?.();
  };

  const handleRemoveProfile = () => {
    closeEditProfile();
    onRemoveProfile?.();
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header
        title="Personal Information"
        titleAlign="left"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <View style={styles.sheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 16) + 24 },
          ]}
        >
          <Pressable
            style={styles.avatarWrap}
            onPress={openEditProfile}
            accessibilityRole="button"
            accessibilityLabel="Edit profile photo"
          >
            <View style={styles.avatar}>
              {avatar ? (
                <Image
                  source={avatar}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={require('../../assets/profile/user.png')}
                  style={styles.avatarPlaceholderIcon}
                  resizeMode="contain"
                />
              )}
            </View>
            <View style={styles.avatarBadge}>
              <Image
                source={require('../../assets/profile/personal/edit-badge.png')}
                style={styles.avatarBadgeIcon}
                resizeMode="contain"
              />
            </View>
          </Pressable>

          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.fields}>
            {fields.map((field) => {
              const displayValue = field.value?.trim();
              const isPlaceholder = !displayValue;

              return (
                <Pressable
                  key={field.id}
                  style={styles.fieldRow}
                  onPress={() => handleFieldPress(field.id)}
                >
                  <View style={styles.fieldIconSlot}>
                    <Image
                      source={field.icon}
                      style={styles.fieldIcon}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={styles.fieldCopy}>
                    <Text style={styles.fieldLabel}>{field.label}</Text>
                    <Text
                      style={[
                        styles.fieldValue,
                        isPlaceholder && styles.fieldPlaceholder,
                      ]}
                      numberOfLines={1}
                    >
                      {displayValue || field.placeholder}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <Modal
        visible={showEditProfile}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={closeEditProfile}
      >
        <View style={styles.editOverlay}>
          <Pressable style={styles.editBackdrop} onPress={closeEditProfile} />

          <View
            style={[
              styles.editSheet,
              { paddingBottom: Math.max(insets.bottom, 16) },
            ]}
          >
            <Text style={styles.editTitle}>Edit Profile</Text>

            <View style={styles.editOptions}>
              <Pressable
                style={styles.editOption}
                onPress={() => handlePick('camera')}
                accessibilityRole="button"
              >
                <Image
                  source={require('../../assets/profile/personal/camera.png')}
                  style={styles.editOptionIcon}
                  resizeMode="contain"
                />
                <Text style={styles.editOptionLabel}>Camera</Text>
              </Pressable>

              <Pressable
                style={styles.editOption}
                onPress={() => handlePick('gallery')}
                accessibilityRole="button"
              >
                <Image
                  source={require('../../assets/profile/personal/gallery.png')}
                  style={styles.editOptionIcon}
                  resizeMode="contain"
                />
                <Text style={styles.editOptionLabel}>Gallery</Text>
              </Pressable>

              {avatar ? (
                <Pressable
                  style={styles.editOption}
                  onPress={handleRemoveProfile}
                  accessibilityRole="button"
                >
                  <Image
                    source={require('../../assets/profile/personal/remove.png')}
                    style={styles.editOptionIconDanger}
                    resizeMode="contain"
                  />
                  <Text style={[styles.editOptionLabel, styles.removeLabel]}>
                    Remove Profile
                  </Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showEditFullname}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={closeEditFullname}
      >
        <KeyboardAvoidingView
          style={styles.editOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable style={styles.editBackdrop} onPress={closeEditFullname} />

          <View
            style={[
              styles.nameSheet,
              { paddingBottom: Math.max(insets.bottom, 16) },
            ]}
          >
            <View style={styles.nameHandle} />

            <Text style={styles.nameTitle}>Edit full name</Text>

            <InputField
              label="Fullname"
              value={draftName}
              onChangeText={setDraftName}
              placeholder="Enter fullname"
              autoCapitalize="words"
              containerStyle={styles.nameInput}
            />

            <Button
              title="Save"
              onPress={handleSaveFullname}
              containerStyle={styles.saveButton}
              textStyle={styles.saveText}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={showEditGender}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={closeEditGender}
      >
        <KeyboardAvoidingView
          style={styles.editOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable style={styles.editBackdrop} onPress={closeEditGender} />

          <View
            style={[
              styles.genderSheet,
              { paddingBottom: Math.max(insets.bottom, 16) },
            ]}
          >
            <Text style={styles.genderTitle}>Edit Gender</Text>

            <View style={styles.genderList}>
              {GENDER_OPTIONS.map((option) => {
                const active = draftGenderOption === option;

                return (
                  <View key={option} style={styles.genderOptionWrap}>
                    <Pressable
                      accessibilityRole="radio"
                      accessibilityState={{ selected: active }}
                      onPress={() => setDraftGenderOption(option)}
                      style={[
                        styles.genderOption,
                        active && styles.genderOptionActive,
                      ]}
                    >
                      <View
                        style={[
                          styles.radioOuter,
                          active && styles.radioOuterActive,
                        ]}
                      >
                        {active ? <View style={styles.radioInner} /> : null}
                      </View>
                      <Text style={styles.genderOptionLabel}>{option}</Text>
                    </Pressable>

                    {option === 'Other' && active ? (
                      <TextInput
                        value={draftOtherGender}
                        onChangeText={setDraftOtherGender}
                        placeholder="Type here..."
                        placeholderTextColor={COLORS.placeholder}
                        style={styles.otherInput}
                      />
                    ) : null}
                  </View>
                );
              })}
            </View>

            <Button
              title="Save"
              onPress={handleSaveGender}
              containerStyle={styles.saveButton}
              textStyle={styles.saveText}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={showEditDob}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={closeEditDob}
      >
        <KeyboardAvoidingView
          style={styles.editOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable style={styles.editBackdrop} onPress={closeEditDob} />

          <View
            style={[
              styles.dobSheet,
              { paddingBottom: Math.max(insets.bottom, 16) },
            ]}
          >
            <View style={styles.nameHandle} />

            <Text style={styles.dobTitle}>Edit Date of birth</Text>

            <Text style={styles.dobLabel}>Date of birth</Text>

            <Pressable
              style={styles.dobInputRow}
              onPress={() => dobInputRef.current?.focus()}
            >
              <TextInput
                ref={dobInputRef}
                value={draftBirthDate}
                onChangeText={(text) =>
                  setDraftBirthDate(formatDateOfBirth(text))
                }
                placeholder="DD/MM/YYYY"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="number-pad"
                maxLength={10}
                style={styles.dobInput}
              />
              <Image
                source={require('../../assets/profile/personal/calendar-input.png')}
                style={styles.dobInputIcon}
                resizeMode="contain"
              />
            </Pressable>

            <Button
              title="Save"
              onPress={handleSaveDob}
              containerStyle={styles.dobSaveButton}
              textStyle={styles.saveText}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  },
  scrollContent: {
    width: '100%',
    paddingHorizontal: '4.3%',
    // Pull avatar up so it overlaps the green header edge
    paddingTop: 0,
    alignItems: 'center',
  },
  avatarWrap: {
    width: 80,
    height: 80,
    marginTop: 20,
    marginBottom: 26,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholderIcon: {
    width: '48%',
    height: '48%',
    tintColor: COLORS.label,
  },
  avatarBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: 'transparent',
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarBadgeIcon: {
    width: 22,
    height: 22,
  },
  sectionTitle: {
    width: '100%',
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.section,
    marginBottom: 6,
    marginTop: 4,
  },
  fields: {
    width: '100%',
    gap: 4,
  },
  fieldRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 50,
    paddingVertical: 6,
  },
  fieldIconSlot: {
    width: '4.8%',
    minWidth: 18,
    maxWidth: 22,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldIcon: {
    width: '100%',
    height: '100%',
    tintColor: COLORS.icon,
  },
  fieldCopy: {
    flex: 1,
    gap: 2,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.label,
    lineHeight: 18,
  },
  fieldValue: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.value,
    lineHeight: 18,
  },
  fieldPlaceholder: {
    color: COLORS.placeholder,
  },
  editOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.overlay,
  },
  editBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  editSheet: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: '4.3%',
    paddingHorizontal: 0,
    gap: 8,
  },
  editTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  editOptions: {
    width: '100%',
    gap: 10,
  },
  editOption: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: 38,
    borderRadius: 12,
  },
  editOptionIcon: {
    width: 18,
    height: 18,
    tintColor: COLORS.text,
  },
  editOptionIconDanger: {
    width: 18,
    height: 18,
  },
  editOptionLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.text,
    lineHeight: 18,
  },
  removeLabel: {
    color: COLORS.danger,
  },
  nameSheet: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: '4.5%',
    paddingTop: 12,
    gap: 24,
    alignItems: 'center',
  },
  nameHandle: {
    width: 40,
    height: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(242, 242, 243, 1)',
    marginBottom: 4,
  },
  nameTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
    width: '100%',
  },
  nameInput: {
    width: '100%',
  },
  saveButton: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
    marginBottom: 8,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.white,
  },
  genderSheet: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: '4.5%',
    paddingTop: 24,
    gap: 16,
  },
  genderTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  genderList: {
    width: '100%',
    gap: 10,
  },
  genderOptionWrap: {
    width: '100%',
    gap: 8,
  },
  genderOption: {
    width: '100%',
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderIdle,
    backgroundColor: COLORS.white,
  },
  genderOptionActive: {
    borderColor: COLORS.primary,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: COLORS.borderIdle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  genderOptionLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.text,
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  otherInput: {
    width: '100%',
    height: 51,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 16,
    fontSize: 14,
    color: COLORS.text,
  },
  dobSheet: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: '4.5%',
    paddingTop: 12,
    alignItems: 'center',
  },
  dobTitle: {
    width: '100%',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 24,
  },
  dobLabel: {
    width: '100%',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    lineHeight: 21,
    letterSpacing: 0.3,
    marginTop: 20,
  },
  dobInputRow: {
    width: '100%',
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
  },
  dobInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    padding: 0,
  },
  dobInputIcon: {
    width: 20,
    height: 20,
  },
  dobSaveButton: {
    width: '100%',
    height: 52,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    marginTop: 30,
    marginBottom: 14,
  },
});
