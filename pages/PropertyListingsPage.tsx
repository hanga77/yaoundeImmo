

import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { useData } from '../DataContext';
import { PropertyType } from '../types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const PropertyListingsPage: React.FC = () => {
  const { properties } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 12;
  
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    type: searchParams.get('type') || '',
    chambres: searchParams.get('chambres') || '',
    prix_max: searchParams.get('prix_max') || '',
  });

  // Update form state if URL params change (e.g., browser back/forward)
  useEffect(() => {
    setFilters({
      q: searchParams.get('q') || '',
      type: searchParams.get('type') || '',
      chambres: searchParams.get('chambres') || '',
      prix_max: searchParams.get('prix_max') || '',
    });
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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
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
    return "Affinez votre recherche à l'aide des filtres ci-dessous";
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

  const formInputClass = "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold text-gray-800 bg-white";
  const formLabelClass = "block text-sm font-medium text-gray-700 mb-1";

  const FilterBar = () => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 md:-mt-16 relative z-10 pb-16">
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-lg w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2 xl:col-span-1">
            <label htmlFor="q" className={formLabelClass}>Localisation</label>
            <input id="q" name="q" type="text" placeholder="Quartier, adresse..." value={filters.q} onChange={handleFilterChange} className={formInputClass} />
          </div>
          <div>
            <label htmlFor="type" className={formLabelClass}>Type de bien</label>
            <select id="type" name="type" value={filters.type} onChange={handleFilterChange} className={formInputClass}>
              <option value="">Tous</option>
              {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="chambres" className={formLabelClass}>Chambres (min)</label>
            <select id="chambres" name="chambres" value={filters.chambres} onChange={handleFilterChange} className={formInputClass}>
              <option value="">Toutes</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div>
            <label htmlFor="prix_max" className={formLabelClass}>Prix Max (XAF)</label>
            <input id="prix_max" name="prix_max" type="number" placeholder="Budget max" value={filters.prix_max} onChange={handleFilterChange} className={formInputClass} />
          </div>
          <div className="mt-4 md:mt-0">
            <button type="submit" className="w-full bg-brand-gold hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center text-base">
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              Filtrer
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <div className="bg-brand-light">
      {/* Page Header */}
      <div className="bg-brand-dark pt-20 pb-8 md:pb-32 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif">{generateTitle()}</h1>
          <p className="mt-2 text-lg text-gray-300">{generateSubtitle()}</p>
        </div>
      </div>

      <FilterBar />

      {/* Listings Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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