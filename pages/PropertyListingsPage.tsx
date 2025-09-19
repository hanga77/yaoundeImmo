
import React from 'react';
import PropertyCard from '../components/PropertyCard';
import { PropertyType } from '../types';
import { useData } from '../DataContext';

interface PropertyListingsPageProps {
  title: string;
  propertyType: PropertyType;
}

const PropertyListingsPage: React.FC<PropertyListingsPageProps> = ({ title, propertyType }) => {
  const { properties } = useData();
  const filteredProperties = properties.filter(p => p.type === propertyType);

  return (
    <div className="bg-brand-light">
      {/* Page Header */}
      <div className="bg-brand-dark py-20 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-serif">{title}</h1>
          <p className="mt-2 text-lg text-gray-300">Parcourez notre sélection de biens d'exception à Yaoundé</p>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-blue">{filteredProperties.length} bien(s) trouvé(s)</h2>
        </div>
        
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Aucun bien ne correspond à cette catégorie pour le moment.</p>
            <p className="mt-2 text-gray-500">Veuillez revenir plus tard ou nous contacter directement.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListingsPage;
