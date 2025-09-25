import React, { useState } from 'react';
import { useData } from '../../DataContext';
import { HomePageData } from '../../types';

const AdminBlogPage: React.FC = () => {
    const { homePageData, updateHomePageData } = useData();
    const [formData, setFormData] = useState<HomePageData>(homePageData);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateHomePageData(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };
    
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">
                    Gestion de la Page d'Accueil
                </h1>
                <p className="text-gray-600 mt-1">
                    Modifiez les textes des différentes sections de la page d'accueil.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                
                {/* CTA Banner Section */}
                <fieldset className="space-y-4 border-b pb-6">
                    <legend className="text-xl font-bold text-brand-blue font-serif">Bandeau d'Appel à l'Action</legend>
                    <div>
                        <label htmlFor="ctaBannerPrefix" className="block text-sm font-medium text-gray-700">Texte en gras (Préfixe)</label>
                        <input type="text" name="ctaBannerPrefix" id="ctaBannerPrefix" value={formData.ctaBannerPrefix} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                    </div>
                    <div>
                        <label htmlFor="ctaBannerSuffix" className="block text-sm font-medium text-gray-700">Texte normal (Suffixe)</label>
                        <textarea name="ctaBannerSuffix" id="ctaBannerSuffix" value={formData.ctaBannerSuffix} onChange={handleChange} rows={2} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
                    </div>
                </fieldset>

                {/* Owner CTA Section */}
                <fieldset className="space-y-4 border-b pb-6">
                    <legend className="text-xl font-bold text-brand-blue font-serif">Section "Vous êtes propriétaire ?"</legend>
                     <div>
                        <label htmlFor="ownerCtaTitle" className="block text-sm font-medium text-gray-700">Titre</label>
                        <input type="text" name="ownerCtaTitle" id="ownerCtaTitle" value={formData.ownerCtaTitle} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                    </div>
                    <div>
                        <label htmlFor="ownerCtaText" className="block text-sm font-medium text-gray-700">Texte</label>
                        <textarea name="ownerCtaText" id="ownerCtaText" value={formData.ownerCtaText} onChange={handleChange} rows={3} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
                    </div>
                </fieldset>

                {/* Section Titles */}
                <fieldset className="space-y-6">
                    <legend className="text-xl font-bold text-brand-blue font-serif">Titres des Sections</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="servicesTitle" className="block text-sm font-medium text-gray-700">Titre "Nos Services"</label>
                            <input type="text" name="servicesTitle" id="servicesTitle" value={formData.servicesTitle} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                        </div>
                        <div>
                            <label htmlFor="servicesSubtitle" className="block text-sm font-medium text-gray-700">Sous-titre "Nos Services"</label>
                            <input type="text" name="servicesSubtitle" id="servicesSubtitle" value={formData.servicesSubtitle} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="featuredPropertiesTitle" className="block text-sm font-medium text-gray-700">Titre "Biens à la Une"</label>
                            <input type="text" name="featuredPropertiesTitle" id="featuredPropertiesTitle" value={formData.featuredPropertiesTitle} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                        </div>
                        <div>
                            <label htmlFor="featuredPropertiesSubtitle" className="block text-sm font-medium text-gray-700">Sous-titre "Biens à la Une"</label>
                            <input type="text" name="featuredPropertiesSubtitle" id="featuredPropertiesSubtitle" value={formData.featuredPropertiesSubtitle} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="featuredProductsTitle" className="block text-sm font-medium text-gray-700">Titre "Produits à la Une"</label>
                            <input type="text" name="featuredProductsTitle" id="featuredProductsTitle" value={formData.featuredProductsTitle} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                        </div>
                        <div>
                            <label htmlFor="featuredProductsSubtitle" className="block text-sm font-medium text-gray-700">Sous-titre "Produits à la Une"</label>
                            <input type="text" name="featuredProductsSubtitle" id="featuredProductsSubtitle" value={formData.featuredProductsSubtitle} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                        </div>
                    </div>
                </fieldset>

                <div className="flex justify-end items-center pt-6 border-t">
                    {isSaved && <span className="text-green-600 mr-4 text-sm font-medium">Modifications enregistrées !</span>}
                    <button type="submit" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
                        Enregistrer les modifications
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminBlogPage;
