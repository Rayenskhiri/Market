import { Language } from '../types';
import { useApp } from '../context/AppContext';
import { Languages } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function LanguageSwitcher() {
  const { language, setLanguage } = useApp();

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'fr', label: 'Français', native: 'Français' },
    { code: 'ar', label: 'Arabic', native: 'العربية' },
    { code: 'ar-tn', label: 'Tunisian', native: 'Tounsi' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Languages className="w-4 h-4" />
          <span className="hidden sm:inline">
            {languages.find(l => l.code === language)?.native}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? 'bg-primary/10' : ''}
          >
            <span className={lang.code === 'ar' ? 'font-arabic' : ''}>
              {lang.native}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
