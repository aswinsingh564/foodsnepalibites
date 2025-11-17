import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ne' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appName: 'FoodExpress',
    searchPlaceholder: 'Search for dishes...',
    categories: 'Categories',
    allCategories: 'All',
    nepali: 'Nepali',
    indian: 'Indian',
    chinese: 'Chinese',
    fastFood: 'Fast Food',
    addToCart: 'Add to Cart',
    cart: 'Cart',
    yourCart: 'Your Cart',
    emptyCart: 'Your cart is empty',
    total: 'Total',
    checkout: 'Checkout',
    orderNow: 'Order Now',
    popularDishes: 'Popular Dishes',
    quantity: 'Qty',
    remove: 'Remove',
  },
  ne: {
    appName: 'फूडएक्सप्रेस',
    searchPlaceholder: 'खाना खोज्नुहोस्...',
    categories: 'श्रेणीहरू',
    allCategories: 'सबै',
    nepali: 'नेपाली',
    indian: 'भारतीय',
    chinese: 'चाइनिज',
    fastFood: 'फास्ट फूड',
    addToCart: 'कार्टमा थप्नुहोस्',
    cart: 'कार्ट',
    yourCart: 'तपाईंको कार्ट',
    emptyCart: 'तपाईंको कार्ट खाली छ',
    total: 'जम्मा',
    checkout: 'चेकआउट',
    orderNow: 'अर्डर गर्नुहोस्',
    popularDishes: 'लोकप्रिय खानाहरू',
    quantity: 'संख्या',
    remove: 'हटाउनुहोस्',
  },
  hi: {
    appName: 'फूडएक्सप्रेस',
    searchPlaceholder: 'व्यंजन खोजें...',
    categories: 'श्रेणियाँ',
    allCategories: 'सभी',
    nepali: 'नेपाली',
    indian: 'भारतीय',
    chinese: 'चाइनीज़',
    fastFood: 'फास्ट फूड',
    addToCart: 'कार्ट में डालें',
    cart: 'कार्ट',
    yourCart: 'आपकी कार्ट',
    emptyCart: 'आपकी कार्ट खाली है',
    total: 'कुल',
    checkout: 'चेकआउट',
    orderNow: 'ऑर्डर करें',
    popularDishes: 'लोकप्रिय व्यंजन',
    quantity: 'मात्रा',
    remove: 'हटाएं',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
