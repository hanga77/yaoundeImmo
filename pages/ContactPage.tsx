import React, { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useData } from '../DataContext';

const ContactPage: React.FC = () => {
  const { footerData } = useData();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Nettoie le numéro de téléphone pour l'URL WhatsApp
    const phoneNumber = footerData.phone.replace(/[^0-9]/g, '');
    
    // Construit le message
    const message = `
      Nouveau message depuis le site ImmoYaoundé:
      ------------------------------------
      Prénom: ${formData.firstName}
      Nom: ${formData.lastName}
      Email: ${formData.email}
      Sujet: ${formData.subject}
      ------------------------------------
      Message:
      ${formData.message}
    `.trim();
    
    // Encode le message pour l'URL
    const encodedMessage = encodeURIComponent(message);
    
    // Crée l'URL WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Ouvre WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
  };


  return (
    <div className="bg-brand-light">
      {/* Page Header */}
      <div className="bg-white py-12 text-center border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-brand-slate">Contactez-nous</h1>
          <p className="mt-2 text-lg text-brand-slate/90">Nous sommes à votre écoute pour toute question ou projet.</p>
        </div>
      </div>

      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 md:p-12 rounded-lg shadow-xl">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-slate font-serif mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                  </div>
                </div>
                <div className="mt-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                </div>
                <div className="mt-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Sujet</label>
                  <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                </div>
                <div className="mt-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
                <div className="mt-6">
                  <button type="submit" className="w-full bg-white text-brand-green-primary border-2 border-brand-green-primary font-bold py-3 px-6 rounded-md transition-all duration-300 hover:text-brand-green-dark hover:border-brand-green-dark">
                    Envoyer sur WhatsApp
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-slate font-serif mb-6">Nos Coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 mr-4 mt-1 text-brand-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-brand-slate">Adresse</h3>
                    <p className="text-brand-slate/90">{footerData.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PhoneIcon className="h-6 w-6 mr-4 mt-1 text-brand-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-brand-slate">Téléphone</h3>
                    <p className="text-brand-slate/90">{footerData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <EnvelopeIcon className="h-6 w-6 mr-4 mt-1 text-brand-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-brand-slate">Email</h3>
                    <p className="text-brand-slate/90">{footerData.email}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-brand-slate mb-2">Horaires d'ouverture</h3>
                {footerData.openingHours.split('\n').map((line, index) => (
                  <p key={index} className="text-brand-slate/90">{line}</p>
                ))}
              </div>
              <div className="mt-8 h-64 rounded-lg overflow-hidden">
                <img src="https://picsum.photos/seed/map2/800/400" alt="Carte de localisation" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;