
import React from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/solid';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-brand-light">
      {/* Page Header */}
      <div className="bg-brand-blue py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-serif">Contactez-nous</h1>
          <p className="mt-2 text-lg text-gray-300">Nous sommes à votre écoute pour toute question ou projet.</p>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-lg shadow-xl">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-brand-blue font-serif mb-6">Envoyez-nous un message</h2>
              <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                    <input type="text" name="firstName" id="firstName" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                    <input type="text" name="lastName" id="lastName" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                  </div>
                </div>
                <div className="mt-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" id="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                </div>
                <div className="mt-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Sujet</label>
                  <input type="text" name="subject" id="subject" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold" />
                </div>
                <div className="mt-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea name="message" id="message" rows={5} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
                <div className="mt-6">
                  <button type="submit" className="w-full bg-brand-gold hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300">
                    Envoyer
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="bg-brand-blue p-8 rounded-lg text-white">
              <h2 className="text-3xl font-bold font-serif mb-6">Nos Coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPinIcon className="h-6 w-6 mr-4 mt-1 text-brand-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Adresse</h3>
                    <p className="text-gray-300">123 Avenue de l'Indépendance, Yaoundé, Cameroun</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PhoneIcon className="h-6 w-6 mr-4 mt-1 text-brand-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Téléphone</h3>
                    <p className="text-gray-300">+237 6XX XX XX XX</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <EnvelopeIcon className="h-6 w-6 mr-4 mt-1 text-brand-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-300">contact@immoyaounde.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 border-t border-blue-800 pt-6">
                <h3 className="font-semibold mb-2">Horaires d'ouverture</h3>
                <p className="text-gray-300">Lundi - Vendredi : 8h30 - 18h00</p>
                <p className="text-gray-300">Samedi : 9h00 - 13h00</p>
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
