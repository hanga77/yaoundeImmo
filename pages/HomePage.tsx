

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import ProductCard from '../components/ProductCard';
import { MagnifyingGlassIcon, HomeModernIcon, BuildingStorefrontIcon, BuildingOfficeIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { useData } from '../DataContext';
import { PropertyType } from '../types';

const ServiceHighlight: React.FC<{ icon: React.ReactNode; title: string; description: string, link: string }> = ({ icon, title, description, link }) => (
    <Link to={link} className="block text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-gold text-white mx-auto">
            {icon}
        </div>
        <h3 className="mt-5 text-xl font-bold text-brand-blue">{title}</h3>
        <p className="mt-2 text-base text-gray-600">{description}</p>
    </Link>
);

const HomePage: React.FC = () => {
  const { properties, products } = useData();
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 4);
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<PropertyType>(PropertyType.SALE);
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    params.append('type', activeTab);
    if (bedrooms) params.append('chambres', bedrooms);
    if (bathrooms) params.append('sdb', bathrooms);
    if (minPrice) params.append('prix_min', minPrice);
    if (maxPrice) params.append('prix_max', maxPrice);
    navigate(`/biens?${params.toString()}`);
  };

  const formInputClass = "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold text-gray-800 bg-white";
  const formLabelClass = "block text-sm font-medium text-gray-700 mb-1";


  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[80vh] min-h-[500px] text-white flex flex-col justify-center" style={{backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4 container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 animate-fade-in-down">Le Bien de vos Rêves à Yaoundé</h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fade-in-up">Avec notre expertise, trouvez, vendez ou louez en toute confiance.</p>
        </div>
         <div className="relative z-10 w-full container mx-auto px-4 mt-8 md:-mb-28">
           <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-2xl max-w-5xl mx-auto animate-fade-in-up text-left" style={{animationDelay: '0.3s'}}>
             <div className="flex border-b mb-4">
                 {Object.values(PropertyType).map(type => (
                     <button
                         key={type}
                         type="button"
                         onClick={() => setActiveTab(type)}
                         className={`py-3 px-6 text-sm md:text-base font-semibold transition-colors duration-300 ${activeTab === type ? 'border-b-2 border-brand-gold text-brand-blue' : 'text-gray-500 hover:text-brand-blue'}`}
                     >
                         {type}
                     </button>
                 ))}
             </div>
             <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                  <div className="lg:col-span-2">
                    <label htmlFor="searchQuery" className={formLabelClass}>Localisation</label>
                    <input id="searchQuery" type="text" placeholder="Quartier, adresse..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className={formInputClass} />
                  </div>
                  <div>
                     <label htmlFor="bedrooms" className={formLabelClass}>Chambres</label>
                     <select id="bedrooms" value={bedrooms} onChange={e => setBedrooms(e.target.value)} className={formInputClass}>
                         <option value="">Toutes</option>
                         <option value="1">1+</option>
                         <option value="2">2+</option>
                         <option value="3">3+</option>
                         <option value="4">4+</option>
                     </select>
                  </div>
                   <div>
                    <label htmlFor="maxPrice" className={formLabelClass}>Prix Max (XAF)</label>
                    <input id="maxPrice" type="number" placeholder="Budget max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className={formInputClass} />
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button type="submit" className="w-full bg-brand-gold hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center text-base">
                      <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                      Rechercher
                    </button>
                  </div>
                </div>
             </div>
          </form>
        </div>
      </section>

      {/* Services Section */}
      <section className="pt-16 md:pt-40 pb-20 bg-brand-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-serif">Nos Services</h2>
                  <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Un service complet pour répondre à tous vos besoins immobiliers.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 <ServiceHighlight 
                    icon={<HomeModernIcon className="h-8 w-8" />}
                    title="Vente"
                    description="Découvrez une sélection exclusive de biens à vendre."
                    link={`/biens?type=${PropertyType.SALE}`}
                 />
                 <ServiceHighlight 
                    icon={<BuildingStorefrontIcon className="h-8 w-8" />}
                    title="Location"
                    description="Trouvez le logement idéal pour vous et votre famille."
                    link={`/biens?type=${PropertyType.RENT}`}
                 />
                 <ServiceHighlight 
                    icon={<BuildingOfficeIcon className="h-8 w-8" />}
                    title="Meublés"
                    description="Des appartements et studios prêts à vous accueillir."
                    link={`/biens?type=${PropertyType.FURNISHED}`}
                 />
                 <ServiceHighlight 
                    icon={<WrenchScrewdriverIcon className="h-8 w-8" />}
                    title="Clé en Main"
                    description="Construction, rénovation et accompagnement personnalisé."
                    link="/services"
                 />
              </div>
          </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-serif">Biens à la Une</h2>
            <p className="mt-4 text-lg text-gray-600">Le meilleur de notre catalogue, sélectionné pour vous.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="text-center mt-12">
              <Link to="/biens" className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300">
                Voir tous les biens
              </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-serif">Produits à la Une</h2>
            <p className="mt-4 text-lg text-gray-600">Notre sélection d'articles pour parfaire votre intérieur.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
              <Link to="/boutique" className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300">
                Visiter la boutique
              </Link>
          </div>
        </div>
      </section>

        {/* CTA Section */}
      <section className="bg-brand-dark text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold font-serif">Vous êtes propriétaire ?</h2>
                  <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">Confiez-nous la vente, la location ou la gestion de votre bien. Profitez de notre visibilité et de notre expertise pour une transaction sereine et rentable.</p>
                  <div className="mt-8">
                      <Link to="/contact" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-4 px-10 rounded-md transition-colors duration-300 text-lg">
                        Estimez votre bien
                      </Link>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};

export default HomePage;