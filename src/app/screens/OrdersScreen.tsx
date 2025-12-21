import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';
import { Badge } from '../components/ui/badge';
import { Package, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '../types';

export function OrdersScreen() {
  const { language, orders } = useApp();
  const t = useTranslation(language);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />;
      case 'preparing':
        return <Package className="w-5 h-5" />;
      case 'in-transit':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'confirmed':
        return 'bg-blue-500';
      case 'preparing':
        return 'bg-purple-500';
      case 'in-transit':
        return 'bg-orange-500';
      case 'delivered':
        return 'bg-green-600';
      case 'cancelled':
        return 'bg-red-500';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-TN' : 'fr-TN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 pb-24">
        <Package className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-gray-500 mb-2">{t('noOrders')}</h2>
        <p className="text-sm text-gray-400 text-center">
          Vos commandes apparaîtront ici
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1>{t('orders')}</h1>
        <p className="text-sm text-gray-600">
          {orders.length} {orders.length === 1 ? 'commande' : 'commandes'}
        </p>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg p-4 space-y-4"
          >
            {/* Order Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{t('orderNumber')}</span>
                  <span className="text-sm">{order.id}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(order.createdAt)}
                </div>
              </div>
              <Badge className={`${getStatusColor(order.status)} text-white`}>
                {getStatusIcon(order.status)}
                <span className="ml-1">{t(order.status)}</span>
              </Badge>
            </div>

            {/* Order Items */}
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name[language]}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-sm line-clamp-1">
                      {item.product.name[language]}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.quantity} × {item.product.totalPrice.toFixed(2)} TND
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Details */}
            <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison:</span>
                <span>{order.deliverySlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Paiement:</span>
                <span>
                  {order.paymentMethod === 'cash'
                    ? t('cashOnDelivery')
                    : t('onlinePayment')}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span>{t('total')}</span>
                <span className="text-primary">
                  {order.totalAmount.toFixed(2)} TND
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
