

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import ProductCard from '../components/ProductCard';
import { HomeModernIcon, BuildingStorefrontIcon, BuildingOfficeIcon, WrenchScrewdriverIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
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
  const { properties, products, carouselSlides } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 4);
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  useEffect(() => {
    if (carouselSlides.length > 1) {
      const timer = setTimeout(() => {
        const isLastSlide = currentIndex === carouselSlides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
      }, 5000); // Change slide every 5 seconds
      return () => clearTimeout(timer);
    }
  }, [currentIndex, carouselSlides.length]);
  
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? carouselSlides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === carouselSlides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const currentSlide = carouselSlides[currentIndex];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[450px] w-full text-white overflow-hidden">
        {carouselSlides.map((slide, index) => (
             <div
                key={slide.id}
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
                style={{
                  backgroundImage: `url(${slide.imageUrl})`,
                  opacity: index === currentIndex ? 1 : 0
                }}
            />
        ))}
       
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        <div className="relative h-full z-10 text-center px-4 container mx-auto flex flex-col justify-center items-center">
            {currentSlide && (
              <>
                <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 animate-fade-in-down">{currentSlide.title}</h1>
                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fade-in-up">{currentSlide.subtitle}</p>
              </>
            )}
             <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <Link to="/biens" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 text-lg">
                    Découvrir nos biens
                </Link>
            </div>
        </div>

        {carouselSlides.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
              <ChevronLeftIcon className="h-8 w-8 text-white"/>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
              <ChevronRightIcon className="h-8 w-8 text-white"/>
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Services Section */}
      <section className="py-20 bg-brand-light">
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
