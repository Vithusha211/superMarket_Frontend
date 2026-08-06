import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Footer, { FooterTab } from '../../componets/layout/Footer';
import Header from '../../componets/layout/Header';
import PopupMessage from '../../componets/layout/PopupMessage';

const COLORS = {
  primary: 'rgba(1, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  text: 'rgba(0, 0, 0, 1)',
  sectionTitle: 'rgba(114, 120, 138, 1)',
  muted: 'rgba(114, 120, 128, 1)',
  avatarBg: 'rgba(229, 231, 235, 1)',
  danger: 'rgba(235, 87, 87, 1)',
  icon: 'rgba(0, 0, 0, 1)',
};

type MenuAction =
  | 'address'
  | 'language'
  | 'changePassword'
  | 'deleteAccount'
  | 'helpCenter'
  | 'aboutUs'
  | 'privacyPolicy'
  | 'termsOfService'
  | 'logout'
  | 'profile';

type MenuItem = {
  id: MenuAction;
  label: string;
  icon: ImageSourcePropType;
  danger?: boolean;
  keepIconColor?: boolean;
  value?: string;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const SECTIONS: MenuSection[] = [
  {
    title: 'Saved Locations',
    items: [
      {
        id: 'address',
        label: 'Address',
        icon: require('../../assets/profile/address.png'),
      },
    ],
  },
  {
    title: 'Preferences',
    items: [
      {
        id: 'language',
        label: 'Language',
        icon: require('../../assets/profile/language.png'),
        value: 'English',
      },
    ],
  },
  {
    title: 'Security',
    items: [
      {
        id: 'changePassword',
        label: 'Change Password',
        icon: require('../../assets/profile/password.png'),
      },
      {
        id: 'deleteAccount',
        label: 'Delete Account',
        icon: require('../../assets/profile/delete.png'),
        danger: true,
        keepIconColor: true,
      },
    ],
  },
  {
    title: 'Support & Information',
    items: [
      {
        id: 'helpCenter',
        label: 'Help Center',
        icon: require('../../assets/profile/help.png'),
      },
      {
        id: 'aboutUs',
        label: 'About us',
        icon: require('../../assets/profile/about.png'),
      },
      {
        id: 'privacyPolicy',
        label: 'Privacy policy',
        icon: require('../../assets/profile/privacy.png'),
      },
      {
        id: 'termsOfService',
        label: 'Terms of service',
        icon: require('../../assets/profile/terms.png'),
      },
      {
        id: 'logout',
        label: 'Logout',
        icon: require('../../assets/profile/logout.png'),
        danger: true,
        keepIconColor: true,
      },
    ],
  },
];

type ProfileScreenProps = {
  name?: string;
  phone?: string;
  email?: string;
  language?: string;
  onMenuPress?: (action: MenuAction) => void;
  onLogoutConfirm?: () => void;
  onTabPress?: (tab: FooterTab) => void;
};

export default function ProfileScreen({
  name = 'Kishana Aloe',
  phone = '07755112245',
  email = 'example@gmail.com',
  language = 'English',
  onMenuPress,
  onLogoutConfirm,
  onTabPress,
}: ProfileScreenProps) {
  const insets = useSafeAreaInsets();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleMenuPress = (action: MenuAction) => {
    if (action === 'logout') {
      setShowLogoutPopup(true);
      return;
    }
    onMenuPress?.(action);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header title="Account" backgroundColor={COLORS.primary} />

      <View style={styles.sheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 16) + 88 },
          ]}
        >
          <Pressable
            style={styles.profileRow}
            onPress={() => handleMenuPress('profile')}
          >
            <View style={styles.avatar}>
              <Image
                source={require('../../assets/profile/user.png')}
                style={styles.avatarIcon}
                resizeMode="contain"
              />
            </View>
            <View style={styles.profileCopy}>
              <Text style={styles.profileName} numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.profileMeta} numberOfLines={1}>
                {phone}
              </Text>
              <Text style={styles.profileMeta} numberOfLines={1}>
                {email}
              </Text>
            </View>
          </Pressable>

          {SECTIONS.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionList}>
                {section.items.map((item) => {
                  const labelColor = item.danger
                    ? COLORS.danger
                    : COLORS.text;
                  const value =
                    item.id === 'language' ? language : item.value;
                  const isLanguage = item.id === 'language';

                  return (
                    <Pressable
                      key={item.id}
                      style={styles.row}
                      onPress={() => handleMenuPress(item.id)}
                    >
                      <View style={styles.rowLeft}>
                        <Image
                          source={item.icon}
                          style={[
                            styles.rowIcon,
                            !item.keepIconColor && {
                              tintColor: item.danger
                                ? COLORS.danger
                                : COLORS.icon,
                            },
                          ]}
                          resizeMode="contain"
                        />
                        {isLanguage ? (
                          <View style={styles.languageCopy}>
                            <Text style={styles.languageLabel}>
                              {item.label}
                            </Text>
                            <Text style={styles.languageValue}>{value}</Text>
                          </View>
                        ) : (
                          <Text
                            style={[styles.rowLabel, { color: labelColor }]}
                          >
                            {item.label}
                          </Text>
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View
        style={[
          styles.footerWrap,
          { paddingBottom: Math.max(insets.bottom, 0) },
        ]}
      >
        <Footer activeTab="profile" onTabPress={(tab) => onTabPress?.(tab)} />
      </View>

      <PopupMessage
        visible={showLogoutPopup}
        variant="confirm"
        message="Confirm the logging out by clicking 'yes'."
        cancelLabel="No"
        confirmLabel="Yes"
        onCancel={() => setShowLogoutPopup(false)}
        onClose={() => setShowLogoutPopup(false)}
        onConfirm={() => {
          setShowLogoutPopup(false);
          onLogoutConfirm?.();
        }}
      />
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
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 8,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    width: 22,
    height: 22,
    tintColor: COLORS.muted,
  },
  profileCopy: {
    flex: 1,
    gap: 2,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  profileMeta: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.muted,
  },
  section: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.sectionTitle,
    paddingTop: 10,
    paddingBottom: 10,
  },
  sectionList: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    minHeight: 38,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  rowIcon: {
    width: 18,
    height: 18,
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  languageCopy: {
    gap: 2,
  },
  languageLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.muted,
    lineHeight: 18,
  },
  languageValue: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 15,
  },
  footerWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.white,
  },
});
