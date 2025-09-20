

import React, { useState, useEffect, useCallback } from 'react';
import { TABLE_NAMES, CREATABLE_TABLES } from '../constants';
import { fetchTableData, updateTableRow, createTableRow, deleteTableRow, fetchTableSchema, resetUserPassword } from '../services/apiService';
import Header from './Header';
import Sidebar from './Sidebar';
import DataTable from './DataTable';
import EntryFormModal from './EntryFormModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import Spinner from './Spinner';
import DashboardHomePage from './DashboardHomePage';
import { PlusIcon } from './icons/PlusIcon';
import type { User } from '../types';
import type { Theme } from '../App';
import ResetSinglePasswordModal from './ResetSinglePasswordModal';

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout, theme, onToggleTheme }) => {
  const [selectedView, setSelectedView] = useState<string>('__dashboard__');
  const [tableData, setTableData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [relationalData, setRelationalData] = useState<Record<string, any>>({});

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deletingRow, setDeletingRow] = useState<any | null>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isSingleResetModalOpen, setSingleResetModalOpen] = useState(false);
  const [resettingUser, setResettingUser] = useState<User | null>(null);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);


  const loadData = useCallback(async (tableName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const mainData = await fetchTableData(tableName);
      setTableData(mainData);

      const relationalFetches: { key: string; promise: Promise<any> }[] = [];
      const relationalTables = new Set<string>();

      if (tableName === 'users') {
        relationalTables.add('zones');
        relationalTables.add('grade');
      }
      if (tableName === 'users_roles') {
        relationalTables.add('users');
        relationalTables.add('roles');
      }
      if (tableName === 'station') {
        relationalTables.add('zones');
      }
      if (tableName === 'materiels') {
        relationalTables.add('station');
      }
      if (tableName === 'commentaire') {
        relationalTables.add('fichectrl');
      }

      relationalTables.forEach(table => {
        relationalFetches.push({ key: table, promise: fetchTableData(table) });
      });

      const results = await Promise.allSettled(relationalFetches.map(f => f.promise));

      const newRelationalData = results.reduce((acc, result, index) => {
        const key = relationalFetches[index].key;
        if (result.status === 'fulfilled') {
          acc[key] = result.value;
        } else {
          const reason = result.reason instanceof Error ? result.reason.message : 'Failed to load';
          console.warn(`Could not load relational data for '${key}':`, reason);
          acc[key] = { error: `Could not load ${key.replace(/_/g, ' ')} list.` };
        }
        return acc;
      }, {} as Record<string, any>);

      setRelationalData(newRelationalData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setTableData([]);
      setRelationalData({});
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    if (selectedView !== '__dashboard__') {
      loadData(selectedView);
    }
  }, [selectedView, loadData]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentRow(null);
    setSaveError(null);
  }, []);

  const handleAddNew = useCallback(async () => {
    if (selectedView === '__dashboard__') return;
    try {
        let newRowTemplate: any = {};
        let keys: string[] = [];

        if (tableData.length > 0) {
            keys = Object.keys(tableData[0]);
        } else {
            keys = await fetchTableSchema(selectedView);
        }

        newRowTemplate = keys.reduce((acc, key) => {
            if (key !== 'id') {
                acc[key] = '';
            }
            return acc;
        }, {} as any);
        
        if (selectedView === 'users') {
            newRowTemplate.password = '';
        }

        setCurrentRow(newRowTemplate);
        setIsModalOpen(true);
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not prepare new entry form.');
    }
  }, [tableData, selectedView]);


  const handleEditRow = useCallback((row: any) => {
    setCurrentRow(row);
    setIsModalOpen(true);
  }, []);

  const handleDeleteRow = useCallback((row: any) => {
    setDeletingRow(row);
    setDeleteModalOpen(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteModalOpen(false);
    setDeletingRow(null);
  }, []);
  
  const handleResetPassword = useCallback((user: User) => {
    setResettingUser(user);
    setSingleResetModalOpen(true);
  }, []);

  const handleCloseSingleResetModal = useCallback(() => {
      setResettingUser(null);
      setSingleResetModalOpen(false);
  }, []);

  const handleConfirmSingleReset = useCallback(async () => {
    if (!resettingUser) return;
    
    setIsSaving(true);
    try {
        await resetUserPassword(resettingUser.id);
        setFeedback({ type: 'success', message: `Password for ${resettingUser.email} has been reset successfully.` });
        handleCloseSingleResetModal();
    } catch (err) {
        setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Failed to reset password.' });
    } finally {
        setIsSaving(false);
    }
  }, [resettingUser, handleCloseSingleResetModal]);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingRow || selectedView === '__dashboard__') return;
    
    setIsSaving(true);
    setSaveError(null);
    try {
      await deleteTableRow(selectedView, deletingRow.id);
      handleCloseDeleteModal();
      await loadData(selectedView);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'An unknown error occurred while deleting.');
    } finally {
      setIsSaving(false);
    }
  }, [deletingRow, selectedView, loadData, handleCloseDeleteModal]);

  const handleSaveChanges = useCallback(async (updatedData: any) => {
    if (selectedView === '__dashboard__') return;
    setIsSaving(true);
    setSaveError(null);

    try {
      if (currentRow && 'id' in currentRow && currentRow.id != null) {
        const { id, ...dataToUpdate } = updatedData;
        await updateTableRow(selectedView, id, dataToUpdate);
      } else {
        await createTableRow(selectedView, updatedData);
      }
      handleCloseModal();
      await loadData(selectedView);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'An unknown error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  }, [currentRow, selectedView, loadData, handleCloseModal]);
  
  const canCreateTable = CREATABLE_TABLES.includes(selectedView);

  return (
    <>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar
          selectedView={selectedView}
          onSelectView={(view) => {
            setSelectedView(view);
            setIsSidebarOpen(false);
          }}
          isOpen={isSidebarOpen}
        />

        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden" 
            onClick={toggleSidebar}
            aria-hidden="true"
          ></div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            user={user} 
            onLogout={onLogout} 
            theme={theme} 
            onToggleTheme={onToggleTheme} 
            onToggleSidebar={toggleSidebar}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
            <div className="container mx-auto">
               {feedback && (
                <div className={`mb-4 px-4 py-3 rounded-lg relative shadow-md border ${feedback.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-700 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-600 text-red-700 dark:text-red-200'}`} role="alert">
                    <strong className="font-bold">{feedback.type === 'success' ? 'Success' : 'Error'}: </strong>
                    <span className="block sm:inline ml-2">{feedback.message}</span>
                    <button onClick={() => setFeedback(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3" aria-label="Close">
                        <span className="text-2xl font-light" aria-hidden="true">&times;</span>
                    </button>
                </div>
              )}
              {selectedView === '__dashboard__' ? (
                <DashboardHomePage user={user} setFeedback={setFeedback} />
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 capitalize">
                          {selectedView.replace(/_/g, ' ')}
                      </h1>
                      {canCreateTable && (
                          <button
                              onClick={handleAddNew}
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                          >
                              <PlusIcon className="w-4 h-4 mr-2" />
                              Add New Entry
                          </button>
                      )}
                  </div>
                  <div className="mt-4">
                    {isLoading ? (
                      <div className="flex justify-center items-center h-64">
                        <Spinner />
                      </div>
                    ) : error ? (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error:</strong>
                        <span className="block sm:inline ml-2"> {error}</span>
                      </div>
                    ) : (
                      <DataTable 
                        key={selectedView} 
                        tableName={selectedView} 
                        data={tableData}
                        relationalData={relationalData}
                        onEditRow={handleEditRow}
                        onDeleteRow={handleDeleteRow}
                        onResetPassword={handleResetPassword}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
      <EntryFormModal
        isOpen={isModalOpen}
        tableName={selectedView}
        rowData={currentRow}
        relationalData={relationalData}
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
        isLoading={isSaving}
        error={saveError}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isLoading={isSaving}
        tableName={selectedView}
        rowData={deletingRow}
      />
      <ResetSinglePasswordModal
        isOpen={isSingleResetModalOpen}
        onClose={handleCloseSingleResetModal}
        onConfirm={handleConfirmSingleReset}
        isLoading={isSaving}
        user={resettingUser}
      />
    </>
  );
};

export default DashboardPage;