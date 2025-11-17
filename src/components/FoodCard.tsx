import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

interface FoodItem {
  id: number;
  name: string;
  nameNe: string;
  nameHi: string;
  price: number;
  image: string;
  category: string;
}

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard = ({ item }: FoodCardProps) => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  const getLocalizedName = () => {
    if (language === 'ne') return item.nameNe;
    if (language === 'hi') return item.nameHi;
    return item.name;
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-hover">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-foreground">{getLocalizedName()}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">NPR {item.price}</span>
          <Button
            size="sm"
            className="gap-1"
            onClick={() => addToCart(item)}
          >
            <Plus className="h-4 w-4" />
            {t('addToCart')}
          </Button>
        </div>
      </div>
    </Card>
  );
};
