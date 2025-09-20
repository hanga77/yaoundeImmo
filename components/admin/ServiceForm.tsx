import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Service } from '../../types';
import { iconNames } from '../IconMap';

interface ServiceFormProps {
  onSubmit: (service: any) => void;
  initialData?: Service | null;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit, initialData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    icon: iconNames[0] || '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        longDescription: initialData.longDescription,
        icon: initialData.icon,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/admin/services');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre du service</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
        </div>
        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icône</label>
          <select name="icon" id="icon" value={formData.icon} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold">
            {iconNames.map(iconName => <option key={iconName} value={iconName}>{iconName}</option>)}
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description courte</label>
        <textarea name="description" id="description" rows={2} value={formData.description} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
        <p className="mt-1 text-xs text-gray-500">S'affiche sur la carte du service dans la boutique.</p>
      </div>

      <div>
        <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">Description longue</label>
        <textarea name="longDescription" id="longDescription" rows={5} value={formData.longDescription} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
        <p className="mt-1 text-xs text-gray-500">S'affiche sur la page de détail du service.</p>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button type="button" onClick={() => navigate('/admin/services')} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors">
            Annuler
        </button>
        <button type="submit" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
          {initialData ? 'Mettre à jour' : 'Créer le service'}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
