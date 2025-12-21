import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ProducerRequestScreenProps {
  onBack: () => void;
}

export function ProducerRequestScreen({ onBack }: ProducerRequestScreenProps) {
  const { language, isRTL } = useApp();
  const t = useTranslation(language);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    nameFr: '',
    nameAr: '',
    phone: '',
    farmNameFr: '',
    farmNameAr: '',
    district: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to create producer request
    console.log('Producer request submitted:', formData);
    // In real implementation: POST /producer-requests
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t('requestSubmitted')}
          </h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
              <p className="text-sm text-yellow-800 text-left">
                {t('producerRequestNote')}
              </p>
            </div>
          </div>
          
          <div className="space-y-3 text-sm text-gray-600 mb-6">
            <div className="flex items-center justify-between py-2 border-b">
              <span>{t('phoneNumber')}</span>
              <span className="font-medium text-gray-900" dir="ltr">{formData.phone}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span>{t('requestPending')}</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                {t('pending')}
              </span>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mb-6">
            {language === 'fr' && "Nous vous contacterons dans les 24-48 heures."}
            {language === 'ar' && "سوف نتصل بك خلال 24-48 ساعة."}
            {language === 'ar-tn' && "Na3tiwek el khabbar fi 24-48 sa3a."}
          </p>
          
          <Button onClick={onBack} className="w-full" variant="outline">
            {t('back')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-green-600 to-emerald-700 text-white px-4 py-8">
        <button
          onClick={onBack}
          className="mb-4 text-white/90 hover:text-white transition"
        >
          ← {t('back')}
        </button>
        <h1 className="text-2xl font-bold mb-2">
          {t('producerRequestTitle')}
        </h1>
        <p className="text-sm text-green-100">
          {language === 'fr' && "Rejoignez notre réseau de producteurs locaux"}
          {language === 'ar' && "انضم إلى شبكة منتجينا المحليين"}
          {language === 'ar-tn' && "Indhammou lel réseau mta3 el producteurs locaux"}
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">
                {language === 'fr' && "Accès contrôlé par l'administrateur"}
                {language === 'ar' && "الوصول خاضع لموافقة المشرف"}
                {language === 'ar-tn' && "L'accès contrôlé par l'admin"}
              </p>
              <p className="text-blue-700">
                {t('producerRequestNote')}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' && "Nom complet (Français)"}
              {language === 'ar' && "الاسم الكامل (فرنسي)"}
              {language === 'ar-tn' && "Ism kemel (Français)"}
              <span className="text-red-500">*</span>
            </label>
            <Input
              required
              value={formData.nameFr}
              onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
              placeholder="Mohamed Ben Ali"
              className="min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' && "Nom complet (Arabe)"}
              {language === 'ar' && "الاسم الكامل (عربي)"}
              {language === 'ar-tn' && "Ism kemel (Arabe)"}
            </label>
            <Input
              value={formData.nameAr}
              onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
              placeholder="محمد بن علي"
              className="min-h-[44px]"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('phoneNumber')} <span className="text-red-500">*</span>
            </label>
            <Input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+216 XX XXX XXX"
              className="min-h-[44px]"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('farmName')} (Français) <span className="text-red-500">*</span>
            </label>
            <Input
              required
              value={formData.farmNameFr}
              onChange={(e) => setFormData({ ...formData, farmNameFr: e.target.value })}
              placeholder="Ferme Bio de Nabeul"
              className="min-h-[44px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('farmName')} (Arabe)
            </label>
            <Input
              value={formData.farmNameAr}
              onChange={(e) => setFormData({ ...formData, farmNameAr: e.target.value })}
              placeholder="مزرعة نابل العضوية"
              className="min-h-[44px]"
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('district')} <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              className="w-full min-h-[44px] rounded-md border border-gray-300 px-3 bg-white"
            >
              <option value="">
                {language === 'fr' && "Sélectionner une région"}
                {language === 'ar' && "اختر منطقة"}
                {language === 'ar-tn' && "I5tar manteqa"}
              </option>
              <option value="tunis">Tunis</option>
              <option value="ariana">Ariana</option>
              <option value="nabeul">Nabeul</option>
              <option value="ben-arous">Ben Arous</option>
              <option value="manouba">Manouba</option>
              <option value="bizerte">Bizerte</option>
              <option value="sousse">Sousse</option>
              <option value="monastir">Monastir</option>
              <option value="sfax">Sfax</option>
            </select>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full min-h-[44px]">
              {language === 'fr' && "Soumettre la demande"}
              {language === 'ar' && "إرسال الطلب"}
              {language === 'ar-tn' && "Eb3ath el talab"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
