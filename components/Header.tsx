
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { PropertyType } from '../types';

interface NavLinksProps {
  onLinkClick?: () => void;
}

const DropdownLink: React.FC<{ title: string; type: PropertyType; items: string[]; onLinkClick?: () => void }> = ({ title, type, items, onLinkClick }) => {
  const [isDesktopOpen, setDesktopOpen] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentType = searchParams.get('type');

  const linkClass = "py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300 flex items-center";
  const activeLinkClass = "font-semibold text-brand-gold";
  const inactiveLinkClass = "text-brand-dark hover:text-brand-gold hover:bg-gray-100";
  
  const isTypeActive = (typeParam: PropertyType) => {
    return location.pathname === '/biens' && currentType === typeParam;
  };

  const handleMobileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMobileOpen(!isMobileOpen);
  };

  const handleSubLinkClick = () => {
    setMobileOpen(false);
    if (onLinkClick) {
      onLinkClick();
    }
  };
  
  const encodedType = encodeURIComponent(type);

  return (
    <>
      {/* Desktop Dropdown */}
      <div className="relative hidden md:block" onMouseEnter={() => setDesktopOpen(true)} onMouseLeave={() => setDesktopOpen(false)}>
        <Link 
          to={`/biens?type=${encodedType}`}
          className={`${linkClass} ${isTypeActive(type) ? activeLinkClass : inactiveLinkClass}`}
        >
          {title} <ChevronDownIcon className="h-4 w-4 ml-1" />
        </Link>
        {isDesktopOpen && (
          <div className="absolute z-50 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {items.map(item => (
                <NavLink
                  key={item}
                  to={`/biens?type=${encodedType}&q=${encodeURIComponent(item.toLowerCase())}`}
                  className={() =>
                    `block px-4 py-2 text-sm text-brand-dark hover:bg-gray-100 ${
                      location.search.includes(`q=${encodeURIComponent(item.toLowerCase())}`) && isTypeActive(type) ? 'bg-gray-100 font-semibold' : ''
                    }`
                  }
                  role="menuitem"
                >
                  {item}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Accordion */}
      <div className="md:hidden">
        <button
          onClick={handleMobileClick}
          className={`w-full text-left ${linkClass} ${isTypeActive(type) ? activeLinkClass : inactiveLinkClass} justify-between`}
        >
          {title}
          <ChevronDownIcon className={`h-5 w-5 transition-transform ${isMobileOpen ? 'rotate-180' : ''}`} />
        </button>
        {isMobileOpen && (
          <div className="pl-4 py-2 space-y-2 bg-gray-50 rounded-b-md">
            {items.map(item => (
              <NavLink
                key={item}
                to={`/biens?type=${encodedType}&q=${encodeURIComponent(item.toLowerCase())}`}
                onClick={handleSubLinkClick}
                className={() =>
                  `block py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300 text-brand-dark hover:text-brand-gold hover:bg-gray-100 ${
                    location.search.includes(`q=${encodeURIComponent(item.toLowerCase())}`) && isTypeActive(type) ? 'font-semibold text-brand-gold' : ''
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </>
  );
};


const NavLinks: React.FC<NavLinksProps> = ({ onLinkClick }) => {
  const location = useLocation();
  const linkClass = "py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300";
  const activeLinkClass = "font-semibold text-brand-gold";
  const inactiveLinkClass = "text-brand-dark hover:text-brand-gold hover:bg-gray-100";
  
  const isServiceActive = () => {
    return location.pathname.startsWith('/services');
  };

  const rentalItems = ["Chambre", "Studio", "Appartement", "Bureau", "Salle de fête", "Espace commercial", "Voiture"];
  const saleItems = ["Terrain", "Maison", "Voiture"];
  const furnishedItems = ["Chambre", "Studio", "Appartement"];

  return (
    <>
      <NavLink 
        to="/" 
        onClick={onLinkClick}
        className={({ isActive }) => `${linkClass} ${isActive && location.pathname === '/' ? activeLinkClass : inactiveLinkClass}`}
      >
        Accueil
      </NavLink>
      
      <DropdownLink title="À Vendre" type={PropertyType.SALE} items={saleItems} onLinkClick={onLinkClick} />
      <DropdownLink title="À Louer" type={PropertyType.RENT} items={rentalItems} onLinkClick={onLinkClick} />
      <DropdownLink title="Meublés" type={PropertyType.FURNISHED} items={furnishedItems} onLinkClick={onLinkClick} />
      
      <NavLink 
        to="/services" 
        onClick={onLinkClick}
        className={`${linkClass} ${isServiceActive() ? activeLinkClass : inactiveLinkClass}`}
      >
        Services
      </NavLink>
       <NavLink 
        to="/boutique" 
        onClick={onLinkClick}
        className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
      >
        Boutique
      </NavLink>
    </>
  );
};


const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" onClick={closeMenu} className="text-brand-dark text-2xl font-bold font-serif">
                            Immo<span className="text-brand-gold">Yaoundé</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLinks />
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-transparent inline-flex items-center justify-center p-2 rounded-md text-brand-dark hover:text-brand-gold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-brand-gold"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
                        <NavLinks onLinkClick={closeMenu} />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
