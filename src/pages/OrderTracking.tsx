import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Clock, Truck, Package, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Progress } from '@/components/ui/progress';

const deliveryPersonNames = [
  'Rajesh Sharma',
  'Sita Devi',
  'Ramesh Kumar',
  'Anita Thapa',
  'Bikash Adhikari',
  'Sunita Rai',
  'Prakash Gurung',
  'Mina Tamang',
];

type OrderStatus = 'confirmed' | 'preparing' | 'on-the-way' | 'delivered';

const OrderTracking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const { orderId, total } = location.state || {};
  
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('confirmed');
  const [progress, setProgress] = useState(0);
  const [deliveryPerson] = useState(() => 
    deliveryPersonNames[Math.floor(Math.random() * deliveryPersonNames.length)]
  );

  useEffect(() => {
    if (!orderId) {
      navigate('/');
      return;
    }

    // Simulate order progress
    const statusFlow: OrderStatus[] = ['confirmed', 'preparing', 'on-the-way', 'delivered'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < statusFlow.length) {
        setOrderStatus(statusFlow[currentIndex]);
        setProgress((currentIndex / (statusFlow.length - 1)) * 100);
      } else {
        clearInterval(interval);
      }
    }, 5000); // Change status every 5 seconds

    return () => clearInterval(interval);
  }, [orderId, navigate]);

  const getStatusText = (status: OrderStatus) => {
    const texts = {
      confirmed: {
        en: 'Order Confirmed',
        ne: 'अर्डर पुष्टि भयो',
        hi: 'ऑर्डर कन्फर्म',
      },
      preparing: {
        en: 'Preparing Your Food',
        ne: 'खाना तयार गर्दै',
        hi: 'खाना तैयार हो रहा है',
      },
      'on-the-way': {
        en: 'On the Way',
        ne: 'बाटोमा छ',
        hi: 'रास्ते में है',
      },
      delivered: {
        en: 'Delivered',
        ne: 'डिलिभर भयो',
        hi: 'डिलीवर हो गया',
      },
    };
    
    return texts[status][language] || texts[status].en;
  };

  const statusSteps = [
    { id: 'confirmed', icon: CheckCircle2, label: language === 'ne' ? 'पुष्टि' : language === 'hi' ? 'पुष्टि' : 'Confirmed' },
    { id: 'preparing', icon: Clock, label: language === 'ne' ? 'तयारी' : language === 'hi' ? 'तैयारी' : 'Preparing' },
    { id: 'on-the-way', icon: Truck, label: language === 'ne' ? 'बाटोमा' : language === 'hi' ? 'रास्ते में' : 'On the Way' },
    { id: 'delivered', icon: Package, label: language === 'ne' ? 'डिलिभर' : language === 'hi' ? 'डिलीवर' : 'Delivered' },
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.id === orderStatus);
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
            {language === 'ne' ? 'अर्डर ट्र्याकिंग' : language === 'hi' ? 'ऑर्डर ट्रैकिंग' : 'Order Tracking'}
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <Card className="p-6">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                {getStatusText(orderStatus)}
              </h2>
              <p className="text-sm text-muted-foreground">
                {language === 'ne' ? 'अर्डर आईडी' : language === 'hi' ? 'ऑर्डर आईडी' : 'Order ID'}: {orderId}
              </p>
              <p className="mt-1 text-lg font-semibold text-primary">
                NPR {total?.toFixed(2)}
              </p>
            </div>

            <Progress value={progress} className="mb-8 h-2" />

            <div className="relative mb-8">
              <div className="flex justify-between">
                {statusSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const isActive = index <= getCurrentStepIndex();
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center" style={{ width: '25%' }}>
                      <div
                        className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-lg'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <StepIcon className="h-6 w-6" />
                      </div>
                      <span className={`text-center text-xs font-medium ${
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {(orderStatus === 'on-the-way' || orderStatus === 'delivered') && (
              <Card className="border-2 border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ne' ? 'डिलिभरी गर्ने व्यक्ति' : language === 'hi' ? 'डिलीवरी पर्सन' : 'Delivery Person'}
                    </p>
                    <p className="font-semibold text-foreground">{deliveryPerson}</p>
                  </div>
                </div>
              </Card>
            )}

            {orderStatus === 'delivered' && (
              <div className="mt-6 text-center">
                <p className="mb-4 text-lg font-semibold text-secondary">
                  {language === 'ne' ? '🎉 तपाईंको खाना डिलिभर भयो!' : language === 'hi' ? '🎉 आपका खाना डिलीवर हो गया!' : '🎉 Your food has been delivered!'}
                </p>
                <Button onClick={() => navigate('/')} size="lg">
                  {language === 'ne' ? 'थप अर्डर गर्नुहोस्' : language === 'hi' ? 'और ऑर्डर करें' : 'Order More'}
                </Button>
              </div>
            )}
          </Card>

          <Card className="border-2 border-secondary/20 bg-secondary/5 p-4">
            <p className="text-center text-sm text-muted-foreground">
              {language === 'ne' 
                ? 'अनुमानित डिलिभरी समय: 25-30 मिनेट'
                : language === 'hi'
                ? 'अनुमानित डिलीवरी समय: 25-30 मिनट'
                : 'Estimated Delivery Time: 25-30 minutes'}
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;
