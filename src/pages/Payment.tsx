import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Smartphone, Building2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

const paymentMethods = [
  {
    id: 'esewa',
    name: 'eSewa',
    nameNe: 'ईसेवा',
    nameHi: 'ईसेवा',
    icon: Smartphone,
    url: 'https://esewa.com.np',
  },
  {
    id: 'khalti',
    name: 'Khalti',
    nameNe: 'खल्ती',
    nameHi: 'खल्ती',
    icon: Smartphone,
    url: 'https://khalti.com',
  },
  {
    id: 'ime',
    name: 'IME Pay',
    nameNe: 'आईएमई पे',
    nameHi: 'आईएमई पे',
    icon: Building2,
    url: 'https://imepay.com.np',
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    nameNe: 'क्रेडिट/डेबिट कार्ड',
    nameHi: 'क्रेडिट/डेबिट कार्ड',
    icon: CreditCard,
    url: 'https://payment-gateway.example.com',
  },
];

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const { total, discount } = location.state || { total: 0, discount: 0 };
  const finalTotal = total - discount;

  const getLocalizedName = (method: typeof paymentMethods[0]) => {
    if (language === 'ne') return method.nameNe;
    if (language === 'hi') return method.nameHi;
    return method.name;
  };

  const handlePayment = () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    const method = paymentMethods.find(m => m.id === selectedMethod);
    if (method) {
      // Generate random order ID
      const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      toast.success('Redirecting to payment gateway...');
      
      // Store order info in sessionStorage
      sessionStorage.setItem('currentOrder', JSON.stringify({
        orderId,
        total: finalTotal,
        timestamp: Date.now(),
      }));

      // Simulate redirect to external payment gateway
      setTimeout(() => {
        // In production, this would redirect to actual payment gateway
        // window.location.href = `${method.url}?amount=${finalTotal}&order_id=${orderId}`;
        
        // For demo, go to order tracking
        navigate('/order-tracking', { 
          state: { 
            orderId,
            total: finalTotal,
          } 
        });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-4 text-xl font-bold text-foreground">
            {language === 'ne' ? 'भुक्तानी विधि' : language === 'hi' ? 'भुगतान विधि' : 'Payment Method'}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-2xl p-6">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              {language === 'ne' ? 'भुक्तानी विधि चयन गर्नुहोस्' : language === 'hi' ? 'भुगतान विधि चुनें' : 'Select Payment Method'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'ne' ? 'सुरक्षित भुक्तानी गेटवे मार्फत भुक्तानी गर्नुहोस्' : language === 'hi' ? 'सुरक्षित भुगतान गेटवे के माध्यम से भुगतान करें' : 'Pay securely through trusted payment gateways'}
            </p>
          </div>

          <div className="mb-6 space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all hover:border-primary ${
                  selectedMethod === method.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg p-3 ${selectedMethod === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <method.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{getLocalizedName(method)}</h3>
                  </div>
                  <div className={`h-5 w-5 rounded-full border-2 ${
                    selectedMethod === method.id
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {selectedMethod === method.id && (
                      <div className="h-full w-full rounded-full bg-primary-foreground scale-50"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mb-6 rounded-lg bg-muted p-4">
            <div className="space-y-2">
              {discount > 0 && (
                <>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{language === 'ne' ? 'उपकुल' : language === 'hi' ? 'उपयोग' : 'Subtotal'}</span>
                    <span>NPR {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-secondary">
                    <span>{language === 'ne' ? 'छुट (5%)' : language === 'hi' ? 'छूट (5%)' : 'Discount (5%)'}</span>
                    <span>- NPR {discount.toFixed(2)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between border-t pt-2 text-lg font-bold">
                <span className="text-foreground">{language === 'ne' ? 'कुल रकम' : language === 'hi' ? 'कुल राशि' : 'Total Amount'}</span>
                <span className="text-primary">NPR {finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={handlePayment}
            disabled={!selectedMethod}
          >
            {language === 'ne' ? 'भुक्तानी गर्नुहोस्' : language === 'hi' ? 'भुगतान करें' : 'Proceed to Payment'}
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default Payment;
