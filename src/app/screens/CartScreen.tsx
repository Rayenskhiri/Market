import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';
import { Button } from '../components/ui/button';
import { PriceBreakdown } from '../components/PriceBreakdown';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

interface CartScreenProps {
  onCheckout: () => void;
}

export function CartScreen({ onCheckout }: CartScreenProps) {
  const { language, cart, updateCartQuantity, removeFromCart } = useApp();
  const t = useTranslation(language);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.totalPrice * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 pb-24">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-gray-500 mb-2">{t('emptyCart')}</h2>
        <p className="text-sm text-gray-400 text-center">
          {t('directFromProducers')}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1>{t('cart')}</h1>
        <p className="text-sm text-gray-600">
          {cart.length} {cart.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="bg-white rounded-lg p-4 space-y-4"
          >
            <div className="flex gap-4">
              <img
                src={item.product.images[0]}
                alt={item.product.name[language]}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-1">
                <h4 className="line-clamp-1">{item.product.name[language]}</h4>
                <p className="text-sm text-gray-600">
                  {item.product.producer.name}
                </p>
                <div className="text-primary">
                  {item.product.totalPrice.toFixed(2)} TND / {item.product.unit[language]}
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 hover:bg-red-50 rounded-full text-red-600 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateCartQuantity(item.product.id, item.quantity - 1)
                  }
                  className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateCartQuantity(item.product.id, item.quantity + 1)
                  }
                  className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
                  disabled={item.quantity >= item.product.stock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="text-primary">
                {(item.product.totalPrice * item.quantity).toFixed(2)} TND
              </div>
            </div>

            <PriceBreakdown product={item.product} quantity={item.quantity} />
          </div>
        ))}
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <div className="max-w-screen-sm mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <span>{t('subtotal')}</span>
            <span className="text-primary">
              {subtotal.toFixed(2)} TND
            </span>
          </div>
          <Button
            onClick={onCheckout}
            className="w-full bg-accent hover:bg-accent/90 min-h-[48px]"
          >
            {t('checkout')}
          </Button>
        </div>
      </div>
    </div>
  );
}
