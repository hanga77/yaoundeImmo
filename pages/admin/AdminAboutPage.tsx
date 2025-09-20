
import React, { useState } from 'react';
import { useData } from '../../DataContext';
import { AboutData, Agent } from '../../types';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const AdminAboutPage: React.FC = () => {
    const { aboutData, updateAboutData, agents, deleteAgent } = useData();
    const [formData, setFormData] = useState<AboutData>(aboutData);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateAboutData(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet agent ?")) {
            deleteAgent(id);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">
                    Gestion de la Page "À Propos"
                </h1>
                <p className="text-gray-600 mt-1">
                    Modifiez le contenu textuel et gérez l'équipe de l'agence.
                </p>
            </div>

            {/* Content Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md mb-12">
                <h2 className="text-xl font-bold text-brand-blue font-serif border-b pb-2">Contenu de la Page</h2>
                <div>
                    <label htmlFor="history" className="block text-sm font-medium text-gray-700">Notre Histoire</label>
                    <textarea name="history" id="history" rows={4} value={formData.history} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
                <div>
                    <label htmlFor="mission" className="block text-sm font-medium text-gray-700">Notre Mission</label>
                    <textarea name="mission" id="mission" rows={4} value={formData.mission} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold"></textarea>
                </div>
                 <div className="flex justify-end items-center">
                    {isSaved && <span className="text-green-600 mr-4 text-sm font-medium">Modifications enregistrées !</span>}
                    <button type="submit" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-md transition-colors">
                        Enregistrer le contenu
                    </button>
                </div>
            </form>

            {/* Agents Management */}
            <div>
                 <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-brand-blue font-serif border-b pb-2">Gestion de l'Équipe</h2>
                    <Link to="/admin/agents/new" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 flex items-center">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Ajouter un agent
                    </Link>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                             <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {agents.map(agent => (
                                    <tr key={agent.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img src={agent.imageUrl} alt={agent.name} className="w-12 h-12 object-cover rounded-full" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{agent.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{agent.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <Link to={`/admin/agents/edit/${agent.id}`} className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 inline-block">
                                                <PencilIcon className="h-5 w-5" />
                                            </Link>
                                            <button onClick={() => handleDelete(agent.id)} className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 inline-block">
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
        </div>
    );
};

export default AdminAboutPage;