import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { ArrowLeft, CreditCard, Banknote } from 'lucide-react';
import { toast } from 'sonner';
import { Order } from '../types';

interface CheckoutScreenProps {
  onBack: () => void;
  onOrderComplete: (orderId: string) => void;
}

export function CheckoutScreen({ onBack, onOrderComplete }: CheckoutScreenProps) {
  const { language, cart, user, clearCart, addOrder } = useApp();
  const t = useTranslation(language);

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState('');
  const [deliverySlot, setDeliverySlot] = useState('morning');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online'>('cash');

  const total = cart.reduce(
    (sum, item) => sum + item.product.totalPrice * item.quantity,
    0
  );

  const deliverySlots = [
    { id: 'morning', label: '8:00 - 12:00' },
    { id: 'afternoon', label: '14:00 - 18:00' },
    { id: 'evening', label: '18:00 - 20:00' },
  ];

  const handlePlaceOrder = () => {
    if (!name || !phone || !address) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      totalAmount: total,
      status: 'pending',
      deliveryAddress: address,
      deliverySlot: deliverySlots.find(s => s.id === deliverySlot)?.label || '',
      paymentMethod,
      createdAt: new Date(),
      consumerPhone: phone,
      consumerName: name,
    };

    addOrder(order);
    clearCart();
    toast.success(t('orderConfirmed'));
    onOrderComplete(order.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2>{t('checkout')}</h2>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Contact Info */}
        <div className="bg-white rounded-lg p-4 space-y-4">
          <h3>Informations de contact</h3>
          
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              className="min-h-[48px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t('phoneNumber')}</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+216 XX XXX XXX"
              className="min-h-[48px]"
            />
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-lg p-4 space-y-4">
          <h3>{t('deliveryAddress')}</h3>
          <div className="space-y-2">
            <Label htmlFor="address">Adresse complète</Label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Rue, numéro, ville, code postal"
              className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Delivery Slot */}
        <div className="bg-white rounded-lg p-4 space-y-4">
          <h3>{t('deliverySlot')}</h3>
          <RadioGroup value={deliverySlot} onValueChange={setDeliverySlot}>
            {deliverySlots.map((slot) => (
              <div key={slot.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <RadioGroupItem value={slot.id} id={slot.id} />
                <Label htmlFor={slot.id} className="flex-1 cursor-pointer">
                  {slot.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg p-4 space-y-4">
          <h3>{t('paymentMethod')}</h3>
          <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'cash' | 'online')}>
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex items-center gap-2 flex-1 cursor-pointer">
                <Banknote className="w-5 h-5" />
                {t('cashOnDelivery')}
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online" className="flex items-center gap-2 flex-1 cursor-pointer">
                <CreditCard className="w-5 h-5" />
                {t('onlinePayment')}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <h3>Résumé de la commande</h3>
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>
                {item.product.name[language]} × {item.quantity}
              </span>
              <span>{(item.product.totalPrice * item.quantity).toFixed(2)} TND</span>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span>{t('total')}</span>
            <span className="text-primary">
              {total.toFixed(2)} TND
            </span>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <div className="max-w-screen-sm mx-auto">
          <Button
            onClick={handlePlaceOrder}
            className="w-full bg-accent hover:bg-accent/90 min-h-[48px]"
          >
            {t('placeOrder')} • {total.toFixed(2)} TND
          </Button>
        </div>
      </div>
    </div>
  );
}
