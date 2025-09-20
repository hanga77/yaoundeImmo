
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Agent } from '../../types';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';

interface AgentFormProps {
  onSubmit: (agent: any) => void;
  initialData?: Agent | null;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const AgentForm: React.FC<AgentFormProps> = ({ onSubmit, initialData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    imageUrl: '',
    bio: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        title: initialData.title,
        imageUrl: initialData.imageUrl,
        bio: initialData.bio,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const base64 = await fileToBase64(e.target.files[0]);
          setFormData(prev => ({ ...prev, imageUrl: base64 }));
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    navigate('/admin/about');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
      </div>

       <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre / Poste</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <div className="mt-2 flex items-center gap-x-3">
          {formData.imageUrl ? 
            <img src={formData.imageUrl} alt="Aperçu" className="h-24 w-24 object-cover rounded-full" /> : 
            <UserCircleIcon className="h-24 w-24 text-gray-300" aria-hidden="true" />
          }
          <label htmlFor="agent-image-upload" className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <span>Changer</span>
            <input id="agent-image-upload" name="agent-image-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Biographie</label>
        <textarea name="bio" id="bio" rows={4} value={formData.bio} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button type="button" onClick={() => navigate('/admin/about')} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition-colors">
            Annuler
        </button>
        <button type="submit" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
          {initialData ? 'Mettre à jour' : 'Ajouter l\'agent'}
        </button>
      </div>
    </form>
  );
};

export default AgentForm;