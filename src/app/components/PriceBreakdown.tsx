import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';
import { Separator } from './ui/separator';

interface PriceBreakdownProps {
  product: Product;
  quantity?: number;
}

export function PriceBreakdown({ product, quantity = 1 }: PriceBreakdownProps) {
  const { language } = useApp();
  const t = useTranslation(language);

  const items = [
    { label: t('productionCost'), amount: product.productionCost * quantity },
    { label: t('transportCost'), amount: product.transportCost * quantity },
    { label: t('platformFee'), amount: product.platformFee * quantity },
  ];

  const total = product.totalPrice * quantity;

  return (
    <div className="bg-green-50 rounded-lg p-4 space-y-3">
      <h4 className="text-primary">{t('priceBreakdown')}</h4>
      
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-gray-600">{item.label}</span>
            <span>{item.amount.toFixed(2)} TND</span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="flex justify-between">
        <span>{t('total')}</span>
        <span className="text-primary">
          {total.toFixed(2)} TND
        </span>
      </div>

      {quantity > 1 && (
        <div className="text-xs text-gray-500">
          {quantity} × {product.unit[language]}
        </div>
      )}
    </div>
  );
}
