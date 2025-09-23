import React from 'react';
import { useParams } from 'react-router-dom';
import UserForm from '../../components/admin/UserForm';
import { useData } from '../../DataContext';
import { User } from '../../types';

const UserFormPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { users, addUser, updateUser } = useData();
  
  const isEditing = Boolean(userId);
  const userToEdit = isEditing ? users.find(u => u.id === userId) : null;

  const handleSubmit = (formData: Omit<User, 'id'> | User) => {
    if (isEditing && userId) {
      updateUser({ ...formData, id: userId });
    } else {
      addUser(formData as Omit<User, 'id'>);
    }
  };

  return (
    <div>
        <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark font-serif">
                {isEditing ? 'Modifier l\'utilisateur' : 'Ajouter un nouvel utilisateur'}
            </h1>
            <p className="text-gray-600 mt-1">
                {isEditing ? 'Mettez à jour les informations du compte.' : 'Remplissez le formulaire pour créer un nouveau compte.'}
            </p>
        </div>
        <UserForm onSubmit={handleSubmit} initialData={userToEdit} isEditing={isEditing} />
    </div>
  );
};

export default UserFormPage;