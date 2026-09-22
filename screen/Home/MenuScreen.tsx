import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SideBar, {
  SideBarBrand,
  SideBarCategory,
  SideBarSubCategory,
} from '../../componets/layout/SideBar';

const COLORS = {
  white: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.35)',
};

type MenuScreenProps = {
  activeCategoryId?: string | null;
  activeSubCategoryId?: string | null;
  onBack?: () => void;
  onCategoryPress?: (category: SideBarCategory) => void;
  onSubCategoryPress?: (
    category: SideBarCategory,
    subCategory: SideBarSubCategory,
  ) => void;
  onBrandPress?: (brand: SideBarBrand) => void;
};

/**
 * Figma "Menu" page = SideBar categories / brands menu.
 */
export default function MenuScreen({
  activeCategoryId = 'dairy',
  activeSubCategoryId = 'milk',
  onBack,
  onCategoryPress,
  onSubCategoryPress,
  onBrandPress,
}: MenuScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      <View style={styles.backdrop} />
      <SideBar
        asModal={false}
        visible
        activeCategoryId={activeCategoryId}
        activeSubCategoryId={activeSubCategoryId}
        onBack={onBack}
        onClose={onBack}
        onCategoryPress={onCategoryPress}
        onSubCategoryPress={onSubCategoryPress}
        onBrandPress={onBrandPress}
        style={styles.menuSidebar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    left: 214,
    backgroundColor: COLORS.overlay,
  },
  menuSidebar: {
    width: 214,
    maxWidth: 214,
    minWidth: 214,
    backgroundColor: COLORS.white,
    zIndex: 2,
  },
});
