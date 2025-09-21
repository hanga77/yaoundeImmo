import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { PropertyType } from '../types';

const NavLinks = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentType = searchParams.get('type');

  const linkClass = "py-2 px-3 rounded-md text-sm font-medium transition-colors duration-300";
  const activeLinkClass = "bg-brand-gold text-white";
  const inactiveLinkClass = "text-white hover:bg-brand-blue/60";
  
  const isTypeActive = (type: PropertyType) => {
    return location.pathname === '/biens' && currentType === type;
  }
  
  const isServiceActive = () => {
    return location.pathname.startsWith('/services');
  }

  return (
    <>
      <NavLink 
        to="/" 
        className={({ isActive }) => `${linkClass} ${isActive && location.pathname === '/' ? activeLinkClass : inactiveLinkClass}`}
      >
        Accueil
      </NavLink>
      <NavLink 
        to={`/biens?type=${PropertyType.SALE}`}
        className={`${linkClass} ${isTypeActive(PropertyType.SALE) ? activeLinkClass : inactiveLinkClass}`}
      >
        À Vendre
      </NavLink>
      <NavLink 
        to={`/biens?type=${PropertyType.RENT}`} 
        className={`${linkClass} ${isTypeActive(PropertyType.RENT) ? activeLinkClass : inactiveLinkClass}`}
      >
        À Louer
      </NavLink>
      <NavLink 
        to={`/biens?type=${PropertyType.FURNISHED}`} 
        className={`${linkClass} ${isTypeActive(PropertyType.FURNISHED) ? activeLinkClass : inactiveLinkClass}`}
      >
        Meublés
      </NavLink>
      <NavLink 
        to="/services" 
        className={`${linkClass} ${isServiceActive() ? activeLinkClass : inactiveLinkClass}`}
      >
        Services
      </NavLink>
       <NavLink 
        to="/boutique" 
        className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
      >
        Boutique
      </NavLink>
      <NavLink 
        to="/a-propos" 
        className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
      >
        À Propos
      </NavLink>
    </>
  );
};


const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-brand-blue shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-white text-2xl font-bold font-serif">
                            Immo<span className="text-brand-gold">Yaoundé</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <NavLinks />
                        </div>
                    </div>
                    <div className="hidden md:block">
                         <Link to="/contact" className="ml-4 py-2 px-4 bg-brand-gold text-white rounded-md text-sm font-medium hover:bg-yellow-600 transition-colors duration-300">
                            Contactez-nous
                        </Link>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-brand-blue/80 inline-flex items-center justify-center p-2 rounded-md text-brand-gold hover:text-white hover:bg-brand-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-blue focus:ring-white"
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
                        <NavLinks />
                         <Link to="/contact" className="mt-4 text-center py-2 px-4 bg-brand-gold text-white rounded-md text-sm font-medium hover:bg-yellow-600 transition-colors duration-300">
                            Contactez-nous
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;