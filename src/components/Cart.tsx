import { Minus, Plus, Trash2, X, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  open: boolean;
  onClose: () => void;
}

export const Cart = ({ open, onClose }: CartProps) => {
  const { language, t } = useLanguage();
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const DISCOUNT_THRESHOLD = 3000;
  const DISCOUNT_PERCENTAGE = 0.05;

  const discount = totalPrice >= DISCOUNT_THRESHOLD ? totalPrice * DISCOUNT_PERCENTAGE : 0;
  const finalTotal = totalPrice - discount;
  const hasDiscount = discount > 0;

  const getLocalizedName = (item: any) => {
    if (language === 'ne') return item.nameNe;
    if (language === 'hi') return item.nameHi;
    return item.name;
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    onClose();
    navigate('/payment', { 
      state: { 
        total: totalPrice,
        discount: discount,
      } 
    });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg bg-card">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between text-foreground">
            {t('yourCart')}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex h-full flex-col">
          {items.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-muted-foreground">{t('emptyCart')}</p>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto pb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-lg border bg-card p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{getLocalizedName(item)}</h4>
                        <p className="text-sm font-bold text-primary">NPR {item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium text-foreground">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto h-8 w-8 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                {hasDiscount && (
                  <div className="mb-4 rounded-lg border-2 border-secondary/30 bg-secondary/10 p-3">
                    <div className="flex items-center gap-2 text-secondary">
                      <Tag className="h-5 w-5" />
                      <span className="font-semibold">
                        {language === 'ne' 
                          ? '5% छुट लागू भयो!' 
                          : language === 'hi' 
                          ? '5% छूट लागू!' 
                          : '5% Discount Applied!'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {language === 'ne'
                        ? 'NPR 3000+ अर्डरमा'
                        : language === 'hi'
                        ? 'NPR 3000+ ऑर्डर पर'
                        : 'On orders over NPR 3000'}
                    </p>
                  </div>
                )}

                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>{t('total')}:</span>
                    <span>NPR {totalPrice.toFixed(2)}</span>
                  </div>
                  
                  {hasDiscount && (
                    <div className="flex items-center justify-between text-secondary">
                      <span>
                        {language === 'ne' ? 'छुट' : language === 'hi' ? 'छूट' : 'Discount'} (5%):
                      </span>
                      <span>- NPR {discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t pt-2 text-lg font-bold">
                    <span className="text-foreground">
                      {language === 'ne' ? 'कुल रकम' : language === 'hi' ? 'कुल राशि' : 'Final Total'}:
                    </span>
                    <span className="text-primary">NPR {finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {!hasDiscount && totalPrice > 0 && (
                  <p className="mb-3 text-center text-xs text-muted-foreground">
                    {language === 'ne'
                      ? `NPR ${(DISCOUNT_THRESHOLD - totalPrice).toFixed(2)} थप्नुहोस् र 5% छुट पाउनुहोस्!`
                      : language === 'hi'
                      ? `NPR ${(DISCOUNT_THRESHOLD - totalPrice).toFixed(2)} और जोड़ें और 5% छूट पाएं!`
                      : `Add NPR ${(DISCOUNT_THRESHOLD - totalPrice).toFixed(2)} more to get 5% discount!`}
                  </p>
                )}

                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={items.length === 0}>
                  {t('checkout')}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
