
import React from 'react';
import { AGENTS } from '../constants';

const AgentCard: React.FC<{ agent: typeof AGENTS[0] }> = ({ agent }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden text-center p-6 transform hover:-translate-y-2 transition-transform duration-300">
    <img src={agent.imageUrl} alt={agent.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-brand-gold" />
    <h3 className="mt-4 text-xl font-bold text-brand-blue">{agent.name}</h3>
    <p className="text-brand-gold font-semibold">{agent.title}</p>
    <p className="mt-2 text-sm text-gray-600">{agent.bio}</p>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-brand-dark py-20 text-white text-center" style={{backgroundImage: "url('https://picsum.photos/seed/about/1920/1080')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
         <div className="absolute inset-0 bg-black opacity-60"></div>
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl font-bold font-serif">Notre Agence</h1>
          <p className="mt-4 text-xl text-gray-200 max-w-2xl mx-auto">Passion, expertise et engagement au service de votre projet immobilier.</p>
        </div>
      </div>
      
      {/* Agency Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-blue font-serif mb-4">Notre Histoire</h2>
              <p className="text-gray-700 mb-4">Fondée avec la vision de transformer l'expérience immobilière à Yaoundé, ImmoYaoundé est devenue un acteur incontournable du marché. Notre agence est bâtie sur des valeurs de transparence, d'intégrité et de service client irréprochable.</p>
              <p className="text-gray-700">Nous couvrons l'ensemble des 7 communes de Yaoundé, avec une connaissance approfondie de chaque quartier, de ses atouts et de son potentiel. Notre mission est de vous offrir un accompagnement sur-mesure, que vous soyez vendeur, acheteur, locataire ou investisseur.</p>
            </div>
            <div>
              <img src="https://picsum.photos/seed/office/800/600" alt="Bureau de l'agence" className="rounded-lg shadow-xl w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue font-serif">Notre Équipe d'Experts</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Des professionnels passionnés et dévoués à votre succès.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {AGENTS.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-blue font-serif mb-4">Nos Zones d'Intervention</h2>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">Nous opérons sur l'ensemble du territoire de Yaoundé, vous offrant une couverture complète des 7 communes de la capitale.</p>
          <div className="bg-gray-200 rounded-lg shadow-lg overflow-hidden h-96 flex items-center justify-center">
             {/* Replace with a real map component or an image of a map */}
             <img src="https://picsum.photos/seed/map/1200/400" alt="Carte de Yaoundé" className="w-full h-full object-cover"/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
