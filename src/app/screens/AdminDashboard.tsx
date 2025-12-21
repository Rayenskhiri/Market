import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { 
  Users, 
  Package, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { Product, ProducerRequest, ProductStatus } from '../types';
import { mockProducts } from '../data/mockData';

export function AdminDashboard() {
  const { language } = useApp();
  const t = useTranslation(language);
  const [activeTab, setActiveTab] = useState<'producers' | 'products'>('producers');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Mock data for pending producer requests
  const [pendingProducers, setPendingProducers] = useState<ProducerRequest[]>([
    {
      id: '1',
      name: { fr: 'Mohamed Ben Ali', ar: 'محمد بن علي', 'ar-tn': 'Mohamed Ben Ali' },
      phone: '+216 22 123 456',
      farmName: { fr: 'Ferme Bio de Nabeul', ar: 'مزرعة نابل العضوية', 'ar-tn': 'Ferme Bio Nabeul' },
      district: 'Nabeul',
      photos: [],
      status: 'pending',
      createdAt: new Date('2024-12-20'),
    },
    {
      id: '2',
      name: { fr: 'Fatima Khelifi', ar: 'فاطمة خليفي', 'ar-tn': 'Fatima Khelifi' },
      phone: '+216 55 987 654',
      farmName: { fr: 'Jardin de Zaghouan', ar: 'حديقة زغوان', 'ar-tn': 'Jardin Zaghouan' },
      district: 'Zaghouan',
      photos: [],
      status: 'pending',
      createdAt: new Date('2024-12-19'),
    },
  ]);

  // Mock data for pending products
  const [pendingProducts, setPendingProducts] = useState<Product[]>(
    mockProducts
      .slice(0, 3)
      .map(p => ({ ...p, status: 'pending' as ProductStatus }))
  );

  const handleApproveProducer = (id: string) => {
    setPendingProducers(prev => prev.filter(p => p.id !== id));
    // In real implementation: POST /admin/producers/{id}/approve
    console.log('Approved producer:', id);
    alert(`Producer approved! Invite link sent.`);
  };

  const handleRejectProducer = (id: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    setPendingProducers(prev => 
      prev.map(p => p.id === id ? { ...p, status: 'rejected' as const, adminComment: rejectionReason } : p)
    );
    // In real implementation: POST /admin/producers/{id}/reject
    console.log('Rejected producer:', id, rejectionReason);
    setShowRejectModal(false);
    setRejectionReason('');
    setSelectedItem(null);
  };

  const handleApproveProduct = (id: string) => {
    setPendingProducts(prev => prev.filter(p => p.id !== id));
    // In real implementation: POST /admin/products/{id}/approve
    console.log('Approved product:', id);
    alert(`Product approved and published!`);
  };

  const handleRejectProduct = (id: string) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    setPendingProducts(prev =>
      prev.map(p => p.id === id ? { ...p, status: 'rejected' as ProductStatus, adminComment: rejectionReason } : p)
    );
    // In real implementation: POST /admin/products/{id}/reject
    console.log('Rejected product:', id, rejectionReason);
    setShowRejectModal(false);
    setRejectionReason('');
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('adminDashboard')}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'fr' && "Modération et contrôle de la plateforme"}
                {language === 'ar' && "إدارة ومراقبة المنصة"}
                {language === 'ar-tn' && "Modération wel contrôle"}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-3 py-1.5">
                <Users className="w-4 h-4 mr-2" />
                {pendingProducers.length} {t('pendingProducers')}
              </Badge>
              <Badge variant="outline" className="px-3 py-1.5">
                <Package className="w-4 h-4 mr-2" />
                {pendingProducts.length} {t('pendingProducts')}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('pendingProducers')}</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">
                  {pendingProducers.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t('pendingProducts')}</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {pendingProducts.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'fr' && "Total approuvés"}
                  {language === 'ar' && "الإجمالي المعتمد"}
                  {language === 'ar-tn' && "Total approuvés"}
                </p>
                <p className="text-3xl font-bold text-green-600 mt-1">24</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('producers')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === 'producers'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                {t('pendingProducers')} ({pendingProducers.filter(p => p.status === 'pending').length})
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                  activeTab === 'products'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Package className="w-4 h-4 inline mr-2" />
                {t('pendingProducts')} ({pendingProducts.filter(p => p.status === 'pending').length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'producers' && (
              <div className="space-y-4">
                {pendingProducers.filter(p => p.status === 'pending').length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>{language === 'fr' && "Aucun producteur en attente"}
                       {language === 'ar' && "لا يوجد منتجون في الانتظار"}
                       {language === 'ar-tn' && "Ma famma producteurs f'intidhar"}</p>
                  </div>
                ) : (
                  pendingProducers.filter(p => p.status === 'pending').map(producer => (
                    <div key={producer.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">
                              {producer.name[language]}
                            </h3>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                              <Clock className="w-3 h-3 mr-1" />
                              {t('pending')}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                              <p className="text-xs text-gray-500">{t('farmName')}</p>
                              <p className="text-sm font-medium text-gray-700">
                                {producer.farmName[language]}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">{t('phoneNumber')}</p>
                              <p className="text-sm font-medium text-gray-700" dir="ltr">
                                {producer.phone}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">{t('district')}</p>
                              <p className="text-sm font-medium text-gray-700">
                                {producer.district}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                {language === 'fr' && "Date de demande"}
                                {language === 'ar' && "تاريخ الطلب"}
                                {language === 'ar-tn' && "Date el talab"}
                              </p>
                              <p className="text-sm font-medium text-gray-700">
                                {producer.createdAt.toLocaleDateString(language === 'ar' ? 'ar-TN' : 'fr-TN')}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedItem(producer);
                              setShowRejectModal(true);
                            }}
                            className="text-red-600 hover:bg-red-50 border-red-200"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            {t('rejectProducer')}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApproveProducer(producer.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {t('approveProducer')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-4">
                {pendingProducts.filter(p => p.status === 'pending').length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>{language === 'fr' && "Aucun produit en attente"}
                       {language === 'ar' && "لا توجد منتجات في الانتظار"}
                       {language === 'ar-tn' && "Ma famma produits f'intidhar"}</p>
                  </div>
                ) : (
                  pendingProducts.filter(p => p.status === 'pending').map(product => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition">
                      <div className="flex items-start gap-4">
                        <img
                          src={product.images[0]}
                          alt={product.name[language]}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">
                              {product.name[language]}
                            </h3>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                              <Clock className="w-3 h-3 mr-1" />
                              {t('pendingReview')}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.description[language]}
                          </p>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-xs text-gray-500">{t('productionCost')}</p>
                              <p className="font-medium">{product.productionCost.toFixed(2)} TND</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">{t('platformFee')}</p>
                              <p className="font-medium">{product.platformFee.toFixed(2)} TND</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">{t('total')}</p>
                              <p className="font-medium text-green-600">{product.totalPrice.toFixed(2)} TND</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                            <span>{language === 'fr' && "Producteur:"}
                                  {language === 'ar' && "المنتج:"}
                                  {language === 'ar-tn' && "Producteur:"}</span>
                            <span className="font-medium text-gray-900">{product.producer.name}</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedItem(product);
                              setShowRejectModal(true);
                            }}
                            className="text-red-600 hover:bg-red-50 border-red-200"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            {t('rejectProduct')}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApproveProduct(product.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            {t('approveProduct')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 rounded-full p-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {activeTab === 'producers' ? t('rejectProducer') : t('rejectProduct')}
              </h2>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              {language === 'fr' && "Veuillez fournir une raison pour le rejet (obligatoire):"}
              {language === 'ar' && "يرجى تقديم سبب الرفض (مطلوب):"}
              {language === 'ar-tn' && "Eb3ath sabab el rejet (obligatoire):"}
            </p>
            
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder={
                language === 'fr' ? "Ex: Photos de mauvaise qualité, informations incomplètes..." :
                language === 'ar' ? "مثال: صور ذات جودة منخفضة، معلومات غير كاملة..." :
                "Ex: Tswayer mech behin, ma3loumet na9sa..."
              }
              rows={4}
              className="mb-4"
            />
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                  setSelectedItem(null);
                }}
                className="flex-1"
              >
                {t('cancel')}
              </Button>
              <Button
                onClick={() => {
                  if (activeTab === 'producers' && selectedItem) {
                    handleRejectProducer(selectedItem.id);
                  } else if (activeTab === 'products' && selectedItem) {
                    handleRejectProduct(selectedItem.id);
                  }
                }}
                className="flex-1 bg-red-600 hover:bg-red-700"
                disabled={!rejectionReason.trim()}
              >
                {t('confirm')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
