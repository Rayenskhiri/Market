import { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { PriceBreakdown } from '../components/PriceBreakdown';
import { ArrowLeft, Plus, Minus, ShieldCheck, Star, MapPin, Leaf } from 'lucide-react';
import { toast } from 'sonner';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetailScreen({ product, onBack }: ProductDetailScreenProps) {
  const { language, addToCart } = useApp();
  const t = useTranslation(language);
  const [quantity, setQuantity] = useState(1);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(true);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name[language]} ${t('addToCart').toLowerCase()}`);
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
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center gap-4 p-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="flex-1 line-clamp-1">{product.name[language]}</h2>
        </div>
      </div>

      {/* Image */}
      <div className="aspect-square bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name[language]}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Title and Badges */}
        <div className="space-y-3">
          <h1>{product.name[language]}</h1>
          
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-green-600 text-white">
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

        {/* Description */}
        <div className="space-y-2">
          <p className="text-gray-700">{product.description[language]}</p>
        </div>

        {/* Producer Info */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h4>Producteur</h4>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span>{product.producer.name}</span>
                {product.producer.verified && (
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {product.producer.location}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{product.producer.rating}</span>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <PriceBreakdown product={product} quantity={quantity} />

        {/* Quantity Selector */}
        <div className="space-y-3">
          <label>{t('quantity')}</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
              disabled={quantity <= 1}
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center">
              <span className="text-2xl">{quantity}</span>
              <span className="text-sm text-gray-500 ml-2">{product.unit[language]}</span>
            </div>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
              disabled={quantity >= product.stock}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <div className="max-w-screen-sm mx-auto flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm text-gray-600">{t('total')}</div>
            <div className="text-primary">
              {(product.totalPrice * quantity).toFixed(2)} TND
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            className="bg-accent hover:bg-accent/90 flex-1 min-h-[48px]"
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? t('addToCart') : t('outOfStock')}
          </Button>
        </div>
      </div>
    </div>
  );
}
