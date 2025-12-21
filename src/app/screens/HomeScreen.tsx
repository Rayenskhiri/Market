import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';
import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Search, Sprout, Leaf, Shield, UserPlus } from 'lucide-react';
import { Product } from '../types';

interface HomeScreenProps {
  onProductClick: (product: Product) => void;
  onNavigate?: (screen: string) => void;
}

export function HomeScreen({ onProductClick, onNavigate }: HomeScreenProps) {
  const { language } = useApp();
  const t = useTranslation(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'vegetables', icon: Leaf },
    { id: 'fruits', icon: Sprout },
    { id: 'poultry', icon: Sprout },
    { id: 'fish', icon: Sprout },
    { id: 'honey', icon: Sprout },
  ];

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Only show approved products from active producers
      const isVisible = product.status === 'approved' && product.producer.status === 'active';
      
      const matchesSearch = product.name[language]
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        product.description[language]
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      return isVisible && matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, language]);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-primary text-white p-4 space-y-4">
        <div className="space-y-1">
          <h1 className="text-white">Suq Direct</h1>
          <p className="text-sm text-green-100">{t('noMiddlemen')}</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="search"
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <Badge
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(null)}
            className="cursor-pointer px-4 py-2 min-h-[44px]"
          >
            All
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="cursor-pointer px-4 py-2 min-h-[44px]"
            >
              {t(category.id as any)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Trust Message */}
      <div className="px-4 py-3 bg-green-50 mx-4 rounded-lg space-y-1">
        <div className="flex items-center gap-2 text-primary">
          <Leaf className="w-5 h-5" />
          <span>{t('fairPrices')}</span>
        </div>
        <p className="text-sm text-gray-600">{t('directFromProducers')}</p>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => onProductClick(product)}
              />
            ))}\n          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            {t('noProducts')}
          </div>
        )}
      </div>

      {/* Demo Navigation - For Testing Only */}
      {onNavigate && (
        <div className="p-4 bg-gray-100 border-t-2 border-dashed border-gray-300">
          <p className="text-xs text-gray-500 mb-2 text-center">Demo Navigation (Testing)</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('producer-request')}
              className="text-xs"
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Producer Request
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('admin-dashboard')}
              className="text-xs"
            >
              <Shield className="w-4 h-4 mr-1" />
              Admin Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}