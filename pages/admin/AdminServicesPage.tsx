
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../DataContext';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Icon } from '../../components/IconMap';

const AdminServicesPage: React.FC = () => {
  const { services, deleteService } = useData();
  
  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
      deleteService(id);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">Gestion des Services</h1>
            <p className="text-gray-600 mt-1">Ajoutez, modifiez ou supprimez des services.</p>
        </div>
        <Link to="/admin/services/new" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un service
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icône</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {services.map(service => (
                  <tr key={service.id}>
                     <td className="px-6 py-4 whitespace-nowrap">
                       <div className="flex items-center justify-center h-10 w-10 rounded-full bg-brand-gold/20 text-brand-gold">
                           <Icon name={service.icon} className="h-6 w-6" />
                       </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500 truncate max-w-sm">{service.description}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link to={`/admin/services/edit/${service.id}`} className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 inline-block">
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 inline-block">
                         <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default AdminServicesPage;
