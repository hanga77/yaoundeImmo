import React from 'react';
import { BuildingOffice2Icon, WrenchScrewdriverIcon, TruckIcon, HomeModernIcon, LifebuoyIcon, LinkIcon } from '@heroicons/react/24/outline';

// --- Social Icons (Brand icons are not in Heroicons, so we define them here) ---
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
);
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path fillRule="evenodd" d="M19.812 5.418c.858.225 1.54 1.005 1.622 1.94.12 1.34.166 4.38.166 4.642s-.046 3.302-.166 4.642c-.082.935-.764 1.715-1.622 1.94-1.44.378-7.812.378-7.812.378s-6.372 0-7.812-.378c-.858-.225-1.54-1.005-1.622-1.94C2.046 16.642 2 13.602 2 12s.046-4.642.166-5.982c.082-.935.764-1.715 1.622-1.94C5.228 3.698 12 3.698 12 3.698s6.372 0 7.812.32zM9.546 14.805l6.19-2.805-6.19-2.805v5.61z" clipRule="evenodd" /></svg>
);
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.38 1.92-3.54 2.96-5.94 2.96-3.08 0-5.83-1.7-7.15-4.12-1.02-1.87-1.3-4.38-1.02-6.51.25-1.99 1.2-3.84 2.5-5.33 1.02-1.16 2.34-1.97 3.84-2.43.3-.09.61-.15.92-.23.03-2.48.01-4.95-.04-7.43h4.03z" /></svg>
);
const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.32 12.78c-.14.64-.6 1.14-1.2 1.34-.84.28-1.74-.08-2.28-.72-.32-.38-.64-.78-.94-1.2.04-.02.08-.04.12-.08.4-.24.78-.54 1.12-.9.32-.36.62-.74.88-1.16.28-.44.5-.9.64-1.4.12-.42.2-.86.2-1.3 0-1.22-.5-2.3-1.32-3.1-.92-.88-2.14-1.32-3.5-1.32-1.76 0-3.3 1-4.22 2.52-.6.98-.82 2.1-.64 3.22.14.9.6 1.7 1.28 2.32.2.18.42.34.66.46.28.14.58.24.9.28.62.1 1.2-.1 1.66-.5.18-.18.32-.4.44-.64.08-.14.14-.3.18-.46.06-.18.08-.38.08-.58 0-.46-.14-.88-.42-1.22-.3-.36-.7-.6-1.16-.72-.16-.04-.32-.06-.5-.06-.24 0-.48.04-.7.12-.6.2-.96.64-1.1 1.2-.08.32-.1.66-.06 1 .04.32.14.62.3.9.14.26.32.5.52.7.2.2.42.36.66.5.42.24.88.4 1.36.46.24.04.5.04.74.02.5-.04 1-.2 1.42-.5.54-.36.98-.86 1.28-1.42.08-.16.14-.32.2-.5.04-.12.08-.24.1-.38.02-.12.04-.24.04-.38 0-.02 0-.04.02-.06.02-.04.04-.1.06-.14.04-.1.08-.22.1-.34.02-.1.02-.2.02-.3 0-.02 0-.04-.02-.06-.02-.06-.02-.12-.04-.18-.04-.12-.08-.24-.14-.34-.06-.12-.14-.22-.22-.32-.28-.34-.66-.58-1.1-.66-.4-.06-.82.02-1.18.24-.3.18-.54.44-.7.76-.14.28-.22.6-.22.92 0 .42.1.8.3 1.12.18.28.4.52.66.7.12.08.24.14.38.2.12.04.24.06.38.06.34 0 .66-.08.92-.26.2-.14.36-.32.48-.54.12-.2.2-.42.24-.66.04-.22.04-.44.02-.66-.04-.44-.2-.84-.44-1.18-.28-.38-.64-.66-1.06-.82-.6-.2-1.24-.12-1.78.2-.5.3-1 .76-1.38 1.34-.34.52-.56 1.1-.62 1.72-.08.8.12 1.58.52 2.26.4.68.98 1.22 1.66 1.58.74.38 1.56.54 2.42.44 1.1-.12 2.1-.6 2.88-1.36.4-.38.74-.84.98-1.36.08-.16.14-.34.18-.52.02-.08.04-.18.04-.26 0-.08-.02-.16-.04-.24-.02-.08-.06-.16-.1-.24-.06-.14-.14-.26-.24-.38z" /></svg>
);


const iconMap: { [key: string]: React.ElementType } = {
  // Service Icons
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
  TruckIcon,
  HomeModernIcon,
  LifebuoyIcon,

  // Social Icons
  Facebook: FacebookIcon,
  X: XIcon,
  YouTube: YouTubeIcon,
  TikTok: TikTokIcon,
  Pinterest: PinterestIcon,
  Link: LinkIcon, // Generic fallback
};

export const serviceIconNames = ['BuildingOffice2Icon', 'WrenchScrewdriverIcon', 'TruckIcon', 'HomeModernIcon', 'LifebuoyIcon'];
export const socialIconNames = ['Facebook', 'X', 'YouTube', 'TikTok', 'Pinterest', 'Link'];
export const iconNames = [...serviceIconNames, ...socialIconNames];

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return <LifebuoyIcon className={className} />;
  }

  return <IconComponent className={className} />;
};