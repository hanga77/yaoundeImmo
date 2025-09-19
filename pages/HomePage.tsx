
import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { MagnifyingGlassIcon, HomeModernIcon, BuildingStorefrontIcon, BuildingOfficeIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { useData } from '../DataContext';

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
  const { properties } = useData();
  const featuredProperties = properties.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[60vh] text-white flex items-center justify-center" style={{backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 animate-fade-in-down">Trouvez la propriété de vos rêves à Yaoundé</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up">Votre partenaire de confiance pour l'achat, la vente et la location.</p>
          <form className="bg-white p-4 rounded-lg shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <input type="text" placeholder="Entrez un quartier ou une ville..." className="w-full md:flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold text-gray-800" />
            <select className="w-full md:w-auto p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold text-gray-800">
                <option>À Vendre</option>
                <option>À Louer</option>
                <option>Meublé</option>
            </select>
            <button type="submit" className="w-full md:w-auto bg-brand-gold hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center">
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              Rechercher
            </button>
          </form>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-brand-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-serif">Nos Domaines d'Expertise</h2>
                  <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Un service complet pour répondre à tous vos besoins immobiliers.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                 <ServiceHighlight 
                    icon={<HomeModernIcon className="h-8 w-8" />}
                    title="À Vendre"
                    description="Découvrez une sélection exclusive de biens à vendre."
                    link="/a-vendre"
                 />
                 <ServiceHighlight 
                    icon={<BuildingStorefrontIcon className="h-8 w-8" />}
                    title="À Louer"
                    description="Trouvez le logement idéal pour vous et votre famille."
                    link="/a-louer"
                 />
                 <ServiceHighlight 
                    icon={<BuildingOfficeIcon className="h-8 w-8" />}
                    title="Meublés"
                    description="Des appartements et studios prêts à vous accueillir."
                    link="/meuble"
                 />
                 <ServiceHighlight 
                    icon={<WrenchScrewdriverIcon className="h-8 w-8" />}
                    title="Services Clé en Main"
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
              <Link to="/a-vendre" className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300">
                Voir tous les biens
              </Link>
          </div>
        </div>
      </section>

        {/* CTA Section */}
      <section className="bg-brand-blue text-white">
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
