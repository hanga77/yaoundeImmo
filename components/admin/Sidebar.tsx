
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HomeIcon, BuildingOffice2Icon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

const Sidebar: React.FC = () => {
    const linkClass = "flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 rounded-md";
    const activeLinkClass = "bg-brand-gold text-white";

    return (
        <div className="w-64 bg-brand-dark text-white flex flex-col min-h-screen">
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
            </nav>
            <div className="p-4 border-t border-gray-700">
                <Link to="/" className={linkClass}>
                    <ArrowUturnLeftIcon className="h-5 w-5 mr-3" />
                    Retour au site
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
