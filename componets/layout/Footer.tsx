import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

const COLORS = {
  primary: '#10B981',
  white: '#FFFFFF',
  inactive: '#9CA3AF',
  border: '#E5E7EB',
};

export type FooterTab = 'home' | 'orders' | 'cart' | 'profile';

type TabConfig = {
  key: FooterTab;
  icon: ImageSourcePropType;
  label: string;
};

const TABS: TabConfig[] = [
  {
    key: 'home',
    icon: require('../../assets/footer/home.png'),
    label: 'Home',
  },
  {
    key: 'orders',
    icon: require('../../assets/footer/orders.png'),
    label: 'Orders',
  },
  {
    key: 'cart',
    icon: require('../../assets/footer/cart.png'),
    label: 'Cart',
  },
  {
    key: 'profile',
    icon: require('../../assets/footer/profile.png'),
    label: 'Profile',
  },
];

type FooterProps = {
  activeTab: FooterTab;
  onTabPress: (tab: FooterTab) => void;
  style?: ViewStyle;
};

export default function Footer({ activeTab, onTabPress, style }: FooterProps) {
  return (
    <View style={[styles.container, style]}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
            onPress={() => onTabPress(tab.key)}
            style={styles.tab}
          >
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <Image
                source={tab.icon}
                style={[
                  styles.icon,
                  { tintColor: isActive ? COLORS.white : COLORS.inactive },
                ]}
                resizeMode="contain"
              />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: 68,
    paddingTop: '4.5%',
    paddingBottom: '4.5%',
    paddingLeft: '6.8%',
    paddingRight: '7%',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
