import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  primary: 'rgba(7, 193, 135, 1)',
  activeBg: 'rgba(234, 243, 240, 0.35)',
  white: '#FFFFFF',
  text: 'rgba(0, 0, 0, 1)',
  muted: 'rgba(114, 130, 138, 1)',
  border: 'rgba(229, 231, 235, 1)',
  backBg: 'rgba(8, 9, 9, 0.44)',
  overlayLight: 'rgba(0, 0, 0, 0.35)',
};

export type SideBarSubCategory = {
  id: string;
  label: string;
};

export type SideBarCategory = {
  id: string;
  label: string;
  children?: SideBarSubCategory[];
};

export type SideBarBrand = {
  id: string;
  label: string;
};

const DEFAULT_CATEGORIES: SideBarCategory[] = [
  {
    id: 'dairy',
    label: 'Dairy',
    children: [
      { id: 'milk', label: 'Milk' },
      { id: 'yoghurt', label: 'Yoghurt' },
      { id: 'butter', label: 'Butter' },
      { id: 'cheese', label: 'Cheese' },
      { id: 'cream', label: 'Cream' },
      { id: 'dessert', label: 'Dessert' },
    ],
  },
  {
    id: 'beverage',
    label: 'Beverage',
    children: [
      { id: 'soft-drinks', label: 'Soft Drinks' },
      { id: 'energy-drinks', label: 'Energy Drinks' },
      { id: 'juice', label: 'Juice' },
      { id: 'water', label: 'Water' },
      { id: 'tea-coffee', label: 'Tea & Coffee' },
    ],
  },
  {
    id: 'fruits-vegetables',
    label: 'Fruits & Vegetables',
    children: [
      { id: 'fruits', label: 'Fruits' },
      { id: 'vegetables', label: 'Vegetables' },
      { id: 'herbs', label: 'Herbs' },
    ],
  },
  {
    id: 'frozen-foods',
    label: 'Frozen Foods',
    children: [
      { id: 'frozen-veg', label: 'Frozen Vegetables' },
      { id: 'ice-cream', label: 'Ice Cream' },
      { id: 'ready-meals', label: 'Ready Meals' },
    ],
  },
  {
    id: 'meat-seafoods',
    label: 'Meat & Sea foods',
    children: [
      { id: 'chicken', label: 'Chicken' },
      { id: 'beef', label: 'Beef' },
      { id: 'seafood', label: 'Seafood' },
    ],
  },
  {
    id: 'best-pharmacy',
    label: 'Best Pharmacy',
    children: [
      { id: 'vitamins', label: 'Vitamins' },
      { id: 'first-aid', label: 'First Aid' },
      { id: 'personal-care', label: 'Personal Care' },
    ],
  },
];

const DEFAULT_BRANDS: SideBarBrand[] = [
  { id: 'maliban', label: 'Maliban' },
  { id: 'magic', label: 'Magic' },
  { id: 'kotmalea', label: 'Kotmalea' },
];

type SideBarProps = {
  visible?: boolean;
  asModal?: boolean;
  categories?: SideBarCategory[];
  brands?: SideBarBrand[];
  activeCategoryId?: string | null;
  activeSubCategoryId?: string | null;
  onBack?: () => void;
  onClose?: () => void;
  onCategoryPress?: (category: SideBarCategory) => void;
  onSubCategoryPress?: (
    category: SideBarCategory,
    subCategory: SideBarSubCategory,
  ) => void;
  onBrandPress?: (brand: SideBarBrand) => void;
  style?: ViewStyle;
};

function SideBarContent({
  categories,
  brands,
  expandedId,
  activeCategoryId,
  activeSubCategoryId,
  onBack,
  onToggleCategory,
  onSubCategoryPress,
  onBrandPress,
  style,
  topInset,
}: {
  categories: SideBarCategory[];
  brands: SideBarBrand[];
  expandedId: string | null;
  activeCategoryId: string | null | undefined;
  activeSubCategoryId: string | null;
  onBack?: () => void;
  onToggleCategory: (category: SideBarCategory) => void;
  onSubCategoryPress?: (
    category: SideBarCategory,
    subCategory: SideBarSubCategory,
  ) => void;
  onBrandPress?: (brand: SideBarBrand) => void;
  style?: ViewStyle;
  topInset: number;
}) {
  return (
    <View style={[styles.container, { paddingTop: topInset + 12 }, style]}>
      <Pressable
        accessibilityRole="button"
        onPress={onBack}
        style={styles.backButton}
        hitSlop={8}
      >
        <Image
          source={require('../../assets/back-icon.png')}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </Pressable>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Shop by category</Text>

        <View style={styles.list}>
          {categories.map((category) => {
            const isExpanded = expandedId === category.id;
            const hasChildren = !!category.children?.length;
            const isActive = activeCategoryId === category.id;

            return (
              <View key={category.id}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isExpanded }}
                  onPress={() => onToggleCategory(category)}
                  style={[
                    styles.categoryItem,
                    isActive && styles.categoryActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryLabel,
                      isExpanded && styles.categoryLabelExpanded,
                    ]}
                    numberOfLines={1}
                  >
                    {category.label}
                  </Text>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color={COLORS.text}
                  />
                </Pressable>

                {isExpanded && hasChildren ? (
                  <View style={styles.subList}>
                    {category.children!.map((sub) => {
                      const isSubActive = activeSubCategoryId === sub.id;

                      return (
                        <Pressable
                          key={sub.id}
                          accessibilityRole="button"
                          accessibilityState={{ selected: isSubActive }}
                          onPress={() => onSubCategoryPress?.(category, sub)}
                          style={[
                            styles.subItem,
                            isSubActive && styles.subItemActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.subLabel,
                              isSubActive && styles.subLabelActive,
                            ]}
                          >
                            {sub.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>

        <Text style={[styles.sectionTitle, styles.brandSectionTitle]}>
          Shop by Brand
        </Text>

        <View style={styles.list}>
          {brands.map((brand) => (
            <Pressable
              key={brand.id}
              accessibilityRole="button"
              onPress={() => onBrandPress?.(brand)}
              style={styles.brandItem}
            >
              <Text style={styles.brandLabel}>{brand.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default function SideBar({
  visible = true,
  asModal = false,
  categories = DEFAULT_CATEGORIES,
  brands = DEFAULT_BRANDS,
  activeCategoryId,
  activeSubCategoryId = null,
  onBack,
  onClose,
  onCategoryPress,
  onSubCategoryPress,
  onBrandPress,
  style,
}: SideBarProps) {
  const insets = useSafeAreaInsets();
  const [expandedId, setExpandedId] = useState<string | null>(
    activeCategoryId ?? 'dairy',
  );
  const [selectedSubId, setSelectedSubId] = useState<string | null>(
    activeSubCategoryId ?? 'milk',
  );

  const resolvedSubId =
    activeSubCategoryId !== undefined && activeSubCategoryId !== null
      ? activeSubCategoryId
      : selectedSubId;

  const handleToggleCategory = (category: SideBarCategory) => {
    setExpandedId((prev) => (prev === category.id ? null : category.id));
    onCategoryPress?.(category);
  };

  const handleSubCategoryPress = (
    category: SideBarCategory,
    subCategory: SideBarSubCategory,
  ) => {
    setSelectedSubId(subCategory.id);
    onSubCategoryPress?.(category, subCategory);
  };

  const handleBack = () => {
    onBack?.();
    onClose?.();
  };

  const content = (
    <SideBarContent
      categories={categories}
      brands={brands}
      expandedId={expandedId}
      activeCategoryId={activeCategoryId}
      activeSubCategoryId={resolvedSubId}
      onBack={handleBack}
      onToggleCategory={handleToggleCategory}
      onSubCategoryPress={handleSubCategoryPress}
      onBrandPress={onBrandPress}
      style={style}
      topInset={asModal ? insets.top : 0}
    />
  );

  if (!asModal) {
    return content;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleBack}
    >
      <View style={styles.modalRoot}>
        <Pressable style={styles.overlay} onPress={handleBack} />
        {content}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    flexDirection: 'row',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlayLight,
  },
  container: {
    width: '48.5%',
    maxWidth: 240,
    minWidth: 200,
    height: '100%',
    backgroundColor: COLORS.white,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.backBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '7%',
    marginBottom: '6%',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  scrollContent: {
    paddingBottom: '6.5%',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    paddingHorizontal: '7%',
    marginBottom: 8,
  },
  brandSectionTitle: {
    marginTop: 18,
  },
  list: {
    width: '100%',
  },
  categoryItem: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: '7%',
    gap: 10,
  },
  categoryActive: {
    backgroundColor: COLORS.activeBg,
  },
  categoryLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.text,
  },
  categoryLabelExpanded: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  subList: {
    paddingBottom: 4,
  },
  subItem: {
    minHeight: 36,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: '12%',
  },
  subItemActive: {
    backgroundColor: COLORS.activeBg,
  },
  subLabel: {
    fontSize: 13,
    color: COLORS.muted,
  },
  subLabelActive: {
    color: COLORS.text,
    fontWeight: '500',
  },
  brandItem: {
    minHeight: 38,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: '7%',
  },
  brandLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.text,
  },
});
