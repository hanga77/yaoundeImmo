import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { products, footerData } = useData();
    const navigate = useNavigate();
    const product = products.find(p => p.id === productId);
    
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!product) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold">Produit non trouvé</h1>
                <p className="mt-4">Le produit que vous recherchez n'existe pas.</p>
                <Link to="/boutique" className="mt-8 inline-block bg-brand-gold text-white font-bold py-2 px-4 rounded hover:bg-yellow-600">
                    Retour à la boutique
                </Link>
            </div>
        );
    }
    
    const images = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [product.imageUrl];
    
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
    
    const formattedPrice = new Intl.NumberFormat('fr-CM', {
        style: 'currency',
        currency: 'XAF',
        minimumFractionDigits: 0,
    }).format(product.price);

    const handleWhatsAppPurchase = () => {
        const phoneNumber = footerData.phone.replace(/[^0-9]/g, '');
        const message = `Bonjour, je suis intéressé(e) par le produit "${product.name}" (${formattedPrice}) vu sur votre site. Est-il toujours disponible ?`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-gold mb-8 transition-colors">
                    <ArrowLeftIcon className="h-5 w-5" />
                    Retour
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div>
                        <div className="relative h-[55vh] md:h-[60vh] lg:h-[500px] w-full rounded-lg shadow-lg overflow-hidden group bg-brand-dark">
                            <div style={{ backgroundImage: `url(${images[currentIndex]})` }} className="w-full h-full bg-center bg-contain bg-no-repeat duration-500"></div>
                            {images.length > 1 && <>
                                <div className="absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer md:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronLeftIcon onClick={prevSlide} className="w-8 h-8" />
                                </div>
                                <div className="absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer md:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRightIcon onClick={nextSlide} className="w-8 h-8" />
                                </div>
                            </>}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>
                        <span className="inline-block bg-brand-light text-brand-blue text-sm font-semibold px-3 py-1 rounded-full mb-4">{product.category}</span>
                        <h1 className="text-3xl md:text-4xl font-bold font-serif text-brand-slate mb-4">{product.name}</h1>
                        <p className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">{formattedPrice}</p>
                        
                        <div className="prose lg:prose-lg my-6">
                            <p className="text-brand-slate/90">{product.description}</p>
                        </div>
                        
                        <div className="mt-10">
                            <button onClick={handleWhatsAppPurchase} className="w-full text-center block bg-brand-gold text-white font-bold py-4 px-6 rounded-md transition-all duration-300 text-lg hover:bg-yellow-600">
                                Acheter sur WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;