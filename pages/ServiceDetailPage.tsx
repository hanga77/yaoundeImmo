import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../DataContext';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Icon } from '../components/IconMap';

const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { services } = useData();
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Service non trouvé</h1>
        <p className="mt-4">Le service que vous recherchez n'existe pas.</p>
        <Link to="/services" className="mt-8 inline-block bg-brand-gold text-white font-bold py-2 px-4 rounded hover:bg-yellow-600">
          Retour aux services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
       {/* Page Header */}
       <div className="bg-white py-12 text-center border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-brand-gold text-white mx-auto mb-6">
                <Icon name={service.icon} className="h-12 w-12" />
            </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-brand-slate">{service.title}</h1>
          <p className="mt-2 text-lg text-brand-slate/90">{service.description}</p>
        </div>
      </div>

      {/* Service Content */}
      <div className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="prose lg:prose-xl">
                    <p className="text-brand-slate/90">{service.longDescription}</p>
                </div>

                <div className="mt-12 text-center">
                    <Link to="/contact" className="inline-block bg-brand-gold text-white font-bold py-3 px-8 rounded-md transition-all duration-300 text-lg hover:bg-yellow-600">
                        Demander un devis
                    </Link>
                </div>

                 <div className="mt-16 text-center">
                    <Link to="/services" className="text-brand-blue hover:text-brand-blue/80 font-semibold flex items-center justify-center">
                       <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        Retour aux services
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;