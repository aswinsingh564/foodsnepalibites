import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-bg.jpg';

interface HeroProps {
  onSearch: (query: string) => void;
}

export const Hero = ({ onSearch }: HeroProps) => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 opacity-10">
        <img src={heroImage} alt="Hero" className="h-full w-full object-cover" />
      </div>
      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            {t('orderNow')}
          </h2>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            {t('popularDishes')}
          </p>
          <div className="relative mx-auto max-w-lg">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="h-12 pl-10 pr-4 text-base bg-card"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
