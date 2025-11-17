import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = ['all', 'nepali', 'indian', 'chinese', 'fastFood'];

export const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="mb-4 text-xl font-semibold text-foreground">{t('categories')}</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => onSelectCategory(category)}
            className="rounded-full"
          >
            {t(category === 'all' ? 'allCategories' : category)}
          </Button>
        ))}
      </div>
    </div>
  );
};
