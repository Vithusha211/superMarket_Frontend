import { useState } from 'react';
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
import AddressScreen, { SavedAddress } from './screen/Home/AdressScreen';
import MenuScreen from './screen/Home/MenuScreen';
import BrandScreen, {
  BrandProduct,
  MALIBAN_PRODUCTS,
} from './screen/Home/BrandScreen';
import BrandsScreen from './screen/Home/BrandsScreen';
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
  | 'search'
  | 'categories'
  | 'brands'
  | 'dairy'
  | 'fruits'
  | 'menu'
  | 'brand'
  | 'product'
  | 'cart'
  | 'payment'
  | 'invoice'
  | 'forgotPassword'
  | 'createNewPassword';

/** Where address/add-location should return after finish */
type AddressFlow = 'onboarding' | 'change' | 'addFromSelect';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [signupEmail, setSignupEmail] = useState('user@gmail.com');
  const [signupPhone, setSignupPhone] = useState('1234565657');
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
  const [selectedBrand, setSelectedBrand] = useState({
    id: 'maliban',
    label: 'Maliban',
  });
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
    <SafeAreaProvider>
      {screen === 'splash' ? (
        <SplashScreen onPress={() => setScreen('language')} />
      ) : screen === 'language' ? (
        <LanguageSelectScreen onSelect={() => setScreen('welcome')} />
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
          onContinue={() => setScreen('home')}
          onForgotPassword={(email) => {
            setForgotEmail(email);
            setScreen('forgotPassword');
          }}
        />
      ) : screen === 'forgotPassword' ? (
        <ForgotPasswordScreen
          email={forgotEmail}
          onBack={() => setScreen('login')}
          onVerify={() => setScreen('createNewPassword')}
          onResend={() => {}}
        />
      ) : screen === 'createNewPassword' ? (
        <CreateNewPasswordScreen
          onBack={() => setScreen('forgotPassword')}
          onResetSuccess={() => setScreen('login')}
        />
      ) : screen === 'countryCode' ? (
        <CountryCodeScreen
          initialId={selectedCountry.id}
          onBack={() => setScreen('signup')}
          onSave={(country) => {
            setSelectedCountry(country);
            setScreen('signup');
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
            finishAddLocation();
          }}
        />
      ) : screen === 'addressSelect' ? (
        <AddressScreen
          mode={addressFlow === 'addFromSelect' ? 'add' : 'change'}
          deliveringTo={deliveryAddress}
          onBack={() => setScreen('cart')}
          onSave={(address: SavedAddress) => {
            setDeliveryAddress(address.line);
            setScreen('cart');
          }}
          onAddNew={() => {
            setAddressFlow('addFromSelect');
            setScreen('addLocation');
          }}
        />
      ) : screen === 'getStarted' ? (
        <GetStartedScreen onContinue={() => setScreen('home')} />
      ) : screen === 'home' ? (
        <HomeScreen
          countryFlag={selectedCountry.flag}
          onSearchPress={() => setScreen('search')}
          onCategoriesSeeAll={() => setScreen('categories')}
          onBrandsSeeAll={() => setScreen('brands')}
          onOffersSeeAll={() => setScreen('dairy')}
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
          onAddProduct={() => setCartCount((c) => c + 1)}
          onTabPress={(tab) => {
            if (tab === 'cart') {
              setCartReturnTo('home');
              setScreen('cart');
            }
            if (tab === 'orders') setScreen('categories');
            if (tab === 'home') setScreen('home');
          }}
        />
      ) : screen === 'categories' ? (
        <CategoryScreen
          onBack={() => setScreen('home')}
          onCategoryPress={openCategory}
        />
      ) : screen === 'brands' ? (
        <BrandsScreen
          onBack={() => setScreen('home')}
          onBrandPress={(brand) =>
            openBrand('brands', { id: brand.id, label: brand.name })
          }
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
          onAddProduct={() => setCartCount((c) => c + 1)}
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
          onAddProduct={() => setCartCount((c) => c + 1)}
        />
      ) : screen === 'fruits' ? (
        <FruitsVegetablesScreen
          onBack={() => setScreen('home')}
          onSearchPress={() => setScreen('search')}
          onMenuPress={() => {
            setMenuReturnTo('fruits');
            setMenuCategoryId('fruits-vegetables');
            setMenuSubCategoryId('fruits');
            setScreen('menu');
          }}
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
          onAddProduct={() => setCartCount((c) => c + 1)}
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
          onAddToCart={(_product: ProductDetail, quantity: number) =>
            setCartCount((c) => c + quantity)
          }
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
          address={deliveryAddress}
          onBack={() => setScreen(cartReturnTo)}
          onChangeAddress={() => {
            setAddressFlow('change');
            setScreen('addressSelect');
          }}
          onProceed={() => setScreen('payment')}
          onTabPress={(tab) => {
            if (tab === 'home') setScreen('home');
            if (tab === 'cart') setScreen('cart');
          }}
        />
      ) : screen === 'payment' ? (
        <PaymentScreen
          subtotal={cartSubtotal}
          onBack={() => setScreen('cart')}
          onPay={() => setScreen('invoice')}
        />
      ) : screen === 'invoice' ? (
        <InvoiceScreen
          deliveryLocation={deliveryAddress}
          subtotal={cartSubtotal}
          onBack={() => setScreen('home')}
          onDownload={() => setScreen('home')}
        />
      ) : (
        <RegisterScreen
          countryFlag={selectedCountry.flag}
          countryCode={selectedCountry.code}
          onSignIn={() => setScreen('login')}
          onCountryPress={() => setScreen('countryCode')}
          onNext={(data) => {
            setSignupEmail(data.email);
            setSignupPhone(data.phone);
            setScreen('emailOtp');
          }}
        />
      )}
    </SafeAreaProvider>
  );
}
