import React from 'react';
import Spinner from './Spinner';

interface ResetPasswordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const ResetPasswordsModal: React.FC<ResetPasswordsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md transform transition-all">
        <div className="p-6">
          <div className="text-center">
            <h3 id="reset-modal-title" className="text-lg font-medium text-gray-900 dark:text-white">
              Reset All User Passwords
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to proceed? This will reset the password for{' '}
                <strong className="font-semibold text-gray-700 dark:text-gray-300">ALL</strong> users.
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                The new password for everyone will be set to: <br/>
                <code className="mt-1 inline-block px-2 py-1 text-sm bg-gray-100 dark:bg-gray-900 text-primary-600 dark:text-primary-400 rounded-md">password123</code>
              </p>
              <p className="mt-4 text-sm font-semibold text-red-600 dark:text-red-400">
                This action is irreversible.
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700/50 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            {isLoading && <Spinner size="small" />}
            <span className={isLoading ? 'ml-2' : ''}>Confirm Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordsModal;