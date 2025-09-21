import React, { useState } from 'react';
import { useData } from '../../DataContext';
import { FooterData } from '../../types';

const AdminFooterPage: React.FC = () => {
    const { footerData, updateFooterData } = useData();
    const [formData, setFormData] = useState<FooterData>(footerData);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateFooterData(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };
    
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">
                    Gestion du Pied de Page
                </h1>
                <p className="text-gray-600 mt-1">
                    Modifiez les informations de contact et les liens des réseaux sociaux.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
                    <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                    <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                </div>
                <div>
                    <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700">Horaires d'ouverture</label>
                    <textarea name="openingHours" id="openingHours" value={formData.openingHours} onChange={handleChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
                    <p className="mt-1 text-xs text-gray-500">Mettez chaque horaire sur une nouvelle ligne.</p>
                </div>
                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Réseaux Sociaux</h3>
                </div>
                <div>
                    <label htmlFor="facebookUrl" className="block text-sm font-medium text-gray-700">Lien Facebook</label>
                    <input type="text" name="facebookUrl" id="facebookUrl" value={formData.facebookUrl} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                </div>
                <div>
                    <label htmlFor="twitterUrl" className="block text-sm font-medium text-gray-700">Lien Twitter</label>
                    <input type="text" name="twitterUrl" id="twitterUrl" value={formData.twitterUrl} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                </div>
                <div>
                    <label htmlFor="instagramUrl" className="block text-sm font-medium text-gray-700">Lien Instagram</label>
                    <input type="text" name="instagramUrl" id="instagramUrl" value={formData.instagramUrl} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                </div>
                <div className="flex justify-end items-center">
                    {isSaved && <span className="text-green-600 mr-4 text-sm font-medium">Modifications enregistrées !</span>}
                    <button type="submit" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminFooterPage;