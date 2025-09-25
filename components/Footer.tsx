import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../DataContext';
import { PropertyType } from '../types';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode; label: string }> = ({ href, children, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
    <span className="sr-only">{label}</span>
    {children}
  </a>
);


const Footer: React.FC = () => {
  const { footerData } = useData();
  const { facebookUrl, xUrl, instagramUrl } = footerData;

  return (
    <footer className="bg-brand-dark text-gray-300">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-white text-xl font-bold font-serif mb-4">
                Immo<span className="text-brand-gold">Yaoundé</span>
            </h3>
            <p className="text-sm leading-relaxed pr-4">{footerData.description}</p>
            <div className="flex space-x-4 mt-4">
                {facebookUrl && <SocialIcon href={facebookUrl} label="Facebook">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </SocialIcon>}
                {xUrl && <SocialIcon href={xUrl} label="X (Twitter)">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </SocialIcon>}
                {instagramUrl && <SocialIcon href={instagramUrl} label="Instagram">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 6.345 2.525c.636-.247 1.363.416 2.427.465C9.795 2.013 10.148 2 12.315 2zm0 1.623c-2.378 0-2.706.01-3.66.058a3.268 3.268 0 0 0-1.8.64 3.268 3.268 0 0 0-.64 1.8c-.048.954-.058 1.282-.058 3.66s.01 2.706.058 3.66a3.268 3.268 0 0 0.64 1.8 3.268 3.268 0 0 0 1.8.64c.954.048 1.282.058 3.66.058s2.706-.01 3.66-.058a3.268 3.268 0 0 0 1.8-.64 3.268 3.268 0 0 0 .64-1.8c.048-.954.058-1.282-.058-3.66s-.01-2.706-.058-3.66a3.268 3.268 0 0 0-.64-1.8 3.268 3.268 0 0 0-1.8-.64c-.954-.048-1.282-.058-3.66-.058zM12 8.118a3.882 3.882 0 100 7.764 3.882 3.882 0 000-7.764zm0 6.138a2.256 2.256 0 110-4.512 2.256 2.256 0 010 4.512zM16.55 6.42a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" /></svg>
                </SocialIcon>}
            </div>
          </div>

          {/* Column 2: Nos Offres */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Nos Offres</h3>
            <div className="text-sm space-y-3">
                <div>
                    <h4 className="font-semibold text-gray-100">{PropertyType.SALE}</h4>
                    <ul className="pl-4 mt-1 space-y-1 list-disc list-inside">
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.SALE)}&q=terrain`} className="hover:text-brand-gold transition-colors">Terrain à vendre</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.SALE)}&q=maison`} className="hover:text-brand-gold transition-colors">Maison à vendre</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.SALE)}&q=voiture`} className="hover:text-brand-gold transition-colors">Voiture à vendre</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-100">{PropertyType.RENT}</h4>
                    <ul className="pl-4 mt-1 space-y-1 list-disc list-inside">
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.RENT)}&q=chambre`} className="hover:text-brand-gold transition-colors">Chambre à louer</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.RENT)}&q=studio`} className="hover:text-brand-gold transition-colors">Studio à louer</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.RENT)}&q=appartement`} className="hover:text-brand-gold transition-colors">Appartement à louer</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.RENT)}&q=commercial`} className="hover:text-brand-gold transition-colors">Espace commercial à louer</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.RENT)}&q=voiture`} className="hover:text-brand-gold transition-colors">Voiture à louer</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-100">{PropertyType.FURNISHED}</h4>
                    <ul className="pl-4 mt-1 space-y-1 list-disc list-inside">
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.FURNISHED)}&q=chambre`} className="hover:text-brand-gold transition-colors">Chambre</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.FURNISHED)}&q=studio`} className="hover:text-brand-gold transition-colors">Studio</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.FURNISHED)}&q=appartement`} className="hover:text-brand-gold transition-colors">Appartement</Link></li>
                    </ul>
                </div>
            </div>
          </div>
          
          {/* Column 3: Liens Rapides */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-brand-gold transition-colors">Services</Link></li>
              <li><Link to="/boutique" className="hover:text-brand-gold transition-colors">Boutique</Link></li>
              <li><Link to="/a-propos" className="hover:text-brand-gold transition-colors">Qui sommes-nous?</Link></li>
              <li><Link to={footerData.legalNoticeUrl || '/mentions-legales'} className="hover:text-brand-gold transition-colors">Mentions Légales</Link></li>
              <li><Link to={footerData.privacyPolicyUrl || '/mentions-legales'} className="hover:text-brand-gold transition-colors">Politique de Confidentialité</Link></li>
              <li><Link to="/admin" className="hover:text-brand-gold transition-colors">Administration</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                    <MapPinIcon className="h-5 w-5 mr-3 mt-0.5 text-brand-gold flex-shrink-0"/>
                    <span>{footerData.address}</span>
                </li>
                 <li className="flex items-start">
                    <PhoneIcon className="h-5 w-5 mr-3 mt-0.5 text-brand-gold flex-shrink-0"/>
                    <span>{footerData.phone}</span>
                </li>
                 <li className="flex items-start">
                    <EnvelopeIcon className="h-5 w-5 mr-3 mt-0.5 text-brand-gold flex-shrink-0"/>
                    <span>{footerData.email}</span>
                </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
           <p>&copy; {new Date().getFullYear()} ImmoYaoundé. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;