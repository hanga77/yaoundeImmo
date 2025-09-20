
import React from 'react';
import { useParams } from 'react-router-dom';
import AgentForm from '../../components/admin/AgentForm';
import { useData } from '../../DataContext';
import { Agent } from '../../types';

const AgentFormPage: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const { agents, addAgent, updateAgent } = useData();
  
  const isEditing = Boolean(agentId);
  const agentToEdit = isEditing ? agents.find(a => a.id === agentId) : null;

  const handleSubmit = (formData: Omit<Agent, 'id'> | Agent) => {
    if (isEditing && agentId) {
      updateAgent({ ...formData, id: agentId });
    } else {
      addAgent(formData as Omit<Agent, 'id'>);
    }
  };

  return (
    <div>
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">
                {isEditing ? 'Modifier l\'agent' : 'Ajouter un nouvel agent'}
            </h1>
            <p className="text-gray-600 mt-1">
                {isEditing ? 'Mettez à jour les informations ci-dessous.' : 'Remplissez le formulaire pour ajouter un membre à l\'équipe.'}
            </p>
        </div>
        <AgentForm onSubmit={handleSubmit} initialData={agentToEdit} />
    </div>
  );
};

export default AgentFormPage;