import React from 'react';
import { useParams } from 'react-router-dom';
import ServiceForm from '../../components/admin/ServiceForm';
import { useData } from '../../DataContext';
import { Service } from '../../types';

const ServiceFormPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { services, addService, updateService } = useData();
  
  const isEditing = Boolean(serviceId);
  const serviceToEdit = isEditing ? services.find(s => s.id === serviceId) : null;

  const handleSubmit = (formData: Omit<Service, 'id'> | Service) => {
    if (isEditing && serviceId) {
      updateService({ ...formData, id: serviceId });
    } else {
      addService(formData);
    }
  };

  return (
    <div>
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">
                {isEditing ? 'Modifier le service' : 'Ajouter un nouveau service'}
            </h1>
            <p className="text-gray-600 mt-1">
                {isEditing ? 'Mettez à jour les informations ci-dessous.' : 'Remplissez le formulaire pour ajouter un service à la boutique.'}
            </p>
        </div>
        <ServiceForm onSubmit={handleSubmit} initialData={serviceToEdit} />
    </div>
  );
};

export default ServiceFormPage;
