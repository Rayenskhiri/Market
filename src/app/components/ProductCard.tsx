import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';
import { Badge } from './ui/badge';
import { ShieldCheck, Leaf } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { language, isRTL } = useApp();
  const t = useTranslation(language);

  const getFreshnessColor = (freshness: Product['freshness']) => {
    switch (freshness) {
      case 'today':
        return 'bg-green-600';
      case 'very-fresh':
        return 'bg-green-500';
      default:
        return 'bg-green-400';
    }
  };

  const getFreshnessText = (freshness: Product['freshness']) => {
    switch (freshness) {
      case 'today':
        return t('today');
      case 'very-fresh':
        return t('veryFresh');
      default:
        return t('fresh');
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="relative aspect-square">
        <img
          src={product.images[0]}
          alt={product.name[language]}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          <Badge className={`${getFreshnessColor(product.freshness)} text-white`}>
            <Leaf className="w-3 h-3 mr-1" />
            {getFreshnessText(product.freshness)}
          </Badge>
          {product.producer.verified && (
            <Badge className="bg-blue-600 text-white">
              <ShieldCheck className="w-3 h-3 mr-1" />
              {t('verified')}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="line-clamp-1">{product.name[language]}</h3>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description[language]}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div>
            <div className="text-primary">
              {product.totalPrice.toFixed(2)} TND
            </div>
            <div className="text-xs text-gray-500">
              {product.unit[language]}
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            {product.producer.name}
          </div>
        </div>

        {product.stock <= 10 && product.stock > 0 && (
          <div className="text-xs text-orange-600">
            {product.stock} {t('inStock')}
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="text-xs text-red-600">
            {t('outOfStock')}
          </div>
        )}
      </div>
    </div>
  );
}
