import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../DataContext';
import { PropertyType } from '../types';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { Icon } from './IconMap';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode; label: string }> = ({ href, children, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
    <span className="sr-only">{label}</span>
    {children}
  </a>
);


const Footer: React.FC = () => {
  const { footerData } = useData();
  const { facebookUrl, xUrl, youtubeUrl, tiktokUrl, pinterestUrl, facebookIcon, xIcon, youtubeIcon, tiktokIcon, pinterestIcon } = footerData;

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
                    <Icon name={facebookIcon || 'Link'} className="w-6 h-6" />
                </SocialIcon>}
                {xUrl && <SocialIcon href={xUrl} label="X (Twitter)">
                    <Icon name={xIcon || 'Link'} className="w-6 h-6" />
                </SocialIcon>}
                {youtubeUrl && <SocialIcon href={youtubeUrl} label="YouTube">
                    <Icon name={youtubeIcon || 'Link'} className="w-6 h-6" />
                </SocialIcon>}
                {tiktokUrl && <SocialIcon href={tiktokUrl} label="TikTok">
                    <Icon name={tiktokIcon || 'Link'} className="w-6 h-6" />
                </SocialIcon>}
                {pinterestUrl && <SocialIcon href={pinterestUrl} label="Pinterest">
                    <Icon name={pinterestIcon || 'Link'} className="w-6 h-6" />
                </SocialIcon>}
            </div>
          </div>

          {/* Column 2: Nos Offres */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Nos Offres</h3>
            <div className="text-sm space-y-4">
                <div>
                    <h4 className="font-semibold text-gray-100">Bien à louer à Yaoundé</h4>
                    <ul className="pl-4 mt-2 space-y-2 list-disc list-inside">
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.RENT)}&q=chambre`} className="hover:text-brand-gold transition-colors">Chambre à louer à Yaoundé</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.RENT)}&q=studio`} className="hover:text-brand-gold transition-colors">Studio à louer à Yaoundé</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.RENT)}&q=appartement`} className="hover:text-brand-gold transition-colors">Appartement à louer à Yaoundé</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.RENT)}&q=bureau`} className="hover:text-brand-gold transition-colors">Bureau à louer à Yaoundé</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.RENT)}&q=commercial`} className="hover:text-brand-gold transition-colors">Espace commercial à louer à Yaoundé</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.RENT)}&q=voiture`} className="hover:text-brand-gold transition-colors">Voiture à louer à Yaoundé</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-100">Bien à vendre à Yaoundé</h4>
                    <ul className="pl-4 mt-2 space-y-2 list-disc list-inside">
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.SALE)}&q=terrain`} className="hover:text-brand-gold transition-colors">terrain à vendre à Yaoundé</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.SALE)}&q=maison`} className="hover:text-brand-gold transition-colors">maison à vendre à Yaoundé</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.SALE)}&q=voiture`} className="hover:text-brand-gold transition-colors">Voiture à vendre à Yaoundé</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold text-gray-100">Location meublée à Yaoundé</h4>
                    <ul className="pl-4 mt-2 space-y-2 list-disc list-inside">
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.FURNISHED)}&q=chambre`} className="hover:text-brand-gold transition-colors">Chambre meublée à louer à Yaoundé</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.FURNISHED)}&q=studio`} className="hover:text-brand-gold transition-colors">Studio meublé à louer à Yaoundé</Link></li>
                        <li><Link to={`/biens?type=${encodeURIComponent(PropertyType.FURNISHED)}&q=appartement`} className="hover:text-brand-gold transition-colors">Appartement meublé à louer à Yaoundé</Link></li>
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