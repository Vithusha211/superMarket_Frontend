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
import DairyScreen from './screen/Home/DairyScreen';
import SearchScreen from './screen/Home/SearchScreen';
import ProductScreen, {
  ProductDetail,
} from './screen/Home/ProductDetailScreen';
import CartScreen from './screen/Home/CartScreen';
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
  | 'getStarted'
  | 'home'
  | 'search'
  | 'dairy'
  | 'product'
  | 'cart'
  | 'forgotPassword'
  | 'createNewPassword';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [signupEmail, setSignupEmail] = useState('user@gmail.com');
  const [signupPhone, setSignupPhone] = useState('1234565657');
  const [forgotEmail, setForgotEmail] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [productReturnTo, setProductReturnTo] = useState<AppScreen>('dairy');
  const [cartReturnTo, setCartReturnTo] = useState<AppScreen>('home');
  const [addressReturnTo, setAddressReturnTo] = useState<AppScreen>('enableLocation');
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail>({
    id: 'fresh-milk',
    title: 'Fresh Milk',
    category: 'Dairy',
    price: 5,
    description:
      'Fresh full cream milk sourced daily. Rich in calcium and vitamins for your everyday nutrition.',
    image: require('./assets/search/product-ambewela.png'),
  });
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
            setAddressReturnTo('enableLocation');
            setScreen('address');
          }}
          onSetManually={() => {
            setAddressReturnTo('enableLocation');
            setScreen('address');
          }}
        />
      ) : screen === 'address' ? (
        <EnterLocationScreen
          onBack={() => setScreen(addressReturnTo)}
          onAllowMaps={() => setScreen('addLocation')}
          onSelectAddress={() => setScreen('addLocation')}
        />
      ) : screen === 'addLocation' ? (
        <AddLocationScreen
          onBack={() => setScreen('address')}
          onSave={() =>
            setScreen(addressReturnTo === 'cart' ? 'cart' : 'getStarted')
          }
        />
      ) : screen === 'getStarted' ? (
        <GetStartedScreen onContinue={() => setScreen('home')} />
      ) : screen === 'home' ? (
        <HomeScreen
          countryFlag={selectedCountry.flag}
          onSearchPress={() => setScreen('search')}
          onCategoryPress={(id) => {
            if (id === 'dairy') {
              setScreen('dairy');
            } else {
              setScreen('search');
            }
          }}
          onProductPress={(id) =>
            openProduct('home', {
              id,
              title: 'Fresh Milk',
              category: 'Dairy',
              price: 5,
            })
          }
          onTabPress={(tab) => {
            if (tab === 'cart') {
              setCartReturnTo('home');
              setScreen('cart');
            }
            if (tab === 'home') setScreen('home');
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
          onAddProduct={() => setCartCount((c) => c + 1)}
        />
      ) : screen === 'dairy' ? (
        <DairyScreen
          onBack={() => setScreen('home')}
          onSearchPress={() => setScreen('search')}
          onProductPress={(id) =>
            openProduct('dairy', {
              id,
              title: 'Fresh Milk',
              category: 'Dairy',
              price: 5,
              image: require('./assets/search/product-ambewela.png'),
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
          onBack={() => setScreen(cartReturnTo)}
          onChangeAddress={() => {
            setAddressReturnTo('cart');
            setScreen('address');
          }}
          onProceed={() => {}}
          onTabPress={(tab) => {
            if (tab === 'home') setScreen('home');
            if (tab === 'cart') setScreen('cart');
          }}
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
