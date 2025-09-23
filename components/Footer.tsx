import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../DataContext';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-brand-blue transition-colors duration-300">
    {children}
  </a>
);

const Footer: React.FC = () => {
  const { footerData } = useData();
  const { facebookUrl, xUrl, instagramUrl, youtubeUrl, linkedinUrl, tiktokUrl } = footerData;

  return (
    <footer className="bg-white text-gray-600 border-t">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-6">
          <Link to={footerData.legalNoticeUrl || '/mentions-legales'} className="hover:text-brand-blue">Mentions Légales</Link>
          <Link to={footerData.privacyPolicyUrl || '/mentions-legales'} className="hover:text-brand-blue">Politique de Confidentialité</Link>
          <Link to="/contact" className="hover:text-brand-blue">Contact</Link>
          <Link to="/admin" className="hover:text-brand-blue">Administration</Link>
        </div>

        <div className="flex justify-center space-x-6 mb-6">
          {facebookUrl && (
            <SocialIcon href={facebookUrl}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
            </SocialIcon>
          )}
          {xUrl && (
            <SocialIcon href={xUrl}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </SocialIcon>
          )}
          {youtubeUrl && (
            <SocialIcon href={youtubeUrl}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.594.42-7.812.42-7.812.42s-6.218 0-7.812-.42a2.506 2.506 0 0 1-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 0 1 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418ZM15.197 12 10 14.87v-5.74L15.197 12Z" clipRule="evenodd" /></svg>
            </SocialIcon>
          )}
          {linkedinUrl && (
            <SocialIcon href={linkedinUrl}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.389 0-1.601 1.086-1.601 2.206v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.336 8.905H4.002v-8.59h2.671zM17.668 1H6.329A5.332 5.332 0 0 0 1 6.329v11.342A5.332 5.332 0 0 0 6.329 23h11.339A5.332 5.332 0 0 0 23 17.671V6.329A5.332 5.332 0 0 0 17.668 1z" clipRule="evenodd" /></svg>
            </SocialIcon>
          )}
          {instagramUrl && (
            <SocialIcon href={instagramUrl}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 0 1 1.772 1.153 4.902 4.902 0 0 1 1.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 0 1-1.153 1.772 4.902 4.902 0 0 1-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 0 1-1.772-1.153 4.902 4.902 0 0 1-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 0 1 1.153-1.772A4.902 4.902 0 0 1 6.345 2.525c.636-.247 1.363.416 2.427.465C9.795 2.013 10.148 2 12.315 2zm0 1.623c-2.378 0-2.706.01-3.66.058a3.268 3.268 0 0 0-1.8.64 3.268 3.268 0 0 0-.64 1.8c-.048.954-.058 1.282-.058 3.66s.01 2.706.058 3.66a3.268 3.268 0 0 0.64 1.8 3.268 3.268 0 0 0 1.8.64c.954.048 1.282.058 3.66.058s2.706-.01 3.66-.058a3.268 3.268 0 0 0 1.8-.64 3.268 3.268 0 0 0 .64-1.8c.048-.954.058-1.282-.058-3.66s-.01-2.706-.058-3.66a3.268 3.268 0 0 0-.64-1.8 3.268 3.268 0 0 0-1.8-.64c-.954-.048-1.282-.058-3.66-.058zM12 8.118a3.882 3.882 0 100 7.764 3.882 3.882 0 000-7.764zm0 6.138a2.256 2.256 0 110-4.512 2.256 2.256 0 010 4.512zM16.55 6.42a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" /></svg>
            </SocialIcon>
          )}
          {tiktokUrl && (
             <SocialIcon href={tiktokUrl}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.04-5.36Z" /></svg>
             </SocialIcon>
          )}
        </div>

        <div className="text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} ImmoYaoundé. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;