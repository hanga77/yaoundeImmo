
import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../DataContext';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

const AdminBlogPage: React.FC = () => {
  const { blogPosts, deleteBlogPost } = useData();
  
  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      deleteBlogPost(id);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">Gestion du Blog</h1>
            <p className="text-gray-600 mt-1">Ajoutez, modifiez ou supprimez des articles.</p>
        </div>
        <Link to="/admin/blog/new" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouvel article
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auteur</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogPosts.map(post => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={post.imageUrl} alt={post.title} className="w-16 h-12 object-cover rounded-md" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{post.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link to={`/admin/blog/edit/${post.id}`} className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 inline-block">
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 inline-block">
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

export default AdminBlogPage;