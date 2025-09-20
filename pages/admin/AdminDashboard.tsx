
import React from 'react';
import { useData } from '../../DataContext';
import { BuildingOffice2Icon, UserGroupIcon, NewspaperIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: number, link: string }> = ({ icon, title, value, link }) => (
    <Link to={link} className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-xl hover:-translate-y-1 transition-transform duration-300">
        <div className="bg-brand-gold p-3 rounded-full text-white">
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-brand-blue">{value}</p>
        </div>
    </Link>
)

const AdminDashboard: React.FC = () => {
  const { properties, agents, blogPosts } = useData();

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif mb-2">Tableau de Bord</h1>
      <p className="text-gray-600 mb-8">Bienvenue dans l'espace d'administration de ImmoYaoundé.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
            icon={<BuildingOffice2Icon className="h-8 w-8"/>}
            title="Biens Immobiliers"
            value={properties.length}
            link="/admin/properties"
        />
        <StatCard 
            icon={<UserGroupIcon className="h-8 w-8"/>}
            title="Agents"
            value={agents.length}
            link="#"
        />
        <StatCard 
            icon={<NewspaperIcon className="h-8 w-8"/>}
            title="Articles de Blog"
            value={blogPosts.length}
            link="#"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
