

import React from 'react';

const LegalPage: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="bg-white py-12 text-center border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-brand-slate">Mentions Légales & Politique de Confidentialité</h1>
          <p className="mt-2 text-lg text-brand-slate/90">Informations concernant l'éditeur du site et la gestion des données personnelles.</p>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose lg:prose-lg text-brand-slate/90">
            <h2 className="text-2xl font-bold font-serif text-brand-slate">1. Éditeur du Site</h2>
            <p>
              <strong>Nom de l'agence :</strong> ImmoYaoundé<br />
              <strong>Adresse :</strong> 123 Avenue de l'Indépendance, Yaoundé, Cameroun<br />
              <strong>Téléphone :</strong> +237 6XX XX XX XX<br />
              <strong>Email :</strong> contact@immoyaounde.com<br />
              <strong>Directeur de la publication :</strong> Marie Claire Ngono
            </p>

            <h2 className="mt-12 text-2xl font-bold font-serif text-brand-slate">2. Hébergement</h2>
            <p>
              Ce site est hébergé par [Nom de l'hébergeur], dont le siège social est situé à [Adresse de l'hébergeur].
            </p>
            
            <h2 className="mt-12 text-2xl font-bold font-serif text-brand-slate">3. Propriété Intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation camerounaise et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>

            <h2 className="mt-12 text-2xl font-bold font-serif text-brand-slate">4. Politique de Confidentialité</h2>
            <p>
              ImmoYaoundé s'engage à ce que la collecte et le traitement de vos données, effectués à partir du site www.immoyaounde.com, soient conformes au règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés.
            </p>
            <h3 className="text-brand-slate">Collecte des données personnelles</h3>
            <p>
              Les informations personnelles pouvant être recueillies sur le site sont principalement utilisées par l'éditeur pour la gestion des relations avec vous, et le cas échéant pour le traitement de vos demandes. Les données collectées sont les suivantes : nom, prénom, adresse email, numéro de téléphone, et le contenu de votre message via le formulaire de contact.
            </p>
            <h3 className="text-brand-slate">Droit d'accès, de rectification et de déréférencement de vos données</h3>
            <p>
              En application de la réglementation applicable aux données à caractère personnel, les utilisateurs disposent des droits suivants, qu'ils peuvent exercer en écrivant à l'adresse électronique : contact@immoyaounde.com.
            </p>
            <ul>
              <li>Le droit d’accès : ils peuvent exercer leur droit d'accès, pour connaître les données personnelles les concernant.</li>
              <li>Le droit de rectification : si les données à caractère personnel détenues par la plateforme sont inexactes, ils peuvent demander la mise à jour des informations.</li>
              <li>Le droit de suppression des données : les utilisateurs peuvent demander la suppression de leurs données à caractère personnel, conformément aux lois applicables en matière de protection des données.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;