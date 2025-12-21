import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';
import { Button } from '../components/ui/button';
import { CheckCircle, Package } from 'lucide-react';

interface OrderConfirmationScreenProps {
  orderId: string;
  onContinueShopping: () => void;
  onViewOrders: () => void;
}

export function OrderConfirmationScreen({
  orderId,
  onContinueShopping,
  onViewOrders,
}: OrderConfirmationScreenProps) {
  const { language, orders } = useApp();
  const t = useTranslation(language);

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white rounded-lg p-8 text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-green-600">{t('orderConfirmed')}</h1>

          <div className="space-y-2">
            <div className="text-sm text-gray-600">{t('orderNumber')}</div>
            <div className="bg-gray-50 rounded-lg p-3">
              {order.id}
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 space-y-2 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total:</span>
              <span className="text-primary">
                {order.totalAmount.toFixed(2)} TND
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Livraison:</span>
              <span>{order.deliverySlot}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Paiement:</span>
              <span>
                {order.paymentMethod === 'cash'
                  ? t('cashOnDelivery')
                  : t('onlinePayment')}
              </span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Nous vous enverrons une notification par SMS quand votre commande sera en route!
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={onViewOrders}
            className="w-full bg-primary hover:bg-primary/90 min-h-[48px]"
          >
            <Package className="w-5 h-5 mr-2" />
            {t('orders')}
          </Button>
          <Button
            onClick={onContinueShopping}
            variant="outline"
            className="w-full min-h-[48px]"
          >
            {t('continue')}
          </Button>
        </div>
      </div>
    </div>
  );
}
