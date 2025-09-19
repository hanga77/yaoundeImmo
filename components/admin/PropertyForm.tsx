import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Property, PropertyType } from '../../types';

interface PropertyFormProps {
  onSubmit: (property: any) => void;
  initialData?: Property | null;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit, initialData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: PropertyType.SALE,
    price: 0,
    address: '',
    commune: '',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    imageUrl: '',
    description: '',
    isFeatured: false,
  });

  useEffect(() => {
    if (initialData) {
      // Fix: The `initialData` object of type `Property` is not assignable to the `formData` state
      // because `isFeatured` is optional in `Property` but required in the state, and `Property`
      // has an `id` which the state does not.
      // We create an object that matches the state's shape.
      setFormData({
        title: initialData.title,
        type: initialData.type,
        price: initialData.price,
        address: initialData.address,
        commune: initialData.commune,
        bedrooms: initialData.bedrooms,
        bathrooms: initialData.bathrooms,
        area: initialData.area,
        imageUrl: initialData.imageUrl,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/admin/properties');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type de bien</label>
          <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold">
            {Object.values(PropertyType).map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Prix (XAF)</label>
          <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
         <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">Surface (m²)</label>
          <input type="number" name="area" id="area" value={formData.area} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
          <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
         <div>
          <label htmlFor="commune" className="block text-sm font-medium text-gray-700">Commune</label>
          <input type="text" name="commune" id="commune" value={formData.commune} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Chambres</label>
          <input type="number" name="bedrooms" id="bedrooms" value={formData.bedrooms} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Salles de bain</label>
          <input type="number" name="bathrooms" id="bathrooms" value={formData.bathrooms} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
      </div>
      
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL de l'image</label>
        <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required placeholder="https://picsum.photos/seed/..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
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
          <p className="text-gray-500">Le bien apparaîtra sur la page d'accueil.</p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={() => navigate('/admin/properties')} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors">
            Annuler
        </button>
        <button type="submit" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
          {initialData ? 'Mettre à jour' : 'Créer le bien'}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;