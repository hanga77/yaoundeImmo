
import React from 'react';
import { useParams } from 'react-router-dom';
import PropertyForm from '../../components/admin/PropertyForm';
import { useData } from '../../DataContext';
import { Property } from '../../types';

const PropertyFormPage: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { properties, addProperty, updateProperty } = useData();
  
  const isEditing = Boolean(propertyId);
  const propertyToEdit = isEditing ? properties.find(p => p.id === propertyId) : null;

  const handleSubmit = (formData: Omit<Property, 'id'> | Property) => {
    if (isEditing && propertyId) {
      updateProperty({ ...formData, id: propertyId });
    } else {
      addProperty(formData);
    }
  };

  return (
    <div>
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">
                {isEditing ? 'Modifier le bien' : 'Ajouter un nouveau bien'}
            </h1>
            <p className="text-gray-600 mt-1">
                {isEditing ? 'Mettez à jour les informations ci-dessous.' : 'Remplissez le formulaire pour ajouter un bien au catalogue.'}
            </p>
        </div>
        <PropertyForm onSubmit={handleSubmit} initialData={propertyToEdit} />
    </div>
  );
};

export default PropertyFormPage;
