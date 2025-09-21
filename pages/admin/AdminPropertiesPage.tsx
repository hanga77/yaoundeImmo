
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../DataContext';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

// Confirmation Modal Component
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full m-4">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {children}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onConfirm}
          >
            Supprimer
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};


const AdminPropertiesPage: React.FC = () => {
  const { properties, deleteProperty } = useData();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  const openDeleteModal = (id: string) => {
    setPropertyToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPropertyToDelete(null);
  };
  
  const handleConfirmDelete = () => {
    if (propertyToDelete) {
        deleteProperty(propertyToDelete);
    }
    closeDeleteModal();
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">Gestion des Biens</h1>
            <p className="text-gray-600 mt-1">Ajoutez, modifiez ou supprimez des biens.</p>
        </div>
        <Link to="/admin/properties/new" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un bien
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.map(property => (
                  <tr key={property.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={property.imageUrl} alt={property.title} className="w-16 h-12 object-cover rounded-md" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{property.title}</div>
                      <div className="text-sm text-gray-500">{property.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {property.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">
                       {new Intl.NumberFormat('fr-CM').format(property.price)} XAF
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link to={`/admin/properties/edit/${property.id}`} className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 inline-block">
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button onClick={() => openDeleteModal(property.id)} className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 inline-block">
                         <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Supprimer le bien"
      >
        Êtes-vous sûr de vouloir supprimer ce bien ? Cette action est irréversible.
      </ConfirmationModal>
    </div>
  );
};

export default AdminPropertiesPage;
