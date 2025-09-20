

import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { HomeIcon, BuildingOffice2Icon, ArrowUturnLeftIcon, Cog6ToothIcon, ArrowRightStartOnRectangleIcon, PencilSquareIcon, WrenchScrewdriverIcon, IdentificationIcon, NewspaperIcon } from '@heroicons/react/24/solid';
import { useData } from '../../DataContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const { logout } = useData();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const linkClass = "flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 rounded-md";
    const activeLinkClass = "bg-brand-gold text-white";

    return (
        <div className={`
            bg-brand-dark text-white flex flex-col min-h-screen
            fixed md:relative md:translate-x-0
            z-30 w-64
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            <div className="h-20 flex items-center justify-center px-4 border-b border-gray-700">
                 <Link to="/admin" className="text-white text-2xl font-bold font-serif">
                    Admin<span className="text-brand-gold">Panel</span>
                </Link>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <HomeIcon className="h-5 w-5 mr-3" />
                    Tableau de Bord
                </NavLink>
                <NavLink
                    to="/admin/properties"
                    className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <BuildingOffice2Icon className="h-5 w-5 mr-3" />
                    Gérer les Biens
                </NavLink>
                <NavLink
                    to="/admin/services"
                    className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <WrenchScrewdriverIcon className="h-5 w-5 mr-3" />
                    Gérer les Services
                </NavLink>
                 <NavLink
                    to="/admin/about"
                    className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <IdentificationIcon className="h-5 w-5 mr-3" />
                    Gérer la page 'À Propos'
                </NavLink>
                 <NavLink
                    to="/admin/blog"
                    className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <NewspaperIcon className="h-5 w-5 mr-3" />
                    Gérer le Blog
                </NavLink>
                <span className="block pt-2 text-xs text-gray-500 uppercase">Configuration</span>
                 <NavLink
                    to="/admin/seo"
                    className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <Cog6ToothIcon className="h-5 w-5 mr-3" />
                    Référencement
                </NavLink>
                <NavLink
                    to="/admin/footer"
                    className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
                >
                    <PencilSquareIcon className="h-5 w-5 mr-3" />
                    Gérer le Pied de Page
                </NavLink>
            </nav>
            <div className="p-4 border-t border-gray-700 space-y-2">
                <Link to="/" className={linkClass}>
                    <ArrowUturnLeftIcon className="h-5 w-5 mr-3" />
                    Retour au site
                </Link>
                 <button onClick={handleLogout} className={`${linkClass} w-full`}>
                    <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-3" />
                    Déconnexion
                </button>
            </div>
        </div>
    );
};

export default Sidebar;