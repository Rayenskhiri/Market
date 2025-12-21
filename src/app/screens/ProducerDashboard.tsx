import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Plus, Package, TrendingUp, DollarSign, AlertCircle, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Product, ProductStatus } from '../types';
import { mockProducts } from '../data/mockData';

export function ProducerDashboard() {
  const { language, user } = useApp();
  const t = useTranslation(language);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'pending' | 'approved' | 'rejected'>('all');
  
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productionCost, setProductionCost] = useState('');
  const [transportCost, setTransportCost] = useState('');
  const [stock, setStock] = useState('');

  const platformFeeRate = 0.08; // 8%

  // Mock products with different statuses
  const [products, setProducts] = useState<Product[]>([
    { ...mockProducts[0], status: 'approved' as ProductStatus },
    { ...mockProducts[1], status: 'pending' as ProductStatus },
    { ...mockProducts[2], status: 'draft' as ProductStatus },
    { ...mockProducts[3], status: 'rejected' as ProductStatus, adminComment: 'Photos de mauvaise qualité. Veuillez télécharger des images plus claires.' },
  ]);

  const calculateTotal = () => {
    const prod = parseFloat(productionCost) || 0;
    const trans = parseFloat(transportCost) || 0;
    const fee = (prod + trans) * platformFeeRate;
    return prod + trans + fee;
  };

  const handleSaveDraft = () => {
    if (!productName || !productionCost || !transportCost || !stock) {
      toast.error(language === 'fr' ? 'Veuillez remplir tous les champs' : 
                  language === 'ar' ? 'يرجى ملء جميع الحقول' : 
                  'Kammil kol el champs');
      return;
    }

    toast.success(t('draft') + ' ' + (language === 'fr' ? 'enregistré' : language === 'ar' ? 'محفوظ' : 'enregistré'));
    // In real implementation: POST /products with status: 'draft'
    console.log('Saved as draft');
    resetForm();
  };

  const handleSubmitForReview = () => {
    if (!productName || !productionCost || !transportCost || !stock) {
      toast.error(language === 'fr' ? 'Veuillez remplir tous les champs' : 
                  language === 'ar' ? 'يرجى ملء جميع الحقول' : 
                  'Kammil kol el champs');
      return;
    }

    toast.success(language === 'fr' ? 'Produit soumis pour révision' : 
                  language === 'ar' ? 'تم تقديم المنتج للمراجعة' : 
                  'Produit soumis pour révision');
    // In real implementation: POST /products/{id}/submit_for_review
    console.log('Submitted for review - waiting for admin approval');
    resetForm();
  };

  const resetForm = () => {
    setShowAddProduct(false);
    setProductName('');
    setProductDescription('');
    setProductionCost('');
    setTransportCost('');
    setStock('');
  };

  const getStatusBadge = (status: ProductStatus) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', icon: Package },
      pending: { color: 'bg-orange-100 text-orange-800', icon: Clock },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
      disabled: { color: 'bg-gray-100 text-gray-500', icon: XCircle },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant="secondary" className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {t(status === 'pending' ? 'pendingReview' : status)}
      </Badge>
    );
  };

  const filteredProducts = products.filter(p => 
    activeTab === 'all' || p.status === activeTab
  );

  if (!user || user.role !== 'producer') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <Package className="w-16 h-16 text-gray-300 mx-auto" />
          <h2 className="text-gray-500">
            {language === 'fr' && "Espace Producteur"}
            {language === 'ar' && "مساحة المنتج"}
            {language === 'ar-tn' && "Espace Producteur"}
          </h2>
          <p className="text-sm text-gray-400">
            {language === 'fr' && "Vous devez être connecté en tant que producteur"}
            {language === 'ar' && "يجب تسجيل الدخول كمنتج"}
            {language === 'ar-tn' && "Lazem tconnecti ken producteur"}
          </p>
        </div>
      </div>
    );
  }

  if (showAddProduct) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white p-4">
          <h1 className="text-xl font-bold">{t('addProduct')}</h1>
          <p className="text-sm text-green-100 mt-1">
            {language === 'fr' && "Soumettez votre produit pour approbation"}
            {language === 'ar' && "أرسل منتجك للموافقة"}
            {language === 'ar-tn' && "Eb3ath el produit mta3ek lel approbation"}
          </p>
        </div>

        <div className="p-4 space-y-6">
          {/* Admin Control Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">
                  {language === 'fr' && "Contrôle administrateur requis"}
                  {language === 'ar' && "مطلوب موافقة المشرف"}
                  {language === 'ar-tn' && "Control administrateur obligatoire"}
                </p>
                <p className="text-blue-700">
                  {language === 'fr' && "Votre produit sera visible aux clients uniquement après approbation par l'administrateur."}
                  {language === 'ar' && "سيكون منتجك مرئيًا للعملاء فقط بعد موافقة المشرف."}
                  {language === 'ar-tn' && "El produit mta3ek yetcharreg lel clients ken ba3d approbation mel admin."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">{t('productName')} (Français) *</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Ex: Tomates fraîches"
                className="min-h-[48px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t('productDescription')} (Français)</Label>
              <Textarea
                id="description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Décrivez votre produit..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productionCost">{t('productionCost')} (TND/kg) *</Label>
              <Input
                id="productionCost"
                type="number"
                step="0.01"
                value={productionCost}
                onChange={(e) => setProductionCost(e.target.value)}
                placeholder="2.50"
                className="min-h-[48px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transportCost">{t('transportCost')} (TND/kg) *</Label>
              <Input
                id="transportCost"
                type="number"
                step="0.01"
                value={transportCost}
                onChange={(e) => setTransportCost(e.target.value)}
                placeholder="0.50"
                className="min-h-[48px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">
                {language === 'fr' && "Stock disponible (kg)"}
                {language === 'ar' && "المخزون المتاح (كجم)"}
                {language === 'ar-tn' && "Stock disponible (kg)"}
                *
              </Label>
              <Input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="100"
                className="min-h-[48px]"
              />
            </div>
          </div>

          {/* Price Preview */}
          {productionCost && transportCost && (
            <div className="bg-green-50 rounded-lg p-4 space-y-3">
              <h4 className="text-primary font-medium">
                {language === 'fr' && "Aperçu du prix"}
                {language === 'ar' && "معاينة السعر"}
                {language === 'ar-tn' && "Aperçu el prix"}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{t('productionCost')}</span>
                  <span>{parseFloat(productionCost).toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('transportCost')}</span>
                  <span>{parseFloat(transportCost).toFixed(2)} TND</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('platformFee')} (8%)</span>
                  <span>
                    {((parseFloat(productionCost) + parseFloat(transportCost)) * platformFeeRate).toFixed(2)} TND
                  </span>
                </div>
                <div className="border-t border-green-200 pt-2 flex justify-between font-medium">
                  <span>{t('total')}</span>
                  <span className="text-primary">
                    {calculateTotal().toFixed(2)} TND/kg
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleSubmitForReview}
              className="w-full bg-primary hover:bg-primary/90 min-h-[48px]"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              {t('submitForReview')}
            </Button>
            <Button
              onClick={handleSaveDraft}
              variant="outline"
              className="w-full min-h-[48px]"
            >
              <Package className="w-5 h-5 mr-2" />
              {t('saveDraft')}
            </Button>
            <Button
              onClick={resetForm}
              variant="ghost"
              className="w-full min-h-[48px]"
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white p-4">
        <h1 className="text-xl font-bold">
          {language === 'fr' && "Tableau de bord"}
          {language === 'ar' && "لوحة التحكم"}
          {language === 'ar-tn' && "Tableau de bord"}
        </h1>
        <p className="text-sm text-green-100">{user.producerProfile?.name}</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Producer Status Alert */}
        {user.producerProfile?.status === 'active' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div className="text-sm text-green-800">
                <p className="font-medium">{t('verifiedByAdmin')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-4 text-center">
            <Package className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-sm text-gray-600">{t('myProducts')}</div>
            <div className="text-xl font-bold">{products.length}</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">{t('pending')}</div>
            <div className="text-xl font-bold text-orange-600">
              {products.filter(p => p.status === 'pending').length}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">{t('approved')}</div>
            <div className="text-xl font-bold text-green-600">
              {products.filter(p => p.status === 'approved').length}
            </div>
          </div>
        </div>

        {/* Add Product Button */}
        <Button
          onClick={() => setShowAddProduct(true)}
          className="w-full bg-primary hover:bg-primary/90 min-h-[48px]"
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('addProduct')}
        </Button>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg p-2 flex gap-2 overflow-x-auto">
          {(['all', 'draft', 'pending', 'approved', 'rejected'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab === 'all' ? (language === 'fr' ? 'Tous' : language === 'ar' ? 'الكل' : 'Kol') : t(tab === 'pending' ? 'pendingReview' : tab)}
              <span className="ml-2 text-xs">
                ({tab === 'all' ? products.length : products.filter(p => p.status === tab).length})
              </span>
            </button>
          ))}
        </div>

        {/* Products List */}
        <div className="space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>{t('noProducts')}</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.name[language]}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {product.name[language]}
                      </h3>
                      {getStatusBadge(product.status)}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description[language]}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t('total')}</span>
                      <span className="font-semibold text-primary">
                        {product.totalPrice.toFixed(2)} TND
                      </span>
                    </div>

                    {/* Admin Comment for Rejected */}
                    {product.status === 'rejected' && product.adminComment && (
                      <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-red-800 mb-1">
                          {t('rejectionReason')}:
                        </p>
                        <p className="text-xs text-red-700">{product.adminComment}</p>
                      </div>
                    )}

                    {/* Pending Notice */}
                    {product.status === 'pending' && (
                      <div className="mt-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <p className="text-xs text-orange-800">
                          {language === 'fr' && "En attente d'approbation par l'administrateur"}
                          {language === 'ar' && "في انتظار موافقة المشرف"}
                          {language === 'ar-tn' && "F'intidhar approbation mel admin"}
                        </p>
                      </div>
                    )}

                    {/* Approved Notice */}
                    {product.status === 'approved' && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-green-700">
                        <Eye className="w-4 h-4" />
                        <span>
                          {language === 'fr' && "Visible aux clients"}
                          {language === 'ar' && "مرئي للعملاء"}
                          {language === 'ar-tn' && "Visible lel clients"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-lg p-4 space-y-2">
          <h4 className="text-primary font-medium flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {language === 'fr' && "Processus de publication"}
            {language === 'ar' && "عملية النشر"}
            {language === 'ar-tn' && "Processus de publication"}
          </h4>
          <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
            <li>
              {language === 'fr' && "Créez et soumettez votre produit pour révision"}
              {language === 'ar' && "أنشئ وقدم منتجك للمراجعة"}
              {language === 'ar-tn' && "Créer w eb3ath el produit lel révision"}
            </li>
            <li>
              {language === 'fr' && "L'administrateur examine et approuve"}
              {language === 'ar' && "يقوم المشرف بالمراجعة والموافقة"}
              {language === 'ar-tn' && "L'admin ychouf w yconfirmi"}
            </li>
            <li>
              {language === 'fr' && "Votre produit devient visible aux clients"}
              {language === 'ar' && "يصبح منتجك مرئيًا للعملاء"}
              {language === 'ar-tn' && "El produit mta3ek yetcharreg lel clients"}
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
