import React, { useState } from 'react';
import { useData } from '../../DataContext';
import { FooterData } from '../../types';
import { socialIconNames } from '../../components/IconMap';

const AdminFooterPage: React.FC = () => {
    const { footerData, updateFooterData } = useData();
    const [formData, setFormData] = useState<FooterData>(footerData);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                    Modifiez l'identité du site, les informations de contact et les liens des réseaux sociaux.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Identité du Site (Logo)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                      <label htmlFor="logoPart1" className="block text-sm font-medium text-gray-700">Première partie</label>
                      <input type="text" name="logoPart1" id="logoPart1" value={formData.logoPart1 || ''} onChange={handleChange} placeholder="Immobilier" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                  </div>
                   <div>
                      <label htmlFor="logoPart2" className="block text-sm font-medium text-gray-700">Deuxième partie (en or)</label>
                      <input type="text" name="logoPart2" id="logoPart2" value={formData.logoPart2 || ''} onChange={handleChange} placeholder="Yaoundé" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Informations Générales</h3>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description de l'agence</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
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
                
                {/* Fix: Added opening hours field to be managed in the admin panel. */}
                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Horaires d'ouverture</h3>
                </div>
                <div>
                    <label htmlFor="openingHours" className="block text-sm font-medium text-gray-700">Horaires</label>
                    <textarea name="openingHours" id="openingHours" value={formData.openingHours || ''} onChange={handleChange} rows={4} placeholder="Lundi - Vendredi: 9h00 - 18h00..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
                    <p className="mt-1 text-xs text-gray-500">Utilisez un retour à la ligne pour chaque nouvelle ligne.</p>
                </div>

                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Réseaux Sociaux</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                  <div>
                      <label htmlFor="facebookUrl" className="block text-sm font-medium text-gray-700">Lien Facebook</label>
                      <input type="text" name="facebookUrl" id="facebookUrl" value={formData.facebookUrl} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                  </div>
                   <div>
                      <label htmlFor="facebookIcon" className="block text-sm font-medium text-gray-700">Icône</label>
                      <select name="facebookIcon" id="facebookIcon" value={formData.facebookIcon} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold">
                        {socialIconNames.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                      </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <div>
                        <label htmlFor="xUrl" className="block text-sm font-medium text-gray-700">Lien X (Twitter)</label>
                        <input type="text" name="xUrl" id="xUrl" value={formData.xUrl} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                    </div>
                    <div>
                        <label htmlFor="xIcon" className="block text-sm font-medium text-gray-700">Icône</label>
                        <select name="xIcon" id="xIcon" value={formData.xIcon} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold">
                            {socialIconNames.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                    </div>
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <div>
                        <label htmlFor="youtubeUrl" className="block text-sm font-medium text-gray-700">Lien YouTube</label>
                        <input type="text" name="youtubeUrl" id="youtubeUrl" value={formData.youtubeUrl || ''} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                    </div>
                     <div>
                        <label htmlFor="youtubeIcon" className="block text-sm font-medium text-gray-700">Icône</label>
                        <select name="youtubeIcon" id="youtubeIcon" value={formData.youtubeIcon} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold">
                            {socialIconNames.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <div>
                        <label htmlFor="tiktokUrl" className="block text-sm font-medium text-gray-700">Lien TikTok</label>
                        <input type="text" name="tiktokUrl" id="tiktokUrl" value={formData.tiktokUrl || ''} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                    </div>
                    <div>
                        <label htmlFor="tiktokIcon" className="block text-sm font-medium text-gray-700">Icône</label>
                        <select name="tiktokIcon" id="tiktokIcon" value={formData.tiktokIcon} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold">
                            {socialIconNames.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <div>
                        <label htmlFor="pinterestUrl" className="block text-sm font-medium text-gray-700">Lien Pinterest</label>
                        <input type="text" name="pinterestUrl" id="pinterestUrl" value={formData.pinterestUrl || ''} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                    </div>
                     <div>
                        <label htmlFor="pinterestIcon" className="block text-sm font-medium text-gray-700">Icône</label>
                        <select name="pinterestIcon" id="pinterestIcon" value={formData.pinterestIcon} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold">
                            {socialIconNames.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                    </div>
                </div>


                <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900">Liens Légaux</h3>
                </div>
                 <div>
                    <label htmlFor="legalNoticeUrl" className="block text-sm font-medium text-gray-700">URL Mentions Légales</label>
                    <input type="text" name="legalNoticeUrl" id="legalNoticeUrl" value={formData.legalNoticeUrl || ''} onChange={handleChange} placeholder="/mentions-legales" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                </div>
                <div>
                    <label htmlFor="privacyPolicyUrl" className="block text-sm font-medium text-gray-700">URL Politique de Confidentialité</label>
                    <input type="text" name="privacyPolicyUrl" id="privacyPolicyUrl" value={formData.privacyPolicyUrl || ''} onChange={handleChange} placeholder="/mentions-legales" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
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
