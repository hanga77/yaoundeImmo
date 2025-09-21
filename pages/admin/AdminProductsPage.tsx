import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../DataContext';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

const AdminProductsPage: React.FC = () => {
  const { products, deleteProduct } = useData();

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      deleteProduct(id);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">Gestion de la Boutique</h1>
            <p className="text-gray-600 mt-1">Ajoutez, modifiez ou supprimez des produits.</p>
        </div>
        <Link to="/admin/products/new" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter un produit
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map(product => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-cyan-100 text-cyan-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-semibold">
                       {new Intl.NumberFormat('fr-CM').format(product.price)} XAF
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link to={`/admin/products/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 inline-block">
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 inline-block">
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

export default AdminProductsPage;
