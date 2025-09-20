
import React from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/solid';

interface AdminHeaderProps {
    onToggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar }) => {
    return (
        <header className="md:hidden bg-white shadow-md h-20 flex items-center justify-between px-4 sticky top-0 z-20">
            <Link to="/admin" className="text-brand-dark text-xl font-bold font-serif">
                Admin<span className="text-brand-gold">Panel</span>
            </Link>
            <button
                onClick={onToggleSidebar}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-gold"
                aria-label="Ouvrir le menu"
            >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" />
            </button>
        </header>
    );
};

export default AdminHeader;
