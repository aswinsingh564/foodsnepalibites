import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategoryFilter } from '@/components/CategoryFilter';
import { FoodCard } from '@/components/FoodCard';
import { Cart } from '@/components/Cart';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CartProvider } from '@/contexts/CartContext';

import momoImage from '@/assets/momo.jpg';
import biryaniImage from '@/assets/biryani.jpg';
import dalBhatImage from '@/assets/dalbhat.jpg';
import chowmeinImage from '@/assets/chowmein.jpg';
import chickenImage from '@/assets/chicken.jpg';
import pizzaImage from '@/assets/pizza.jpg';

const foodItems = [
  {
    id: 1,
    name: 'Momo',
    nameNe: 'मोमो',
    nameHi: 'मोमो',
    price: 150,
    image: momoImage,
    category: 'nepali',
  },
  {
    id: 2,
    name: 'Chicken Biryani',
    nameNe: 'चिकन बिर्यानी',
    nameHi: 'चिकन बिरयानी',
    price: 350,
    image: biryaniImage,
    category: 'indian',
  },
  {
    id: 3,
    name: 'Dal Bhat',
    nameNe: 'दाल भात',
    nameHi: 'दाल भात',
    price: 250,
    image: dalBhatImage,
    category: 'nepali',
  },
  {
    id: 4,
    name: 'Chow Mein',
    nameNe: 'चाउमिन',
    nameHi: 'चाउमीन',
    price: 180,
    image: chowmeinImage,
    category: 'chinese',
  },
  {
    id: 5,
    name: 'Fried Chicken',
    nameNe: 'फ्राइड चिकन',
    nameHi: 'फ्राइड चिकन',
    price: 400,
    image: chickenImage,
    category: 'fastFood',
  },
  {
    id: 6,
    name: 'Pizza',
    nameNe: 'पिज्जा',
    nameHi: 'पिज़्ज़ा',
    price: 550,
    image: pizzaImage,
    category: 'fastFood',
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = foodItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.nameNe.includes(searchQuery) ||
                          item.nameHi.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Header onCartClick={() => setIsCartOpen(true)} />
          <Hero onSearch={setSearchQuery} />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <section className="container mx-auto px-4 pb-16">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </section>
          <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
};

export default Index;
