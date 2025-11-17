import { Minus, Plus, Trash2, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface CartProps {
  open: boolean;
  onClose: () => void;
}

export const Cart = ({ open, onClose }: CartProps) => {
  const { language, t } = useLanguage();
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const getLocalizedName = (item: any) => {
    if (language === 'ne') return item.nameNe;
    if (language === 'hi') return item.nameHi;
    return item.name;
  };

  const handleCheckout = () => {
    toast.success('Order placed successfully!');
    onClose();
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
                <div className="mb-4 flex items-center justify-between text-lg font-bold">
                  <span className="text-foreground">{t('total')}:</span>
                  <span className="text-primary">NPR {totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
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
