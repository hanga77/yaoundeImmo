import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <Link to={`/produit/${product.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transform group-hover:-translate-y-2 transition-transform duration-300">
        <div className="relative">
          <img className="h-64 w-full object-cover" src={product.imageUrl} alt={product.name} />
          <div className="absolute top-0 left-0 bg-brand-cyan text-white text-xs font-semibold px-2 py-1 m-2 rounded-md">
            {product.category}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-brand-dark mt-2 truncate flex-grow">{product.name}</h3>
          <p className="font-bold text-xl text-brand-blue mt-2">{formattedPrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
