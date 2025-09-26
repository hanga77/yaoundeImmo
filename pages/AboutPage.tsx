

import React from 'react';
import { useData } from '../DataContext';
import { Agent } from '../types';

const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden text-center p-6 transform hover:-translate-y-2 transition-transform duration-300">
    <img src={agent.imageUrl} alt={agent.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-brand-gold" />
    <h3 className="mt-4 text-xl font-bold text-brand-blue">{agent.name}</h3>
    <p className="text-brand-gold font-semibold">{agent.title}</p>
    <p className="mt-2 text-sm text-gray-600">{agent.bio}</p>
  </div>
);

const AboutPage: React.FC = () => {
  const { agents, aboutData } = useData();

  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="relative bg-brand-dark py-12 text-white text-center" style={{backgroundImage: "url('https://picsum.photos/seed/about/1920/1080')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
         <div className="absolute inset-0 bg-black opacity-60"></div>
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-serif">Notre Agence</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">Passion, expertise et engagement au service de votre projet immobilier.</p>
        </div>
      </div>
      
      {/* Agency Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-blue font-serif mb-4">Notre Histoire</h2>
              <p className="text-gray-700 mb-4">{aboutData.history}</p>
              <p className="text-gray-700">{aboutData.mission}</p>
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
            {agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-blue font-serif mb-4">{aboutData.interventionTitle}</h2>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">{aboutData.interventionText}</p>
          <div className="bg-gray-200 rounded-lg shadow-lg overflow-hidden h-96 flex items-center justify-center">
             <img src={aboutData.interventionImageUrl} alt="Carte de Yaoundé" className="w-full h-full object-cover"/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;