import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Toaster } from './components/ui/sonner';
import { BottomNav } from './components/BottomNav';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { HomeScreen } from './screens/HomeScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ProducerDashboard } from './screens/ProducerDashboard';
import { OrderConfirmationScreen } from './screens/OrderConfirmationScreen';
import { ProducerRequestScreen } from './screens/ProducerRequestScreen';
import { AdminDashboard } from './screens/AdminDashboard';
import { Product } from './types';

type Screen =
  | 'home'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'orders'
  | 'profile'
  | 'producer-dashboard'
  | 'producer-request'
  | 'admin-dashboard'
  | 'order-confirmation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product-detail');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedProduct(null);
  };

  const handleGoToCheckout = () => {
    setCurrentScreen('checkout');
  };

  const handleOrderComplete = (orderId: string) => {
    setConfirmedOrderId(orderId);
    setCurrentScreen('order-confirmation');
  };

  const handleBottomNavChange = (tab: string) => {
    setCurrentScreen(tab as Screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onProductClick={handleProductClick} onNavigate={setCurrentScreen} />;

      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={handleBackToHome}
          />
        ) : null;

      case 'cart':
        return <CartScreen onCheckout={handleGoToCheckout} />;

      case 'checkout':
        return (
          <CheckoutScreen
            onBack={() => setCurrentScreen('cart')}
            onOrderComplete={handleOrderComplete}
          />
        );

      case 'orders':
        return <OrdersScreen />;

      case 'profile':
        return <ProfileScreen />;

      case 'producer-dashboard':
        return <ProducerDashboard />;

      case 'producer-request':
        return <ProducerRequestScreen onBack={handleBackToHome} />;

      case 'admin-dashboard':
        return <AdminDashboard />;

      case 'order-confirmation':
        return confirmedOrderId ? (
          <OrderConfirmationScreen
            orderId={confirmedOrderId}
            onContinueShopping={handleBackToHome}
            onViewOrders={() => setCurrentScreen('orders')}
          />
        ) : null;

      default:
        return <HomeScreen onProductClick={handleProductClick} />;
    }
  };

  const showBottomNav =
    currentScreen !== 'product-detail' &&
    currentScreen !== 'checkout' &&
    currentScreen !== 'order-confirmation';

  const showLanguageSwitcher =
    currentScreen === 'home' || currentScreen === 'product-detail';

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Language Switcher - Top Right on certain screens */}
        {showLanguageSwitcher && (
          <div className="fixed top-4 right-4 z-50">
            <LanguageSwitcher />
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-screen-sm mx-auto bg-white min-h-screen">
          {renderScreen()}
        </main>

        {/* Bottom Navigation */}
        {showBottomNav && (
          <BottomNav
            activeTab={currentScreen}
            onTabChange={handleBottomNavChange}
          />
        )}

        {/* Toast Notifications */}
        <Toaster position="top-center" />
      </div>
    </AppProvider>
  );
}