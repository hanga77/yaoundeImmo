import React from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../../components/admin/ProductForm';
import { useData } from '../../DataContext';
import { Product } from '../../types';

const ProductFormPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, addProduct, updateProduct } = useData();
  
  const isEditing = Boolean(productId);
  const productToEdit = isEditing ? products.find(p => p.id === productId) : null;

  const handleSubmit = (formData: Omit<Product, 'id'> | Product) => {
    if (isEditing && productId) {
      updateProduct({ ...formData, id: productId });
    } else {
      addProduct(formData as Omit<Product, 'id'>);
    }
  };

  return (
    <div>
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">
                {isEditing ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
            </h1>
            <p className="text-gray-600 mt-1">
                {isEditing ? 'Mettez à jour les informations ci-dessous.' : 'Remplissez le formulaire pour ajouter un produit à la boutique.'}
            </p>
        </div>
        <ProductForm onSubmit={handleSubmit} initialData={productToEdit} />
    </div>
  );
};

export default ProductFormPage;
