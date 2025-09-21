
import React from 'react';
import { Property } from '../types';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M18 6.5a.5.5 0 00-.5-.5h-3a.5.5 0 000 1h3a.5.5 0 00.5-.5z" />
    <path fillRule="evenodd" d="M1 4a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm2 1v3h14V5H3zm0 4v5h14V9H3z" clipRule="evenodd" />
  </svg>
);

const BathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.25 3A2.25 2.25 0 001 5.25v9.5A2.25 2.25 0 003.25 17h13.5A2.25 2.25 0 0019 14.75v-9.5A2.25 2.25 0 0016.75 3H3.25zM2.5 5.25a.75.75 0 01.75-.75h13.5a.75.75 0 01.75.75v9.5a.75.75 0 01-.75-.75H3.25a.75.75 0 01-.75-.75v-9.5zM12.5 8a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM11 9.5a.5.5 0 00-1 0V11h-1V9.5a.5.5 0 00-1 0V11H7V9.5a.5.5 0 00-1 0v1.98c0 .28.22.52.5.52H11.5a.5.5 0 00.5-.52V9.5z" clipRule="evenodd" />
  </svg>
);

const AreaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm2 1h12v12H4V4zm4 4H6v2h2V8zm0 3H6v2h2v-2zm0 3H6v2h2v-2zm3-6h2v2h-2V8zm3 0h2v2h-2V8zm-3 3h2v2h-2v-2zm3 0h2v2h-2v-2zm-3 3h2v2h-2v-2zm3 0h2v2h-2v-2z" clipRule="evenodd" />
  </svg>
);

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const formattedPrice = new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link to={`/bien/${property.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transform group-hover:-translate-y-2 transition-transform duration-300">
        <div className="relative">
          <img className="h-56 w-full object-cover" src={property.imageUrl} alt={property.title} />
          <div className="absolute top-0 right-0 bg-brand-gold text-white text-sm font-semibold px-3 py-1 m-2 rounded-md">
            {property.type}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <p className="font-bold text-2xl text-brand-blue">{formattedPrice} {property.type !== 'À Vendre' && '/ mois'}</p>
          <h3 className="text-lg font-semibold text-brand-dark mt-2 truncate">{property.title}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPinIcon className="h-5 w-5 mr-1 text-gray-400" />
            <p className="text-sm">{property.address}, {property.commune}</p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center space-x-4 text-sm text-gray-700 flex-grow-0">
            {property.bedrooms > 0 && 
              <div className="flex items-center">
                <BedIcon/>
                <span>{property.bedrooms}</span>
              </div>
            }
            {property.bathrooms > 0 && 
              <div className="flex items-center">
                <BathIcon />
                <span>{property.bathrooms}</span>
              </div>
            }
            <div className="flex items-center">
              <AreaIcon />
              <span>{property.area} m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
