

import React from 'react';
import { TABLE_NAMES } from '../constants';
import { DatabaseIcon } from './icons/DatabaseIcon';
import { LogoIcon } from './icons/LogoIcon';
import { DashboardIcon } from './icons/DashboardIcon';

interface SidebarProps {
  selectedView: string;
  onSelectView: (view: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedView, onSelectView, isOpen }) => {
  return (
    <aside 
      className={`w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col fixed inset-y-0 left-0 z-30 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}
    >
      <div className="h-16 flex items-center justify-center border-b dark:border-gray-700 px-4 flex-shrink-0">
        <LogoIcon className="w-8 h-8 text-primary-600" />
        <h1 className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
          Helios Admin
        </h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          <li className="px-4 py-1">
              <button
                onClick={() => onSelectView('__dashboard__')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  selectedView === '__dashboard__'
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <DashboardIcon className="w-5 h-5 mr-3" />
                <span className="capitalize">Dashboard</span>
              </button>
            </li>
          {TABLE_NAMES.map((table) => (
            <li key={table} className="px-4 py-1">
              <button
                onClick={() => onSelectView(table)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  selectedView === table
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <DatabaseIcon className="w-5 h-5 mr-3" />
                <span className="capitalize">{table.replace(/_/g, ' ')}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;