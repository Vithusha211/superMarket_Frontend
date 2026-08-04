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
  menuSidebar: {
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
