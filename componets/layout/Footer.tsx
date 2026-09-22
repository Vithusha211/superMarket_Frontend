import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  white: 'rgba(255, 255, 255, 1)',
  inactive: 'rgba(156, 163, 175, 1)',
  border: 'rgba(229, 231, 235, 1)',
};

export type FooterTab = 'home' | 'orders' | 'cart' | 'profile';

type TabConfig = {
  key: FooterTab;
  icon: ImageSourcePropType;
  activeIcon?: ImageSourcePropType;
  label: string;
};

const TABS: TabConfig[] = [
  {
    key: 'home',
    icon: require('../../assets/footer/home.png'),
    activeIcon: require('../../assets/footer/home-active.png'),
    label: 'Home',
  },
  {
    key: 'cart',
    icon: require('../../assets/footer/cart.png'),
    activeIcon: require('../../assets/footer/cart-active.png'),
    label: 'Cart',
  },
  {
    key: 'orders',
    icon: require('../../assets/footer/orders.png'),
    activeIcon: require('../../assets/footer/orders-active.png'),
    label: 'Orders',
  },
  {
    key: 'profile',
    icon: require('../../assets/footer/profile.png'),
    activeIcon: require('../../assets/footer/profile-active.png'),
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
        const useFilledActive = isActive && !!tab.activeIcon;

        return (
          <Pressable
            key={tab.key}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
            onPress={() => onTabPress(tab.key)}
            style={styles.tab}
          >
            <View style={styles.iconWrap}>
              <Image
                source={useFilledActive ? tab.activeIcon! : tab.icon}
                style={[
                  styles.icon,
                  !useFilledActive && {
                    tintColor: isActive ? COLORS.primary : COLORS.inactive,
                  },
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
    height: 68,
    paddingTop: 12,
    paddingBottom: 12,
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
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});
