
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

const ServicesPage: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-brand-blue py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-serif">Nos Services Clé en Main</h1>
          <p className="mt-2 text-lg text-gray-300">Un accompagnement complet pour tous vos projets de construction et de rénovation.</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.id} className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center transition-shadow duration-300 hover:shadow-2xl">
                    <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                      <div className="flex items-center justify-center h-24 w-24 rounded-full bg-brand-gold text-white">
                        <Icon className="h-12 w-12" />
                      </div>
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="text-2xl font-bold text-brand-blue font-serif">{service.title}</h3>
                      <p className="mt-2 text-gray-600">{service.description}</p>
                      <Link 
                        to={`/services/${service.id}`}
                        className="mt-4 inline-block text-brand-gold font-semibold hover:text-yellow-600 transition-colors duration-300"
                      >
                        En savoir plus &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
