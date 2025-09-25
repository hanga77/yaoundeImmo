import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { XCircleIcon, PhotoIcon } from '@heroicons/react/24/solid';

interface ProductFormProps {
  onSubmit: (product: any) => void;
  initialData?: Product | null;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    imageUrl: '',
    imageUrls: [] as string[],
    description: '',
    isFeatured: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        price: initialData.price,
        category: initialData.category,
        imageUrl: initialData.imageUrl,
        imageUrls: initialData.imageUrls || [],
        description: initialData.description,
        isFeatured: initialData.isFeatured ?? false,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value }));
    }
  };
  
  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          // Fix: Explicitly cast to File to resolve type inference issue.
          const base64 = await fileToBase64(e.target.files[0] as File);
          setFormData(prev => ({ ...prev, imageUrl: base64 }));
      }
  };
  
  const handleGalleryImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
          const files = Array.from(e.target.files);
          // Fix: Explicitly type the 'file' parameter to resolve a type inference issue.
          const base64Promises = files.map((file: File) => fileToBase64(file));
          const base64Images = await Promise.all(base64Promises);
          setFormData(prev => ({...prev, imageUrls: [...prev.imageUrls, ...base64Images]}));
      }
  };
  
  const handleRemoveGalleryImage = (index: number) => {
      setFormData(prev => ({
          ...prev,
          imageUrls: prev.imageUrls.filter((_, i) => i !== index)
      }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/admin/products');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom du produit</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Prix (XAF)</label>
          <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
      </div>

       <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label>
          <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required placeholder="Ex: Décoration, Luminaires..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
      
      {/* Main Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Image principale</label>
        <div className="mt-2 flex items-center gap-x-3">
          {formData.imageUrl ? 
            <img src={formData.imageUrl} alt="Aperçu" className="h-24 w-24 object-cover rounded-md" /> : 
            <PhotoIcon className="h-24 w-24 text-gray-300" aria-hidden="true" />
          }
          <label htmlFor="main-image-upload" className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <span>Changer</span>
            <input id="main-image-upload" name="main-image-upload" type="file" className="sr-only" accept="image/*" onChange={handleMainImageChange} />
          </label>
        </div>
      </div>

      {/* Gallery Images Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Images de la galerie</label>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label htmlFor="gallery-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-brand-gold focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-gold focus-within:ring-offset-2 hover:text-yellow-600">
                    <span>Téléversez des fichiers</span>
                    <input id="gallery-upload" name="gallery-upload" type="file" multiple className="sr-only" accept="image/*" onChange={handleGalleryImagesChange} />
                </label>
                <p className="pl-1">ou glissez-déposez</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF jusqu'à 10MB</p>
            </div>
        </div>
        {formData.imageUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {formData.imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                        <img src={url} alt={`Galerie ${index + 1}`} className="h-24 w-full object-cover rounded-md" />
                        <button type="button" onClick={() => handleRemoveGalleryImage(index)} className="absolute top-0 right-0 p-0.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <XCircleIcon className="h-5 w-5" />
                        </button>
                    </div>
                ))}
            </div>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input id="isFeatured" name="isFeatured" type="checkbox" checked={formData.isFeatured} onChange={handleChange} className="focus:ring-brand-gold h-4 w-4 text-brand-gold border-gray-300 rounded" />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="isFeatured" className="font-medium text-gray-700">Mettre en avant</label>
          <p className="text-gray-500">Le produit apparaîtra sur la page d'accueil.</p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={() => navigate('/admin/products')} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors">
            Annuler
        </button>
        <button type="submit" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
          {initialData ? 'Mettre à jour' : 'Créer le produit'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;