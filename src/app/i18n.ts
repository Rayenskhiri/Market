import { Language } from './types';

export const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    categories: 'Catégories',
    cart: 'Panier',
    profile: 'Profil',
    orders: 'Commandes',
    
    // Common
    search: 'Rechercher des produits...',
    addToCart: 'Ajouter au panier',
    viewCart: 'Voir le panier',
    checkout: 'Commander',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    continue: 'Continuer',
    back: 'Retour',
    save: 'Enregistrer',
    
    // Product
    priceBreakdown: 'Détail du prix',
    productionCost: 'Coût de production',
    transportCost: 'Coût de transport',
    platformFee: 'Frais de plateforme',
    total: 'Total',
    fresh: 'Frais',
    veryFresh: 'Très frais',
    today: "Aujourd'hui",
    verified: 'Vérifié',
    inStock: 'En stock',
    outOfStock: 'Rupture de stock',
    
    // Cart
    emptyCart: 'Votre panier est vide',
    removeFromCart: 'Retirer',
    quantity: 'Quantité',
    subtotal: 'Sous-total',
    
    // Checkout
    deliveryAddress: 'Adresse de livraison',
    deliverySlot: 'Créneau de livraison',
    paymentMethod: 'Mode de paiement',
    cashOnDelivery: 'Paiement à la livraison',
    onlinePayment: 'Paiement en ligne',
    placeOrder: 'Passer la commande',
    orderConfirmed: 'Commande confirmée',
    orderNumber: 'Numéro de commande',
    
    // Auth
    phoneNumber: 'Numéro de téléphone',
    enterOTP: 'Entrez le code OTP',
    resendOTP: 'Renvoyer le code',
    login: 'Connexion',
    guestCheckout: 'Commander sans compte',
    
    // Producer
    addProduct: 'Ajouter un produit',
    myProducts: 'Mes produits',
    newOrders: 'Nouvelles commandes',
    productName: 'Nom du produit',
    productDescription: 'Description',
    uploadPhotos: 'Télécharger des photos',
    saveDraft: 'Enregistrer le brouillon',
    submitForReview: 'Soumettre pour révision',
    
    // Producer Request
    producerRequestTitle: "Demande d'accès producteur",
    producerRequestNote: "Votre demande sera examinée par l'équipe. Vous recevrez une notification une fois approuvé.",
    requestSubmitted: 'Demande soumise',
    requestPending: 'En attente de révision',
    farmName: 'Nom de la ferme',
    district: 'Région',
    
    // Product Status
    draft: 'Brouillon',
    pendingReview: 'En attente de révision',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    disabled: 'Désactivé',
    productNotAvailable: 'Produit non disponible — en attente d\'approbation',
    
    // Admin
    adminDashboard: 'Tableau de bord admin',
    pendingProducers: 'Producteurs en attente',
    pendingProducts: 'Produits en attente',
    approveProducer: 'Approuver le producteur',
    rejectProducer: 'Rejeter',
    approveProduct: 'Approuver & publier',
    rejectProduct: 'Rejeter',
    rejectionReason: 'Raison du rejet',
    moderationQueue: 'File de modération',
    verifiedByAdmin: 'Vérifié par Admin',
    
    // Categories
    vegetables: 'Légumes',
    fruits: 'Fruits',
    poultry: 'Volaille',
    dairy: 'Produits laitiers',
    meat: 'Viande',
    fish: 'Poisson',
    grains: 'Céréales',
    honey: 'Miel',
    
    // Order Status
    pending: 'En attente',
    confirmed: 'Confirmée',
    preparing: 'En préparation',
    inTransit: 'En livraison',
    delivered: 'Livrée',
    cancelled: 'Annulée',
    
    // Messages
    noProducts: 'Aucun produit trouvé',
    noOrders: 'Aucune commande',
    fairPrices: 'Prix justes, transparents',
    directFromProducers: 'Directement des producteurs',
    noMiddlemen: 'Sans intermédiaires',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    categories: 'التصنيفات',
    cart: 'السلة',
    profile: 'الملف الشخصي',
    orders: 'الطلبات',
    
    // Common
    search: 'البحث عن منتجات...',
    addToCart: 'أضف إلى السلة',
    viewCart: 'عرض السلة',
    checkout: 'إتمام الطلب',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    continue: 'متابعة',
    back: 'رجوع',
    save: 'حفظ',
    
    // Product
    priceBreakdown: 'تفصيل السعر',
    productionCost: 'تكلفة الإنتاج',
    transportCost: 'تكلفة النقل',
    platformFee: 'رسوم المنصة',
    total: 'المجموع',
    fresh: 'طازج',
    veryFresh: 'طازج جداً',
    today: 'اليوم',
    verified: 'موثق',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
    
    // Cart
    emptyCart: 'سلتك فارغة',
    removeFromCart: 'إزالة',
    quantity: 'الكمية',
    subtotal: 'المجموع الفرعي',
    
    // Checkout
    deliveryAddress: 'عنوان التسليم',
    deliverySlot: 'وقت التسليم',
    paymentMethod: 'طريقة الدفع',
    cashOnDelivery: 'الدفع عند الاستلام',
    onlinePayment: 'الدفع عبر الإنترنت',
    placeOrder: 'تأكيد الطلب',
    orderConfirmed: 'تم تأكيد الطلب',
    orderNumber: 'رقم الطلب',
    
    // Auth
    phoneNumber: 'رقم الهاتف',
    enterOTP: 'أدخل رمز التحقق',
    resendOTP: 'إعادة إرسال',
    login: 'تسجيل الدخول',
    guestCheckout: 'طلب بدون حساب',
    
    // Producer
    addProduct: 'إضافة منتج',
    myProducts: 'منتجاتي',
    newOrders: 'طلبات جديدة',
    productName: 'اسم المنتج',
    productDescription: 'الوصف',
    uploadPhotos: 'تحميل الصور',
    saveDraft: 'حفظ المسودة',
    submitForReview: 'تقديم للمراجعة',
    
    // Producer Request
    producerRequestTitle: "طلب الوصول كمنتج",
    producerRequestNote: "سيتم مراجعة طلبك من قبل الفريق. ستحصل على إشعار عند الموافقة.",
    requestSubmitted: 'تم تقديم الطلب',
    requestPending: 'في انتظار المراجعة',
    farmName: 'اسم المزرعة',
    district: 'المنطقة',
    
    // Product Status
    draft: 'مسودة',
    pendingReview: 'في انتظار المراجعة',
    approved: 'مقبول',
    rejected: 'مرفوض',
    disabled: 'معطل',
    productNotAvailable: 'المنتج غير متاح - في انتظار الموافقة',
    
    // Admin
    adminDashboard: 'لوحة تحكم المشرف',
    pendingProducers: 'منتجون في انتظار الموافقة',
    pendingProducts: 'منتجات في انتظار الموافقة',
    approveProducer: 'موافقة المنتج',
    rejectProducer: 'رفض',
    approveProduct: 'موافقة ونشر',
    rejectProduct: 'رفض',
    rejectionReason: 'سبب الرفض',
    moderationQueue: ' قائمة المراجعة',
    verifiedByAdmin: 'تم التحقق من قبل المشرف',
    
    // Categories
    vegetables: 'خضروات',
    fruits: 'فواكه',
    poultry: 'دواجن',
    dairy: 'ألبان',
    meat: 'لحوم',
    fish: 'أسماك',
    grains: 'حبوب',
    honey: 'عسل',
    
    // Order Status
    pending: 'قيد الانتظار',
    confirmed: 'مؤكد',
    preparing: 'قيد التحضير',
    inTransit: 'قيد التوصيل',
    delivered: 'تم التوصيل',
    cancelled: 'ملغي',
    
    // Messages
    noProducts: 'لا توجد منتجات',
    noOrders: 'لا توجد طلبات',
    fairPrices: 'أسعار عادلة وشفافة',
    directFromProducers: 'مباشرة من المنتجين',
    noMiddlemen: 'بدون وسطاء',
  },
  'ar-tn': {
    // Navigation (Tunisian Arabic in Latin script)
    home: 'Dar',
    categories: 'Aqsem',
    cart: 'Chariot',
    profile: 'Profil',
    orders: 'Commandes mta3i',
    
    // Common
    search: 'Lawej 3al produit...',
    addToCart: 'Zid lel chariot',
    viewCart: 'Chouf el chariot',
    checkout: 'Confirmi',
    cancel: 'Annuli',
    confirm: 'Confirmi',
    continue: 'Kammel',
    back: 'Raj3',
    save: 'Sajjel',
    
    // Product
    priceBreakdown: 'Tafsil el prix',
    productionCost: 'Kolfet el production',
    transportCost: 'Kolfet el transport',
    platformFee: 'Frais el plateforme',
    total: 'Total',
    fresh: 'Tazi',
    veryFresh: 'Tazi barcha',
    today: 'El youm',
    verified: 'Moutamad',
    inStock: 'Mawjoud',
    outOfStock: 'Mech mawjoud',
    
    // Cart
    emptyCart: 'El chariot faragh',
    removeFromCart: 'Na77i',
    quantity: 'El kammiya',
    subtotal: 'Sous-total',
    
    // Checkout
    deliveryAddress: '3onwen el livraison',
    deliverySlot: 'Wa9t el livraison',
    paymentMethod: 'Tariqa el khles',
    cashOnDelivery: 'Khles wa9t el livraison',
    onlinePayment: 'Khles online',
    placeOrder: 'Confirmi el commande',
    orderConfirmed: 'El commande confirmé',
    orderNumber: 'Numéro el commande',
    
    // Auth
    phoneNumber: 'Numéro téléphone',
    enterOTP: 'Dakhel el code',
    resendOTP: "I3awwed eb3ath",
    login: 'Connexion',
    guestCheckout: 'Commandi bla compte',
    
    // Producer
    addProduct: 'Zid produit',
    myProducts: 'Produits mta3i',
    newOrders: 'Commandes jdod',
    productName: 'Ism el produit',
    productDescription: 'Description',
    uploadPhotos: 'Chargi tswayer',
    saveDraft: 'Sajjel el taswir',
    submitForReview: 'T3awed el t3awed',
    
    // Producer Request
    producerRequestTitle: "Demande d'accès producteur",
    producerRequestNote: "Votre demande sera examinée par l'équipe. Vous recevrez une notification une fois approuvé.",
    requestSubmitted: 'Demande soumise',
    requestPending: 'En attente de révision',
    farmName: 'Nom de la ferme',
    district: 'Région',
    
    // Product Status
    draft: 'Brouillon',
    pendingReview: 'En attente de révision',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    disabled: 'Désactivé',
    productNotAvailable: 'Produit non disponible — en attente d\'approbation',
    
    // Admin
    adminDashboard: 'Tableau de bord admin',
    pendingProducers: 'Producteurs en attente',
    pendingProducts: 'Produits en attente',
    approveProducer: 'Approuver le producteur',
    rejectProducer: 'Rejeter',
    approveProduct: 'Approuver & publier',
    rejectProduct: 'Rejeter',
    rejectionReason: 'Raison du rejet',
    moderationQueue: 'File de modération',
    verifiedByAdmin: 'Vérifié par Admin',
    
    // Categories
    vegetables: 'Khodhra',
    fruits: 'Ghalla',
    poultry: 'Djej',
    dairy: 'L7lib w mchta9atou',
    meat: 'L7am',
    fish: '7out',
    grains: '9amh',
    honey: '3asal',
    
    // Order Status
    pending: 'Mustantar',
    confirmed: 'Confirmé',
    preparing: 'Yethadher',
    inTransit: 'Fil tri9',
    delivered: 'Wesel',
    cancelled: 'Annulé',
    
    // Messages
    noProducts: 'Ma famma produits',
    noOrders: 'Ma famma commandes',
    fairPrices: 'Prix 3adel w wadhah',
    directFromProducers: 'Direct mel producteurs',
    noMiddlemen: 'Bla wasit',
  },
};

export function useTranslation(language: Language) {
  return (key: keyof typeof translations.fr): string => {
    return translations[language][key] || translations.fr[key];
  };
}