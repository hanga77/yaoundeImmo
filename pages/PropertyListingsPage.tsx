

import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { useData } from '../DataContext';

const PropertyListingsPage: React.FC = () => {
  const { properties } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchParams]);

  const filteredProperties = useMemo(() => {
    const q = searchParams.get('q');
    const type = searchParams.get('type');
    const chambres = searchParams.get('chambres');
    const sdb = searchParams.get('sdb');
    const prix_min = searchParams.get('prix_min');
    const prix_max = searchParams.get('prix_max');

    return properties.filter(p => {
      const searchMatch = !q || 
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          p.address.toLowerCase().includes(q.toLowerCase()) ||
          p.commune.toLowerCase().includes(q.toLowerCase());

      const typeMatch = !type || p.type === type;

      const bedroomsNum = parseInt(chambres || '0', 10);
      const bedroomsMatch = !chambres || isNaN(bedroomsNum) || p.bedrooms >= bedroomsNum;

      const bathroomsNum = parseInt(sdb || '0', 10);
      const bathroomsMatch = !sdb || isNaN(bathroomsNum) || p.bathrooms >= bathroomsNum;
      
      const minPriceNum = parseFloat(prix_min || '');
      const minPriceMatch = !prix_min || isNaN(minPriceNum) || p.price >= minPriceNum;
      
      const maxPriceNum = parseFloat(prix_max || '');
      const maxPriceMatch = !prix_max || isNaN(maxPriceNum) || p.price <= maxPriceNum;

      return searchMatch && typeMatch && bedroomsMatch && bathroomsMatch && minPriceMatch && maxPriceMatch;
    });
  }, [properties, searchParams]);
  
  // Pagination Logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const pageCount = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= pageCount) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const generateTitle = () => {
    const type = searchParams.get('type');
    if (type) {
      return `Nos biens ${type.toLowerCase()}`;
    }
    if (searchParams.toString() === '') {
        return "Tous nos biens immobiliers";
    }
    return "Résultats de votre recherche";
  }

  const generateSubtitle = () => {
    if (searchParams.get('type')) {
      return "Parcourez notre sélection de biens d'exception à Yaoundé";
    }
    return "Découvrez notre catalogue complet de propriétés disponibles à Yaoundé.";
  }
  
  const Pagination: React.FC = () => {
    if (pageCount <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }
    
    const buttonClass = "mx-1 px-4 py-2 border rounded-md transition-colors duration-300";
    const activeClass = "bg-brand-gold text-white border-brand-gold";
    const inactiveClass = "bg-white text-brand-blue border-gray-300 hover:bg-gray-100";

    return (
        <nav aria-label="Pagination" className="flex justify-center items-center mt-16">
            <button 
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${buttonClass} ${inactiveClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                Précédent
            </button>
            <div className="flex items-center mx-2">
                {pageNumbers.map(number => (
                    <button 
                        key={number} 
                        onClick={() => paginate(number)} 
                        className={`${buttonClass} ${currentPage === number ? activeClass : inactiveClass}`}
                        aria-current={currentPage === number ? 'page' : undefined}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <button 
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageCount}
                className={`${buttonClass} ${inactiveClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                Suivant
            </button>
        </nav>
    );
  }

  return (
    <div className="bg-brand-light">
      {/* Page Header */}
      <div className="bg-brand-dark py-12 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif">{generateTitle()}</h1>
          <p className="mt-2 text-lg text-gray-300">{generateSubtitle()}</p>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-brand-blue">{filteredProperties.length} bien(s) trouvé(s)</h2>
        </div>
        
        {filteredProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <Pagination />
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Aucun bien ne correspond à vos critères de recherche.</p>
            <p className="mt-2 text-gray-500">Veuillez essayer avec d'autres filtres ou nous contacter directement.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyListingsPage;