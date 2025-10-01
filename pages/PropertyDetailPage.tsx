import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import { MapPinIcon, ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-brand-gold" viewBox="0 0 20 20" fill="currentColor">
    <path d="M18 6.5a.5.5 0 00-.5-.5h-3a.5.5 0 000 1h3a.5.5 0 00.5-.5z" />
    <path fillRule="evenodd" d="M1 4a1 1 0 011-1h16a1 1 0 011 1v10a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm2 1v3h14V5H3zm0 4v5h14V9H3z" clipRule="evenodd" />
  </svg>
);

const BathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-brand-gold" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.25 3A2.25 2.25 0 001 5.25v9.5A2.25 2.25 0 003.25 17h13.5A2.25 2.25 0 0019 14.75v-9.5A2.25 2.25 0 0016.75 3H3.25zM2.5 5.25a.75.75 0 01.75-.75h13.5a.75.75 0 01.75.75v9.5a.75.75 0 01-.75-.75H3.25a.75.75 0 01-.75-.75v-9.5zM12.5 8a.5.5 0 01.5.5v1a.5.5 0 01-1 0v-1a.5.5 0 01.5-.5zM11 9.5a.5.5 0 00-1 0V11h-1V9.5a.5.5 0 00-1 0V11H7V9.5a.5.5 0 00-1 0v1.98c0 .28.22.52.5.52H11.5a.5.5 0 00.5-.52V9.5z" clipRule="evenodd" />
  </svg>
);

const AreaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-brand-gold" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm2 1h12v12H4V4zm4 4H6v2h2V8zm0 3H6v2h2v-2zm0 3H6v2h2v-2zm3-6h2v2h-2V8zm3 0h2v2h-2V8zm-3 3h2v2h-2v-2zm3 0h2v2h-2v-2zm-3 3h2v2h-2v-2zm3 0h2v2h-2v-2z" clipRule="evenodd" />
  </svg>
);

const PropertyDetailPage: React.FC = () => {
    const { propertyId } = useParams<{ propertyId: string }>();
    const { properties } = useData();
    const navigate = useNavigate();
    const property = properties.find(p => p.id === propertyId);
    
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!property) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold">Bien non trouvé</h1>
                <p className="mt-4">Le bien que vous recherchez n'existe pas.</p>
                <Link to="/" className="mt-8 inline-block bg-brand-gold text-white font-bold py-2 px-4 rounded hover:bg-yellow-600">
                    Retour à l'accueil
                </Link>
            </div>
        );
    }
    
    const images = property.imageUrls && property.imageUrls.length > 0 ? property.imageUrls : [property.imageUrl];
    
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };
    
    const formattedPrice = new Intl.NumberFormat('fr-CM', {
        style: 'currency',
        currency: 'XAF',
        minimumFractionDigits: 0,
    }).format(property.price);


    return (
        <div className="bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-gold mb-8 transition-colors">
                    <ArrowLeftIcon className="h-5 w-5" />
                    Retour
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Image Gallery */}
                    <div className="lg:col-span-3">
                        <div className="relative h-[55vh] md:h-[60vh] lg:h-[500px] w-full rounded-lg shadow-lg overflow-hidden group bg-brand-dark">
                            <div style={{ backgroundImage: `url(${images[currentIndex]})` }} className="w-full h-full bg-center bg-contain bg-no-repeat duration-500"></div>
                            {/* Left Arrow */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronLeftIcon onClick={prevSlide} className="w-8 h-8" />
                            </div>
                            {/* Right Arrow */}
                            <div className="absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRightIcon onClick={nextSlide} className="w-8 h-8" />
                            </div>
                        </div>
                        {images.length > 1 && (
                            <div className="flex flex-wrap justify-center py-4 gap-2">
                                {images.map((image, index) => (
                                    <div key={index} onClick={() => goToSlide(index)} className="cursor-pointer">
                                        <img 
                                            src={image} 
                                            alt={`Vignette ${index + 1}`} 
                                            className={`h-16 w-24 object-contain bg-gray-100 rounded-md border-2 ${currentIndex === index ? 'border-brand-gold' : 'border-transparent'} hover:border-brand-gold transition-all`}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Property Details */}
                    <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-lg shadow-lg">
                        <span className="inline-block bg-brand-gold/20 text-brand-gold text-sm font-semibold px-3 py-1 rounded-full mb-4">{property.type}</span>
                        <h1 className="text-2xl md:text-3xl font-bold font-serif text-brand-slate mb-2">{property.title}</h1>
                        <div className="flex items-center text-gray-600 mb-6">
                            <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                            <span>{property.address}, {property.commune}</span>
                        </div>
                        <p className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">{formattedPrice} {property.type !== 'À Vendre' && '/ mois'}</p>

                        <div className="grid grid-cols-3 gap-4 text-center my-6 py-4 border-y border-gray-200">
                            {property.bedrooms > 0 && <div>
                                <BedIcon />
                                <p className="text-sm font-semibold">{property.bedrooms} Chambres</p>
                            </div>}
                            {property.bathrooms > 0 && <div>
                                <BathIcon />
                                <p className="text-sm font-semibold">{property.bathrooms} Salles de bain</p>
                            </div>}
                             <div>
                                <AreaIcon />
                                <p className="text-sm font-semibold">{property.area} m²</p>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-brand-slate mt-8 mb-4">Description</h2>
                        <p className="text-brand-slate/90 leading-relaxed">{property.description}</p>
                        
                        <div className="mt-10">
                            <Link to="/contact" className="w-full text-center block bg-brand-gold text-white font-bold py-3 px-6 rounded-md transition-all duration-300 hover:bg-yellow-600">
                                Contacter un agent
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailPage;