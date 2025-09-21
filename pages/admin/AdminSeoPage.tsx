import React, { useState } from 'react';
import { useData } from '../../DataContext';
import { SEOData } from '../../types';

const AdminSeoPage: React.FC = () => {
    const { seoData, updateSeoData } = useData();
    const [formData, setFormData] = useState<SEOData>(seoData);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSeoData(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000); // Hide message after 3 seconds
    };
    
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">
                    Gestion du Référencement (SEO)
                </h1>
                <p className="text-gray-600 mt-1">
                    Optimisez la visibilité de votre site sur les moteurs de recherche.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre du site</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                    <p className="mt-1 text-xs text-gray-500">Apparaît dans l'onglet du navigateur et les résultats de recherche.</p>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description du site</label>
                    <textarea name="description" id="description" rows={3} value={formData.description} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
                     <p className="mt-1 text-xs text-gray-500">Courte description pour les moteurs de recherche (approx. 160 caractères).</p>
                </div>
                
                <div>
                    <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">Mots-clés</label>
                    <input type="text" name="keywords" id="keywords" value={formData.keywords} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                    <p className="mt-1 text-xs text-gray-500">Séparez les mots-clés par des virgules (ex: immobilier, vente, yaoundé).</p>
                </div>

                <div>
                    <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700">URL de l'image de partage</label>
                    <input type="text" name="ogImage" id="ogImage" value={formData.ogImage} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                    <p className="mt-1 text-xs text-gray-500">Image affichée lors du partage sur les réseaux sociaux (ex: Facebook). Format recommandé: 1200x630px.</p>
                    {formData.ogImage && (
                        <div className="mt-4">
                            <p className="block text-sm font-medium text-gray-700 mb-2">Aperçu de l'image :</p>
                            <img 
                                src={formData.ogImage} 
                                alt="Aperçu de l'image de partage" 
                                className="rounded-lg shadow-md max-w-sm w-full h-auto object-contain bg-gray-100"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevent looping
                                    currentTarget.hidden = true;
                                }}
                                onLoad={({ currentTarget }) => {
                                    currentTarget.hidden = false;
                                }}
                            />
                        </div>
                    )}
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

export default AdminSeoPage;