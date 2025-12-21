import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../i18n';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { User, Phone, LogIn, Store, Shield, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileScreenProps {
  onNavigate?: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps = {}) {
  const { language, user, setUser } = useApp();
  const t = useTranslation(language);
  
  const [authStep, setAuthStep] = useState<'phone' | 'otp' | 'authenticated'>(
    user ? 'authenticated' : 'phone'
  );
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');

  const handleSendOTP = () => {
    if (!phone) {
      toast.error('Veuillez entrer votre numéro de téléphone');
      return;
    }
    // Mock OTP send
    toast.success('Code OTP envoyé!');
    setAuthStep('otp');
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast.error('Veuillez entrer le code à 6 chiffres');
      return;
    }
    // Mock OTP verification
    setAuthStep('authenticated');
    setUser({
      id: 'user-' + Date.now(),
      name: name || 'Utilisateur',
      phone,
      role: 'consumer',
    });
    toast.success('Connexion réussie!');
  };

  const handleLogout = () => {
    setUser(null);
    setAuthStep('phone');
    setPhone('');
    setOtp('');
    setName('');
    toast.success('Déconnexion réussie');
  };

  if (authStep === 'phone') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1>{t('profile')}</h1>
          <LanguageSwitcher />
        </div>

        <div className="p-4 space-y-6 max-w-md mx-auto mt-8">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h2>{t('login')}</h2>
            <p className="text-sm text-gray-600">
              Connectez-vous pour gérer vos commandes
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom (optionnel)</Label>
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

            <Button
              onClick={handleSendOTP}
              className="w-full bg-primary hover:bg-primary/90 min-h-[48px]"
            >
              <Phone className="w-5 h-5 mr-2" />
              Envoyer le code OTP
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (authStep === 'otp') {
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1>{t('profile')}</h1>
          <LanguageSwitcher />
        </div>

        <div className="p-4 space-y-6 max-w-md mx-auto mt-8">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-10 h-10 text-primary" />
            </div>
            <h2>{t('enterOTP')}</h2>
            <p className="text-sm text-gray-600">
              Code envoyé au {phone}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 space-y-6">
            <div className="space-y-2">
              <Label>Code OTP (6 chiffres)</Label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <Button
              onClick={handleVerifyOTP}
              className="w-full bg-primary hover:bg-primary/90 min-h-[48px]"
            >
              {t('confirm')}
            </Button>

            <button
              onClick={handleSendOTP}
              className="w-full text-sm text-primary hover:underline"
            >
              {t('resendOTP')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1>{t('profile')}</h1>
        <LanguageSwitcher />
      </div>

      <div className="p-4 space-y-4">
        {/* User Info */}
        <div className="bg-white rounded-lg p-6 text-center space-y-3">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h2>{user?.name}</h2>
          <p className="text-sm text-gray-600">{user?.phone}</p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-lg divide-y divide-gray-200">
          <div className="p-4">
            <h3 className="mb-3">Paramètres</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">Langue</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full min-h-[48px]"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Déconnexion
          </Button>
        </div>

        {/* Info */}
        <div className="bg-green-50 rounded-lg p-4 space-y-2">
          <h4 className="text-primary">Suq Direct</h4>
          <p className="text-sm text-gray-600">
            Connectant directement les citoyens tunisiens aux producteurs locaux.
            Prix justes, transparents, sans intermédiaires.
          </p>
        </div>
      </div>
    </div>
  );
}