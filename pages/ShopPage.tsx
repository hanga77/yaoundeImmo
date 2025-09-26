
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
      <div className="bg-brand-blue py-12 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif">Notre Boutique</h1>
          <p className="mt-2 text-lg text-gray-300">Découvrez notre sélection d'articles pour embellir votre intérieur.</p>
        </div>
      </div>

      {/* Shop Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
              <h3 className="text-lg font-bold text-brand-dark mb-4 border-b pb-2">Catégories</h3>
              <ul>
                {categories.map(category => (
                  <li key={category} className="mb-2">
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left p-2 rounded-md transition-colors duration-200 ${
                        selectedCategory === category
                          ? 'bg-brand-gold text-white font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category === 'All' ? 'Toutes les catégories' : category}
                    </button>
                  </li>
                ))}
              </ul>
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
                <p className="text-xl text-gray-600">Aucun produit trouvé dans cette catégorie.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;