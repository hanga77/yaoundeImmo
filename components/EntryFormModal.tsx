

import React, { useState, useEffect, useCallback } from 'react';
import Spinner from './Spinner';
import { RELATIONSHIP_MAP, USER_POSTES } from '../constants';

interface EntryFormModalProps {
  isOpen: boolean;
  tableName: string;
  rowData: any | null;
  relationalData: Record<string, any[]>;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const EntryFormModal: React.FC<EntryFormModalProps> = ({
  isOpen,
  tableName,
  rowData,
  relationalData,
  onClose,
  onSave,
  isLoading,
  error,
}) => {
  const [formData, setFormData] = useState<any>({});

  const isEditMode = rowData && rowData.id != null;
  const isCreatingUser = !isEditMode && tableName === 'users';

  useEffect(() => {
    // When opening the form for editing, we don't want to pre-fill the password field
    const initialData = { ...rowData };
    if (isEditMode && tableName === 'users') {
        delete initialData.password;
    }
    setFormData(initialData || {});
  }, [rowData, isEditMode, tableName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
          onClose();
      }
  }

  const formatDateTimeForInput = (dateString: string | null) => {
    if (!dateString) return '';
    // MariaDB datetime format: 'YYYY-MM-DD HH:MM:SS.ffffff' or ISO string
    // HTML datetime-local input format: 'YYYY-MM-DDTHH:MM'
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Handle cases where parsing fails, e.g., already in 'YYYY-MM-DDTHH:MM'
      if (dateString.includes('T')) return dateString.slice(0, 16);
      return '';
    }
    // To prevent timezone issues, format manually to local time components
    const pad = (num: number) => num.toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const renderFormField = (key: string, value: any) => {
    // Check if it's a foreign key
    if (RELATIONSHIP_MAP[key]) {
      const config = RELATIONSHIP_MAP[key];
      const relatedInfo = relationalData[config.table];
      
      // Handle case where relational data failed to load
      if (relatedInfo && (relatedInfo as any).error) {
        return <div className="mt-1 text-sm text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded-md">Error: {(relatedInfo as any).error}</div>;
      }

      const options = Array.isArray(relatedInfo) ? relatedInfo : [];
      
      return (
        <select
          id={key}
          name={key}
          value={value ?? ''}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        >
          <option value="">-- Select --</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option[config.displayField] || `ID: ${option.id}`}
            </option>
          ))}
        </select>
      );
    }
    
    // Strict dropdown for 'poste' in 'users' table using the hardcoded list
    if (tableName === 'users' && key === 'poste') {
        return (
            <select
              id={key}
              name={key}
              value={value ?? ''}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="">-- Select a post --</option>
              {USER_POSTES.map((poste: string) => (
                <option key={poste} value={poste}>
                  {poste}
                </option>
              ))}
            </select>
        );
    }

    // Check if it's a date/datetime field
    if ((key.includes('date') || key.endsWith('_at')) && key !== 'update') {
        return (
            <input
                type="datetime-local"
                id={key}
                name={key}
                value={formatDateTimeForInput(value)}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
        );
    }

    // Default to text input
    return (
      <input
        type="text"
        id={key}
        name={key}
        value={String(value ?? '')}
        onChange={handleInputChange}
        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      />
    );
  };

  // Filter out fields that should not be manually edited or are handled separately.
  const filteredFormFields = Object.entries(formData).filter(([key]) => 
    key !== 'id' && 
    key !== 'password' && 
    !(isCreatingUser && key === 'registration_date')
  );
  
  const title = isEditMode
    ? `Edit Row in "${tableName.replace(/_/g, ' ')}"`
    : `Create New Entry in "${tableName.replace(/_/g, ' ')}"`;

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-modal-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl transform transition-all">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 id="form-modal-title" className="text-xl font-semibold text-gray-900 dark:text-white capitalize">
              {title}
            </h3>
          </div>
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {isEditMode && (
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID</label>
                  <input
                    type="text"
                    readOnly
                    value={formData.id ?? ''}
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-500 dark:text-gray-400 sm:text-sm"
                  />
                </div>
              )}

              {filteredFormFields.map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {key.replace(/_/g, ' ')}
                  </label>
                  {renderFormField(key, value)}
                </div>
              ))}
              
              {isCreatingUser && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                   <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password ?? ''}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              )}

              {isEditMode && tableName === 'users' && (
                 <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password (optional)
                  </label>
                   <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Leave blank to keep current password"
                    value={formData.password ?? ''}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
              )}

            </div>
             {error && (
                <div className="mt-4 text-sm text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-3 rounded-md">
                    <strong>Error:</strong> {error}
                </div>
            )}
          </div>
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 disabled:cursor-not-allowed"
            >
              {isLoading && <Spinner size="small" />}
              <span className={isLoading ? 'ml-2' : ''}>{isEditMode ? 'Save Changes' : 'Create Entry'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryFormModal;
