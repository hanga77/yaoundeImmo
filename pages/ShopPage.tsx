

import React, { useState, useMemo } from 'react';
import { useData } from '../DataContext';
import ProductCard from '../components/ProductCard';

const ShopPage: React.FC = () => {
  const { products } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const allCategories = products.map(p => p.category);
    return ['All', ...Array.from(new Set(allCategories))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="bg-brand-light">
      {/* Page Header */}
      <div className="bg-white py-12 text-center border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-brand-slate">Notre Boutique</h1>
          <p className="mt-2 text-lg text-brand-slate/90">Découvrez notre sélection d'articles pour embellir votre intérieur.</p>
        </div>
      </div>

      {/* Shop Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
              <h3 className="text-xl font-bold text-brand-slate mb-4">Catégories</h3>
              <hr className="border-gray-200" />
              <div className="mt-4 space-y-3">
                {categories.map(category => {
                  const isSelected = selectedCategory === category;
                  const displayName = category === 'All' ? 'Toutes les catégories' : category;

                  if (isSelected) {
                    return (
                      <button
                        key={category}
                        disabled
                        className="w-full text-center px-4 py-2 rounded-md bg-brand-gold text-white font-semibold text-sm shadow cursor-default"
                      >
                        {displayName}
                      </button>
                    );
                  } else {
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className="w-full text-left text-brand-slate/90 hover:text-brand-slate font-medium transition-colors"
                      >
                        {displayName}
                      </button>
                    );
                  }
                })}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="w-full md:w-3/4 lg:w-4/5">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow-md">
                <p className="text-xl text-brand-slate/90">Aucun produit trouvé dans cette catégorie.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;