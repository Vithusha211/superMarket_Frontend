import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddLocationScreen from './screen/Auth/AddLocationScreen';
import CountryCodeScreen, {
  CountryCodeOption,
} from './screen/Auth/CountryCodeScreen';
import CreateNewPasswordScreen from './screen/Auth/CreateNewPasswordScreen';
import EnableLocationScreen from './screen/Auth/EnableLocationScreen';
import EnterLocationScreen from './screen/Auth/EnterLocationScreen';
import ForgotPasswordScreen from './screen/Auth/ForgotPasswordScreen';
import GetStartedScreen from './screen/Auth/GetStartedScreen';
import HomeScreen from './screen/Home/HomeScreen';
import DairyScreen, { DairyProduct } from './screen/Home/DairyScreen';
import SearchScreen from './screen/Home/SearchScreen';
import ProductScreen, {
  ProductDetail,
} from './screen/Home/ProductDetailScreen';
import CartScreen from './screen/Home/CartScreen';
import PaymentScreen from './screen/Home/PaymentScreen';
import InvoiceScreen from './screen/Home/InvoiceScreen';
import OrderHistoryScreen from './screen/Home/OrderHistoryScreen';
import AddressScreen, { SavedAddress } from './screen/Home/AdressScreen';
import MenuScreen from './screen/Home/MenuScreen';
import BrandScreen, {
  BrandProduct,
  MALIBAN_PRODUCTS,
} from './screen/Home/BrandScreen';
import BrandsScreen from './screen/Home/BrandsScreen';
import BestOffersScreen, {
  OfferProduct,
} from './screen/Home/BestOffersScreen';
import CategoryScreen from './screen/Home/CategoryScreen';
import FruitsVegetablesScreen, {
  FruitProduct,
} from './screen/Home/FruitsVegetablesScreen';
import LanguageSelectScreen from './screen/Auth/LanguageSelectScreen';
import LoginScreen from './screen/Auth/LoginScreen';
import OnboardingScreen from './screen/Auth/OnboardingScreen';
import OTPScreen from './screen/Auth/OTPScreen';
import RegisterScreen from './screen/Auth/RegisterScreen';
import SplashScreen from './screen/Auth/SplashScreen';
import WelcomeScreen from './screen/Auth/WelcomeScreen';
import ProfileScreen from './screen/Profile/Profile';
import PersonalInformationScreen from './screen/Profile/PersonalInformation';
import ImageCropScreen from './screen/Profile/ImageCropScreen';
import EditPhoneNumberScreen, {
  VerificationChannel,
} from './screen/Profile/EditPhoneNumberScreen';
import ChangePasswordScreen from './screen/Profile/ChangePasswordScreen';
import DeleteAccountScreen from './screen/Profile/DeleteAccountScreen';
import HelpCenterScreen from './screen/Profile/HelpCenterScreen';
import InformationScreen, {
  InformationPage,
} from './screen/Profile/InformationScreen';
import NotificationScreen from './screen/notification';
import LanguageSheet, {
  PROFILE_LANGUAGES,
} from './screen/Profile/LanguageSheet';
import { ImageSourcePropType } from 'react-native';
import { ToastProvider, useToast } from './context/ToastContext';
import defaultCredentials from './data/defaultCredentials.json';

type AppScreen =
  | 'splash'
  | 'language'
  | 'onboarding'
  | 'welcome'
  | 'login'
  | 'signup'
  | 'countryCode'
  | 'emailOtp'
  | 'phoneOtp'
  | 'enableLocation'
  | 'address'
  | 'addLocation'
  | 'addressSelect'
  | 'getStarted'
  | 'home'
  | 'notification'
  | 'search'
  | 'categories'
  | 'brands'
  | 'bestOffers'
  | 'dairy'
  | 'fruits'
  | 'menu'
  | 'brand'
  | 'product'
  | 'cart'
  | 'payment'
  | 'invoice'
  | 'orderHistory'
  | 'forgotPassword'
  | 'createNewPassword'
  | 'account'
  | 'personalInformation'
  | 'editPhoneNumber'
  | 'editPhoneOtp'
  | 'changePassword'
  | 'changePasswordOtp'
  | 'deleteAccount'
  | 'helpCenter'
  | 'information'
  | 'imageCrop';
/** Where address/add-location should return after finish */
type AddressFlow = 'onboarding' | 'change' | 'addFromSelect';

function AppContent() {
  const { showSuccess, showError } = useToast();
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [informationPage, setInformationPage] =
    useState<InformationPage>('About us');
  const [signupEmail, setSignupEmail] = useState('user@gmail.com');
  const [signupPhone, setSignupPhone] = useState('1234565657');
  const [registeredCredentials, setRegisteredCredentials] = useState({
    username: defaultCredentials.username,
    password: defaultCredentials.password,
  });
  const [forgotEmail, setForgotEmail] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [cartSubtotal, setCartSubtotal] = useState(25);
  const [deliveryAddress, setDeliveryAddress] = useState(
    '102 St Marks Pl, New York',
  );
  const [addressFlow, setAddressFlow] = useState<AddressFlow>('onboarding');
  const [productReturnTo, setProductReturnTo] = useState<AppScreen>('dairy');
  const [cartReturnTo, setCartReturnTo] = useState<AppScreen>('home');
  const [menuReturnTo, setMenuReturnTo] = useState<AppScreen>('dairy');
  const [brandReturnTo, setBrandReturnTo] = useState<AppScreen>('menu');
  const [languageReturnTo, setLanguageReturnTo] = useState<AppScreen>('welcome');
  const [passwordReturnTo, setPasswordReturnTo] =
    useState<AppScreen>('forgotPassword');
  const [profilePasswordOtpReturnTo, setProfilePasswordOtpReturnTo] =
    useState<AppScreen>('changePassword');
  const [addressSelectReturnTo, setAddressSelectReturnTo] =
    useState<AppScreen>('cart');
  const [invoiceReturnTo, setInvoiceReturnTo] =
    useState<AppScreen>('home');
  const [appLanguage, setAppLanguage] = useState(PROFILE_LANGUAGES[1]);
  const [showLanguageSheet, setShowLanguageSheet] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState<
    ImageSourcePropType | undefined
  >(undefined);
  const [accountPhone, setAccountPhone] = useState('0775512445');
  const [pendingPhone, setPendingPhone] = useState('0775512445');
  const [phoneVerificationChannel, setPhoneVerificationChannel] =
    useState<VerificationChannel>('email');
  const [countryCodeReturnTo, setCountryCodeReturnTo] = useState<
    'signup' | 'editPhoneNumber'
  >('signup');
  const [cropImage, setCropImage] = useState<ImageSourcePropType>(
    require('./assets/profile/personal/crop-sample.png'),
  );
  const [selectedBrand, setSelectedBrand] = useState({
    id: 'maliban',
    label: 'Maliban',
  });

  const pickProfileImage = async (source: 'camera' | 'gallery') => {
    try {
      if (source === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          showError('Camera permission is required to take a profile photo.');
          return;
        }
      } else {
        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          showError('Photo library permission is required to choose a profile photo.');
          return;
        }
      }

      const result =
        source === 'camera'
          ? await ImagePicker.launchCameraAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

      if (!result.canceled && result.assets[0]) {
        setCropImage({ uri: result.assets[0].uri });
        setScreen('imageCrop');
      }
    } catch {
      showError('Unable to select a profile photo. Please try again.');
    }
  };
  const [menuCategoryId, setMenuCategoryId] = useState<string | null>('dairy');
  const [menuSubCategoryId, setMenuSubCategoryId] = useState<string | null>(
    'milk',
  );
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail>({
    id: 'fresh-milk',
    title: 'Fresh Milk',
    category: 'Dairy',
    brand: 'Ambewela',
    quantityLabel: '1l',
    price: 12,
    oldPrice: 15,
    discount: 20,
    description:
      'Fresh full cream milk sourced daily. Rich in calcium and vitamins for your everyday nutrition.',
    image: require('./assets/search/product-ambewela.png'),
  });

  const openBrand = (from: AppScreen, brand: { id: string; label: string }) => {
    setSelectedBrand(brand);
    setBrandReturnTo(from);
    setScreen('brand');
  };

  const openCategory = (id: string) => {
    if (id === 'dairy') {
      setScreen('dairy');
    } else if (id === 'fruits') {
      setScreen('fruits');
    } else {
      setScreen('search');
    }
  };

  const [selectedCountry, setSelectedCountry] = useState<CountryCodeOption>({
    id: 'de',
    label: 'Deutsch',
    flag: '🇩🇪',
    code: '+49',
  });

  const openProduct = (from: AppScreen, product?: Partial<ProductDetail>) => {
    setProductReturnTo(from);
    if (product) {
      setSelectedProduct((prev: ProductDetail) => ({ ...prev, ...product }));
    }
    setScreen('product');
  };

  const finishAddLocation = () => {
    // Signup first-time address → Get Started
    if (addressFlow === 'onboarding') {
      setScreen('getStarted');
      return;
    }
    // Profile address flow (Figma: Save → My profile)
    if (addressSelectReturnTo === 'account') {
      setScreen('account');
      return;
    }
    // Cart change / Add New Address (Figma: Save → Cart)
    setScreen('cart');
  };

  const backFromEnterLocation = () => {
    if (addressFlow === 'onboarding') {
      setScreen('enableLocation');
      return;
    }
    if (addressFlow === 'addFromSelect' || addressFlow === 'change') {
      setScreen('addressSelect');
      return;
    }
    setScreen('cart');
  };

  const backFromAddLocation = () => {
    if (addressFlow === 'addFromSelect') {
      setScreen('addressSelect');
      return;
    }
    if (addressFlow === 'change') {
      setScreen('addressSelect');
      return;
    }
    setScreen('address');
  };

  return (
    <>
      {screen === 'splash' ? (
        <SplashScreen
          onPress={() => {
            setLanguageReturnTo('welcome');
            setScreen('language');
          }}
        />
      ) : screen === 'language' ? (
        <LanguageSelectScreen
          onSelect={(language) => {
            const match = PROFILE_LANGUAGES.find(
              (item) => item.id === language.id,
            );
            if (match) setAppLanguage(match);
            setScreen(languageReturnTo);
          }}
        />
      ) : screen === 'onboarding' ? (
        <OnboardingScreen
          onSkip={() => setScreen('welcome')}
          onFinish={() => setScreen('welcome')}
        />
      ) : screen === 'welcome' ? (
        <WelcomeScreen
          onLogin={() => setScreen('login')}
          onCreateAccount={() => setScreen('signup')}
        />
      ) : screen === 'login' ? (
        <LoginScreen
          onSignUp={() => setScreen('signup')}
          onContinue={({ email, password }) => {
            const normalizedEmail = email.trim().toLowerCase();
            const isDefaultAccount =
              normalizedEmail === defaultCredentials.username.toLowerCase() &&
              password === defaultCredentials.password;
            const isRegisteredAccount =
              normalizedEmail === registeredCredentials.username.toLowerCase() &&
              password === registeredCredentials.password;
            const isAuthenticated = isDefaultAccount || isRegisteredAccount;

            if (!isAuthenticated) {
              return false;
            }

            showSuccess('Welcome back!');
            setScreen('home');
            return true;
          }}
          onForgotPassword={(email) => {
            setForgotEmail(email);
            setScreen('forgotPassword');
          }}
        />
      ) : screen === 'forgotPassword' ? (
        <ForgotPasswordScreen
          email={forgotEmail}
          onBack={() => setScreen('login')}
          onVerify={() => {
            setPasswordReturnTo('forgotPassword');
            setScreen('createNewPassword');
          }}
          onResend={() => {}}
        />
      ) : screen === 'createNewPassword' ? (
        <CreateNewPasswordScreen
          onBack={() => setScreen(passwordReturnTo)}
          onResetSuccess={() => {
            showSuccess('Password reset successfully.');
            setScreen('login');
          }}
        />
      ) : screen === 'changePassword' ? (
        <ChangePasswordScreen
          email={signupEmail}
          onBack={() => setScreen('account')}
          onForgotPassword={() => {
            setProfilePasswordOtpReturnTo('changePassword');
            setScreen('changePasswordOtp');
          }}
          onResetSuccess={() => {
            showSuccess('Password changed successfully.');
            setScreen('account');
          }}
        />
      ) : screen === 'deleteAccount' ? (
        <DeleteAccountScreen
          email={signupEmail}
          onBack={() => setScreen('account')}
          onForgotPassword={() => {
            setProfilePasswordOtpReturnTo('deleteAccount');
            setScreen('changePasswordOtp');
          }}
          onDeleted={() => {
            showSuccess('Your account has been deleted.');
            setScreen('login');
          }}
        />
      ) : screen === 'helpCenter' ? (
        <HelpCenterScreen
          initialName="Kishana Aloe"
          initialEmail="example@gmail.com"
          onBack={() => setScreen('account')}
          onSend={() => setScreen('account')}
        />
      ) : screen === 'information' ? (
        <InformationScreen
          page={informationPage}
          onBack={() => setScreen('account')}
        />
      ) : screen === 'changePasswordOtp' ? (
        <OTPScreen
          variant="email"
          title="Forgot password"
          email={signupEmail}
          onBack={() => setScreen(profilePasswordOtpReturnTo)}
          onVerify={() => {
            setPasswordReturnTo('changePasswordOtp');
            setScreen('createNewPassword');
          }}
          onResend={() => {}}
        />
      ) : screen === 'countryCode' ? (
        <CountryCodeScreen
          initialId={selectedCountry.id}
          onBack={() => setScreen(countryCodeReturnTo)}
          onSave={(country) => {
            setSelectedCountry(country);
            setScreen(countryCodeReturnTo);
          }}
        />
      ) : screen === 'emailOtp' ? (
        <OTPScreen
          variant="email"
          email={signupEmail}
          onBack={() => setScreen('signup')}
          onVerify={() => setScreen('phoneOtp')}
          onResend={() => {}}
        />
      ) : screen === 'phoneOtp' ? (
        <OTPScreen
          variant="phone"
          phone={signupPhone}
          onBack={() => setScreen('emailOtp')}
          onVerify={() => setScreen('enableLocation')}
          onResend={() => {}}
        />
      ) : screen === 'enableLocation' ? (
        <EnableLocationScreen
          onBack={() => setScreen('phoneOtp')}
          onAllowMaps={() => {
            setAddressFlow('onboarding');
            setScreen('address');
          }}
          onSetManually={() => {
            setAddressFlow('onboarding');
            setScreen('address');
          }}
        />
      ) : screen === 'address' ? (
        <EnterLocationScreen
          onBack={backFromEnterLocation}
          onAllowMaps={() => setScreen('addLocation')}
          onSelectAddress={() => setScreen('addLocation')}
        />
      ) : screen === 'addLocation' ? (
        <AddLocationScreen
          onBack={backFromAddLocation}
          onSave={(data) => {
            const line = [data.flatHouseNo, data.streetRoad, data.city]
              .filter(Boolean)
              .join(', ');
            if (line) {
              setDeliveryAddress(line);
            }
            showSuccess('Address saved successfully.');
            finishAddLocation();
          }}
        />
      ) : screen === 'addressSelect' ? (
        <>
          {addressSelectReturnTo === 'cart' ? (
            <CartScreen
              items={cartCount === 0 ? [] : undefined}
              address={deliveryAddress}
              onBack={() => setScreen(cartReturnTo)}
              onChangeAddress={() => {}}
              onProceed={() => {
                if (cartCount === 0) {
                  showError('Your cart is empty. Add a product first.');
                  return;
                }
                setScreen('payment');
              }}
              onItemsChange={(items) =>
                setCartCount(items.reduce((total, item) => total + item.qty, 0))
              }
              onTabPress={(tab) => {
                if (tab === 'home') setScreen('home');
                if (tab === 'cart') setScreen('cart');
                if (tab === 'orders') setScreen('orderHistory');
                if (tab === 'profile') setScreen('account');
              }}
            />
          ) : addressSelectReturnTo === 'account' ? (
            <ProfileScreen
              phone={accountPhone}
              language={appLanguage.label}
              onTabPress={(tab) => {
                if (tab === 'home') setScreen('home');
                if (tab === 'cart') {
                  setCartReturnTo('account');
                  setScreen('cart');
                }
                if (tab === 'orders') setScreen('orderHistory');
                if (tab === 'profile') setScreen('account');
              }}
              onLogoutConfirm={() => setScreen('home')}
            />
          ) : (
            <HomeScreen
              countryFlag={selectedCountry.flag}
              addressLabel={deliveryAddress}
              onSearchPress={() => setScreen('search')}
              onNotificationPress={() => setScreen('notification')}
              onTabPress={(tab) => {
                if (tab === 'cart') {
                  setCartReturnTo('home');
                  setScreen('cart');
                }
                if (tab === 'orders') setScreen('orderHistory');
                if (tab === 'home') setScreen('home');
                if (tab === 'profile') setScreen('account');
              }}
            />
          )}
          <AddressScreen
            visible
            showSave={addressSelectReturnTo !== 'account'}
            onBack={() => setScreen(addressSelectReturnTo)}
            onSave={(address: SavedAddress) => {
              setDeliveryAddress(address.line);
              showSuccess('Address saved successfully.');
              setScreen(addressSelectReturnTo);
            }}
            onAddNew={() => {
              setAddressFlow('addFromSelect');
              setScreen('address');
            }}
          />
        </>
      ) : screen === 'getStarted' ? (
        <GetStartedScreen onContinue={() => setScreen('home')} />
      ) : screen === 'home' ? (
        <HomeScreen
          countryFlag={selectedCountry.flag}
          addressLabel={deliveryAddress}
          onSearchPress={() => setScreen('search')}
          onNotificationPress={() => setScreen('notification')}
          onLocationPress={() => {
            setAddressFlow('change');
            setAddressSelectReturnTo('home');
            setScreen('addressSelect');
          }}
          onCategoriesSeeAll={() => setScreen('categories')}
          onBrandsSeeAll={() => setScreen('brands')}
          onOffersSeeAll={() => setScreen('bestOffers')}
          onCategoryPress={openCategory}
          onBrandPress={(id) =>
            openBrand('home', {
              id,
              label: id.charAt(0).toUpperCase() + id.slice(1),
            })
          }
          onProductPress={(id) =>
            openProduct('home', {
              id,
              title: 'Fresh Milk',
              category: 'Dairy',
              brand: 'Ambewela',
              quantityLabel: '1l',
              price: 12,
              oldPrice: 15,
              discount: 20,
            })
          }
          onAddProduct={() => {
            setCartCount((c) => c + 1);
            showSuccess('Product added to cart.');
          }}
          onTabPress={(tab) => {
            if (tab === 'cart') {
              setCartReturnTo('home');
              setScreen('cart');
            }
            if (tab === 'orders') setScreen('orderHistory');
            if (tab === 'home') setScreen('home');
            if (tab === 'profile') setScreen('account');
          }}
        />
      ) : screen === 'notification' ? (
        <NotificationScreen onBack={() => setScreen('home')} />
      ) : screen === 'account' ? (
        <>
          <ProfileScreen
            phone={accountPhone}
            language={appLanguage.label}
            onTabPress={(tab) => {
              if (tab === 'home') setScreen('home');
              if (tab === 'cart') {
                setCartReturnTo('account');
                setScreen('cart');
              }
              if (tab === 'orders') setScreen('orderHistory');
              if (tab === 'profile') setScreen('account');
            }}
            onMenuPress={(action) => {
              if (action === 'profile') {
                setScreen('personalInformation');
              }
              if (action === 'address') {
                setAddressFlow('change');
                setAddressSelectReturnTo('account');
                setScreen('addressSelect');
              }
              if (action === 'language') {
                setShowLanguageSheet(true);
              }
              if (action === 'changePassword') {
                setScreen('changePassword');
              }
              if (action === 'deleteAccount') {
                setScreen('deleteAccount');
              }
              if (action === 'helpCenter') {
                setScreen('helpCenter');
              }
              if (action === 'aboutUs') {
                setInformationPage('About us');
                setScreen('information');
              }
              if (action === 'privacyPolicy') {
                setInformationPage('Privacy Policy');
                setScreen('information');
              }
              if (action === 'termsOfService') {
                setInformationPage('Terms of Service');
                setScreen('information');
              }
            }}
            onLogoutConfirm={() => setScreen('home')}
          />

          <LanguageSheet
            visible={showLanguageSheet}
            selectedId={appLanguage.id}
            onClose={() => setShowLanguageSheet(false)}
            onSelect={(language) => {
              setAppLanguage(language);
              setShowLanguageSheet(false);
              setScreen('account');
            }}
          />
        </>
      ) : screen === 'personalInformation' ? (
        <PersonalInformationScreen
          avatar={profileAvatar}
          phone={accountPhone}
          onBack={() => setScreen('account')}
          onFieldPress={(fieldId) => {
            if (fieldId === 'phone') {
              setPendingPhone(accountPhone);
              setScreen('editPhoneNumber');
            }
          }}
          onPickCamera={() => {
            void pickProfileImage('camera');
          }}
          onPickGallery={() => {
            void pickProfileImage('gallery');
          }}
          onRemoveProfile={() => setProfileAvatar(undefined)}
        />
      ) : screen === 'editPhoneNumber' ? (
        <EditPhoneNumberScreen
          phone={pendingPhone}
          countryFlag={selectedCountry.flag}
          countryCode={selectedCountry.code}
          onBack={() => setScreen('personalInformation')}
          onCountryPress={() => {
            setCountryCodeReturnTo('editPhoneNumber');
            setScreen('countryCode');
          }}
          onNext={(phone, channel) => {
            setPendingPhone(phone);
            setPhoneVerificationChannel(channel);
            setScreen('editPhoneOtp');
          }}
        />
      ) : screen === 'editPhoneOtp' ? (
        <OTPScreen
          variant={phoneVerificationChannel}
          title="Edit Phone number"
          email={signupEmail}
          phone={`${selectedCountry.code}${pendingPhone}`}
          onBack={() => setScreen('editPhoneNumber')}
          onVerify={() => {
            setAccountPhone(pendingPhone);
            setScreen('personalInformation');
          }}
          onResend={() => {}}
        />
      ) : screen === 'imageCrop' ? (
        <ImageCropScreen
          image={cropImage}
          onCancel={() => setScreen('personalInformation')}
          onDone={(image) => {
            setProfileAvatar(image);
            setScreen('personalInformation');
          }}
        />
      ) : screen === 'categories' ? (
        <CategoryScreen
          onBack={() => setScreen('home')}
          onFilterPress={() => {
            setMenuReturnTo('categories');
            setMenuCategoryId('dairy');
            setMenuSubCategoryId('milk');
            setScreen('menu');
          }}
          onCategoryPress={openCategory}
        />
      ) : screen === 'brands' ? (
        <BrandsScreen
          onBack={() => setScreen('home')}
          onBrandPress={(brand) =>
            openBrand('brands', { id: brand.id, label: brand.name })
          }
        />
      ) : screen === 'bestOffers' ? (
        <BestOffersScreen
          onBack={() => setScreen('home')}
          onMenuPress={() => {
            setMenuReturnTo('bestOffers');
            setMenuCategoryId('dairy');
            setMenuSubCategoryId('milk');
            setScreen('menu');
          }}
          onProductPress={(product: OfferProduct) =>
            openProduct('bestOffers', {
              id: product.id,
              title: product.name,
              category: product.brand,
              price: product.price,
              description: product.description,
              image: product.image,
            })
          }
          onAddProduct={() => {
            setCartCount((c) => c + 1);
            showSuccess('Product added to cart.');
          }}
        />
      ) : screen === 'search' ? (
        <SearchScreen
          onBack={() => setScreen('home')}
          onProductPress={(id) =>
            openProduct('search', {
              id,
              title: 'Fresh Milk',
              category: 'Dairy',
              price: 5,
              image: require('./assets/search/product-ambewela.png'),
            })
          }
          onAddProduct={() => {
            setCartCount((c) => c + 1);
            showSuccess('Product added to cart.');
          }}
        />
      ) : screen === 'dairy' ? (
        <DairyScreen
          onBack={() => setScreen('home')}
          onSearchPress={() => setScreen('search')}
          onMenuPress={() => {
            setMenuReturnTo('dairy');
            setMenuCategoryId('dairy');
            setMenuSubCategoryId('milk');
            setScreen('menu');
          }}
          onProductPress={(product: DairyProduct) =>
            openProduct('dairy', {
              id: product.id,
              title: product.name,
              category: 'Dairy',
              price: product.price,
              description: product.description,
              image: product.image,
            })
          }
          onAddProduct={() => {
            setCartCount((c) => c + 1);
            showSuccess('Product added to cart.');
          }}
        />
      ) : screen === 'fruits' ? (
        <FruitsVegetablesScreen
          onBack={() => setScreen('home')}
          onSearchPress={() => setScreen('search')}
          onProductPress={(product: FruitProduct) =>
            openProduct('fruits', {
              id: product.id,
              title: product.name,
              category: 'Fruits & Vegetables',
              price: product.price,
              description:
                'Fresh sweet melon, juicy and ripe. Perfect for everyday snacking.',
              image: product.image,
            })
          }
          onAddProduct={() => {
            setCartCount((c) => c + 1);
            showSuccess('Product added to cart.');
          }}
        />
      ) : screen === 'menu' ? (
        <MenuScreen
          activeCategoryId={menuCategoryId}
          activeSubCategoryId={menuSubCategoryId}
          onBack={() => setScreen(menuReturnTo)}
          onCategoryPress={(category) => {
            setMenuCategoryId(category.id);
            if (category.id === 'dairy') {
              setScreen('dairy');
            } else if (category.id === 'fruits-vegetables') {
              setScreen('fruits');
            }
          }}
          onSubCategoryPress={(category, sub) => {
            setMenuCategoryId(category.id);
            setMenuSubCategoryId(sub.id);
            if (category.id === 'dairy') {
              setScreen('dairy');
            } else if (category.id === 'fruits-vegetables') {
              setScreen('fruits');
            } else {
              setScreen('search');
            }
          }}
          onBrandPress={(brand) => {
            openBrand('menu', brand);
          }}
        />
      ) : screen === 'brand' ? (
        <BrandScreen
          brandName={selectedBrand.label}
          products={
            selectedBrand.id === 'maliban' ? MALIBAN_PRODUCTS : MALIBAN_PRODUCTS
          }
          onBack={() => setScreen(brandReturnTo)}
          onMenuPress={() => {
            setMenuReturnTo('brand');
            setScreen('menu');
          }}
          onSearchPress={() => setScreen('search')}
          onProductPress={(product: BrandProduct) =>
            openProduct('brand', {
              id: product.id,
              title: product.name,
              category: selectedBrand.label,
              price: product.price,
              description: product.description,
              image: product.image,
            })
          }
          onAddProduct={() => setCartCount((c) => c + 1)}
        />
      ) : screen === 'product' ? (
        <ProductScreen
          product={selectedProduct}
          cartCount={cartCount}
          onBack={() => setScreen(productReturnTo)}
          onSearchPress={() => setScreen('search')}
          onOpenCart={() => {
            setCartReturnTo('product');
            setScreen('cart');
          }}
          onAddToCart={(_product: ProductDetail, quantity: number) => {
            setCartCount((c) => c + quantity);
            showSuccess('Product added to cart.');
          }}
          onRelatedPress={(id) => {
            const relatedMap: Record<string, Partial<ProductDetail>> = {
              'chocolate-milk': {
                id: 'chocolate-milk',
                title: 'Chocolate Milk',
                price: 5,
                image: require('./assets/product/chocolate-milk.png'),
                description:
                  'Smooth chocolate flavoured milk. A tasty treat packed with calcium.',
              },
              'faluda-milk': {
                id: 'faluda-milk',
                title: 'Faluda Flavoured Milk',
                price: 2,
                image: require('./assets/product/faluda-milk.png'),
                description:
                  'RichLife faluda flavoured milk in a handy 180ml pack.',
              },
              'sweet-melon': {
                id: 'sweet-melon',
                title: 'Sweet Melon',
                price: 5,
                category: 'Fruits',
                image: require('./assets/product/sweet-melon.png'),
                description:
                  'Fresh sweet melon, juicy and ripe. Perfect for everyday snacking.',
              },
              'value-pack': {
                id: 'value-pack',
                title: 'Value Pack Yoghurt',
                price: 12,
                image: require('./assets/product/value-pack.png'),
                description:
                  'Buy 7 and get 1 free value pack. Great for families.',
              },
            };
            const next = relatedMap[id];
            if (next) {
              setSelectedProduct((prev: ProductDetail) => ({
                ...prev,
                category: prev.category,
                ...next,
              }));
            }
          }}
        />
      ) : screen === 'cart' ? (
        <CartScreen
          items={cartCount === 0 ? [] : undefined}
          address={deliveryAddress}
          onBack={() => setScreen(cartReturnTo)}
          onChangeAddress={() => {
            setAddressFlow('change');
            setAddressSelectReturnTo('cart');
            setScreen('addressSelect');
          }}
          onProceed={() => {
            if (cartCount === 0) {
              showError('Your cart is empty. Add a product first.');
              return;
            }
            setScreen('payment');
          }}
          onItemsChange={(items) =>
            setCartCount(items.reduce((total, item) => total + item.qty, 0))
          }
          onTabPress={(tab) => {
            if (tab === 'home') setScreen('home');
            if (tab === 'cart') setScreen('cart');
            if (tab === 'orders') setScreen('orderHistory');
            if (tab === 'profile') setScreen('account');
          }}
        />
      ) : screen === 'payment' ? (
        <PaymentScreen
          subtotal={cartSubtotal}
          onBack={() => setScreen('cart')}
          onPay={() => {
            showSuccess('Payment successful.');
            setInvoiceReturnTo('home');
            setScreen('invoice');
          }}
        />
      ) : screen === 'orderHistory' ? (
        <OrderHistoryScreen
          onBack={() => setScreen('home')}
          onOrderPress={() => {
            setInvoiceReturnTo('orderHistory');
            setScreen('invoice');
          }}
          onTabPress={(tab) => {
            if (tab === 'home') setScreen('home');
            if (tab === 'cart') {
              setCartReturnTo('orderHistory');
              setScreen('cart');
            }
            if (tab === 'orders') setScreen('orderHistory');
            if (tab === 'profile') setScreen('account');
          }}
        />
      ) : screen === 'invoice' ? (
        <InvoiceScreen
          deliveryLocation={deliveryAddress}
          subtotal={cartSubtotal}
          onBack={() => setScreen(invoiceReturnTo)}
          onDownload={() => {
            showSuccess('Invoice downloaded successfully.');
            setScreen(invoiceReturnTo);
          }}
        />
      ) : (
        <RegisterScreen
          countryFlag={selectedCountry.flag}
          countryCode={selectedCountry.code}
          onSignIn={() => setScreen('login')}
          onCountryPress={() => {
            setCountryCodeReturnTo('signup');
            setScreen('countryCode');
          }}
          onNext={(data) => {
            setSignupEmail(data.email);
            setSignupPhone(data.phone);
            setRegisteredCredentials({
              username: data.email,
              password: data.password,
            });
            setScreen('emailOtp');
          }}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </SafeAreaProvider>
  );
}
