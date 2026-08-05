import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
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
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(0, 0, 0, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  border: 'rgba(229, 231, 235, 1)',
  inputBg: 'rgba(242, 242, 243, 1)',
  mapBg: 'rgba(232, 245, 240, 1)',
  mapRoad: 'rgba(255, 255, 255, 1)',
  overlay: 'rgba(0, 0, 0, 0.45)',
};

const LABEL_OPTIONS = ['Home', 'Flat', 'Office', 'Hotel', 'Other'] as const;
type LabelOption = (typeof LABEL_OPTIONS)[number];

export type AddLocationData = {
  label: string;
  flatHouseNo: string;
  streetRoad: string;
  landmark: string;
  city: string;
  specialInstructions: string;
};

type AddLocationScreenProps = {
  onBack?: () => void;
  onSave?: (data: AddLocationData) => void;
  onExpandMap?: () => void;
  onLocateMe?: () => void;
};

export default function AddLocationScreen({
  onBack,
  onSave,
  onExpandMap,
  onLocateMe,
}: AddLocationScreenProps) {
  const insets = useSafeAreaInsets();
  const [label, setLabel] = useState('');
  const [flatHouseNo, setFlatHouseNo] = useState('');
  const [streetRoad, setStreetRoad] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showLabelSheet, setShowLabelSheet] = useState(false);
  const [sheetLabel, setSheetLabel] = useState<LabelOption>('Home');
  const [otherLabel, setOtherLabel] = useState('');

  const keyboardOffset = insets.top + 56;

  const openLabelSheet = () => {
    const preset = LABEL_OPTIONS.find((option) => option === label);
    if (preset) {
      setSheetLabel(preset);
      setOtherLabel('');
    } else if (label) {
      setSheetLabel('Other');
      setOtherLabel(label);
    } else {
      setSheetLabel('Home');
      setOtherLabel('');
    }
    setShowLabelSheet(true);
  };

  const closeLabelSheet = () => {
    setShowLabelSheet(false);
  };

  const handleLabelSave = () => {
    const resolvedLabel =
      sheetLabel === 'Other' ? otherLabel.trim() || 'Other' : sheetLabel;
    setLabel(resolvedLabel);
    closeLabelSheet();
  };

  const handleSave = () => {
    onSave?.({
      label,
      flatHouseNo,
      streetRoad,
      landmark,
      city,
      specialInstructions,
    });
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Add location"
        showBack
        onBack={onBack}
        backgroundColor={COLORS.primary}
      />

      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={keyboardOffset}
      >
        <View style={styles.sheet}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            automaticallyAdjustKeyboardInsets
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: Math.max(insets.bottom, 24) + 16 },
            ]}
          >
            <View style={styles.mapWrap}>
              <View style={styles.mapPlaceholder}>
                <View style={styles.mapRoadH} />
                <View style={styles.mapRoadV} />
                <View style={[styles.mapBlock, styles.mapBlockOne]} />
                <View style={[styles.mapBlock, styles.mapBlockTwo]} />
                <View style={styles.mapPin}>
                  <Ionicons name="location" size={28} color={COLORS.primary} />
                </View>
              </View>

              <Pressable
                style={styles.mapActionTop}
                onPress={onExpandMap}
                hitSlop={6}
              >
                <Ionicons name="scan-outline" size={20} color={COLORS.text} />
              </Pressable>

              <Pressable
                style={styles.mapActionBottom}
                onPress={onLocateMe}
                hitSlop={6}
              >
                <Ionicons name="locate" size={20} color={COLORS.primary} />
              </Pressable>
            </View>

            <View style={styles.form}>
              <InputField
                label="Label"
                variant="select"
                placeholder="Select"
                value={label}
                onPress={openLabelSheet}
                rightImage={require('../../assets/label-select.png')}
              />

              <InputField
                label="Flat, House No."
                placeholder="eg: 24/7"
                value={flatHouseNo}
                onChangeText={setFlatHouseNo}
              />

              <InputField
                label="Street/Road"
                placeholder="eg: Standley 123"
                value={streetRoad}
                onChangeText={setStreetRoad}
              />

              <InputField
                label="Landmark"
                placeholder="eg: Near Pizza Hut"
                value={landmark}
                onChangeText={setLandmark}
              />

              <InputField
                label="City"
                placeholder="eg: Berlin"
                value={city}
                onChangeText={setCity}
              />

              <InputField
                label="Special Instructions"
                variant="textarea"
                placeholder="eg: Ring bell, 3rd floor......"
                value={specialInstructions}
                onChangeText={setSpecialInstructions}
              />
            </View>

            <View style={styles.footer}>
              <Button
                title="Save"
                onPress={handleSave}
                containerStyle={styles.saveButton}
                textStyle={styles.saveButtonText}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <Modal
        visible={showLabelSheet}
        transparent
        animationType="slide"
        statusBarTranslucent
        onRequestClose={closeLabelSheet}
      >
        <KeyboardAvoidingView
          style={styles.modalRoot}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Pressable style={styles.overlay} onPress={closeLabelSheet} />

          <View
            style={[
              styles.labelSheet,
              { paddingBottom: Math.max(insets.bottom, 16) },
            ]}
          >
            <Text style={styles.sheetTitle}>Select label</Text>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              automaticallyAdjustKeyboardInsets
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.sheetContent}
            >
              {LABEL_OPTIONS.map((option) => {
                const isSelected = sheetLabel === option;

                return (
                  <View key={option}>
                    <Pressable
                      accessibilityRole="radio"
                      accessibilityState={{ selected: isSelected }}
                      onPress={() => setSheetLabel(option)}
                      style={[
                        styles.labelRow,
                        isSelected && styles.labelRowSelected,
                      ]}
                    >
                      <View
                        style={[
                          styles.radioOuter,
                          isSelected && styles.radioOuterSelected,
                        ]}
                      >
                        {isSelected ? <View style={styles.radioInner} /> : null}
                      </View>
                      <Text style={styles.labelOptionText}>{option}</Text>
                    </Pressable>

                    {option === 'Other' && isSelected ? (
                      <TextInput
                        value={otherLabel}
                        onChangeText={setOtherLabel}
                        placeholder="Type here..."
                        placeholderTextColor={COLORS.muted}
                        style={styles.otherInput}
                        autoFocus
                      />
                    ) : null}
                  </View>
                );
              })}
            </ScrollView>

            <Button
              title="Save"
              onPress={handleLabelSave}
              containerStyle={styles.sheetSaveButton}
              textStyle={styles.saveButtonText}
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
  body: {
    flex: 1,
  },
  sheet: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: '4.5%',
    paddingTop: 20,
    gap: 20,
  },
  mapWrap: {
    width: '100%',
    aspectRatio: 400 / 160,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: COLORS.mapBg,
    overflow: 'hidden',
  },
  mapRoadH: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    height: '6%',
    backgroundColor: COLORS.mapRoad,
  },
  mapRoadV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '38%',
    width: '2.5%',
    backgroundColor: COLORS.mapRoad,
  },
  mapBlock: {
    position: 'absolute',
    borderRadius: 6,
    backgroundColor: '#C8E6D8',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  mapBlockOne: {
    top: '15%',
    left: '6%',
    width: '16%',
    height: '30%',
  },
  mapBlockTwo: {
    bottom: '17%',
    right: '12.5%',
    width: '20%',
    height: '35%',
  },
  mapPin: {
    position: 'absolute',
    top: '38%',
    left: '52%',
    transform: [{ translateX: -14 }, { translateY: -14 }],
  },
  mapActionTop: {
    position: 'absolute',
    top: '7%',
    right: '3%',
    width: '10%',
    aspectRatio: 1,
    maxWidth: 44,
    minWidth: 36,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  mapActionBottom: {
    position: 'absolute',
    bottom: '7%',
    right: '3%',
    width: '10%',
    aspectRatio: 1,
    maxWidth: 44,
    minWidth: 36,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  form: {
    gap: 16,
  },
  footer: {
    paddingTop: 8,
  },
  saveButton: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  labelSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: '4.5%',
    paddingTop: 20,
    maxHeight: '70%',
  },
  sheetTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  sheetContent: {
    gap: 10,
    paddingBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 48,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  labelRowSelected: {
    borderColor: COLORS.primary,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  labelOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  otherInput: {
    height: 51,
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: '4.5%',
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    fontSize: 14,
    color: COLORS.text,
  },
  sheetSaveButton: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  },
});
