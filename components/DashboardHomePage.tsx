import React, { useState, useEffect } from 'react';
import { fetchDashboardStats, resetAllUserPasswords } from '../services/apiService';
import StatCard from './StatCard';
import Spinner from './Spinner';
import type { User } from '../types';
import { UsersGroupIcon } from './icons/UsersGroupIcon';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import { WifiIcon } from './icons/WifiIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { KeyIcon } from './icons/KeyIcon';
import ResetPasswordsModal from './ResetPasswordsModal';
import { WrenchScrewdriverIcon } from './icons/WrenchScrewdriverIcon';
import { ClipboardDocumentCheckIcon } from './icons/ClipboardDocumentCheckIcon';

interface DashboardHomePageProps {
  user: User;
  setFeedback: (feedback: { type: 'success' | 'error', message: string } | null) => void;
}

const DashboardHomePage: React.FC<DashboardHomePageProps> = ({ user, setFeedback }) => {
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isResetModalOpen, setResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);


  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedStats = await fetchDashboardStats();
        setStats(fetchedStats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  const handleResetPasswords = async () => {
    setIsResetting(true);
    setFeedback(null);
    try {
        const result = await resetAllUserPasswords();
        setFeedback({ type: 'success', message: `${result.message} Affected users: ${result.affectedRows}.` });
    } catch (err) {
        setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'An unknown error occurred.' });
    } finally {
        setIsResetting(false);
        setResetModalOpen(false);
    }
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline ml-2">{error}</span>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
          Welcome back, {user.username || user.email}! Here's a summary of your database.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <StatCard 
            title="Total Users" 
            value={stats?.users ?? 0} 
            icon={<UsersGroupIcon className="w-8 h-8 text-white" />}
            color="blue"
          />
          <StatCard 
            title="Total Zones" 
            value={stats?.zones ?? 0} 
            icon={<GlobeAltIcon className="w-8 h-8 text-white" />}
            color="green"
          />
          <StatCard 
            title="Total Stations" 
            value={stats?.station ?? 0} 
            icon={<WifiIcon className="w-8 h-8 text-white" />}
            color="yellow"
          />
          <StatCard 
            title="Control Reports" 
            value={stats?.fichectrl ?? 0} 
            icon={<DocumentTextIcon className="w-8 h-8 text-white" />}
            color="purple"
          />
           <StatCard 
            title="Total Equipment" 
            value={stats?.materiels ?? 0} 
            icon={<WrenchScrewdriverIcon className="w-8 h-8 text-white" />}
            color="orange"
          />
          <StatCard 
            title="Interventions" 
            value={stats?.ficheintervention ?? 0} 
            icon={<ClipboardDocumentCheckIcon className="w-8 h-8 text-white" />}
            color="teal"
          />
        </div>

        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-red-500/30">
            <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">Danger Zone</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                These actions are powerful and irreversible. Please be certain before proceeding.
            </p>
            <div className="mt-4">
                <button
                    onClick={() => setResetModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                    <KeyIcon className="w-4 h-4 mr-2" />
                    Reset All User Passwords
                </button>
            </div>
        </div>

      </div>
      <ResetPasswordsModal
        isOpen={isResetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={handleResetPasswords}
        isLoading={isResetting}
      />
    </>
  );
};

export default DashboardHomePage;