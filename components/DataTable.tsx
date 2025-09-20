

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { generateSummary } from '../services/geminiService';
import { EDITABLE_TABLES, DELETABLE_TABLES, RELATIONSHIP_MAP } from '../constants';
import Spinner from './Spinner';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { EyeIcon } from './icons/EyeIcon';
import { SearchIcon } from './icons/SearchIcon';
import { KeyIcon } from './icons/KeyIcon';

interface DataTableProps {
  tableName: string;
  data: any[];
  relationalData: Record<string, any[]>;
  onEditRow: (row: any) => void;
  onDeleteRow: (row: any) => void;
  onResetPassword: (row: any) => void;
}

const ROWS_PER_PAGE = 15;

const DataTable: React.FC<DataTableProps> = ({ tableName, data, relationalData, onEditRow, onDeleteRow, onResetPassword }) => {
  const [summary, setSummary] = useState<string>('');
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(false);
  const [summaryError, setSummaryError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Reset state when data/table changes
  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery('');
    setSummary('');
    setSummaryError('');
  }, [tableName, data]);

  const isEditable = useMemo(() => EDITABLE_TABLES.includes(tableName), [tableName]);
  const isDeletable = useMemo(() => DELETABLE_TABLES.includes(tableName), [tableName]);
  const showActionsColumn = isEditable || isDeletable;

  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    const lowercasedQuery = searchQuery.toLowerCase();

    return data.filter(row =>
      Object.keys(row).some(col => {
        const value = row[col];
        if (value === null || value === undefined) {
          return false;
        }

        let searchableString = String(value).toLowerCase();

        // Enhance search to include display names for foreign keys
        if (RELATIONSHIP_MAP[col]) {
          const config = RELATIONSHIP_MAP[col];
          const relatedTableData = relationalData[config.table] || [];
          const relatedItem = relatedTableData.find(item => item.id === value);
          if (relatedItem && relatedItem[config.displayField]) {
            searchableString += ` ${String(relatedItem[config.displayField]).toLowerCase()}`;
          }
        }

        return searchableString.includes(lowercasedQuery);
      })
    );
  }, [searchQuery, data, relationalData]);

  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const handleGenerateSummary = async () => {
    setIsSummaryLoading(true);
    setSummary('');
    setSummaryError('');
    try {
      const result = await generateSummary(tableName, data);
      setSummary(result);
    } catch (error) {
      setSummaryError(error instanceof Error ? error.message : 'Failed to generate summary.');
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const formatCellContent = useCallback((row: any, col: string): React.ReactNode => {
    const value = row[col];

    if (value === null || value === undefined) {
      return <span className="text-gray-400 dark:text-gray-500">NULL</span>;
    }

    if (RELATIONSHIP_MAP[col]) {
      const config = RELATIONSHIP_MAP[col];
      const relatedTableData = relationalData[config.table] || [];
      const relatedItem = relatedTableData.find(item => item.id === value);
      if (relatedItem) {
        return String(relatedItem[config.displayField] || `ID: ${value}`);
      }
      return String(value);
    }
    
    const isDateColumn = (col.includes('date') || col.endsWith('_at')) && typeof value === 'string' && value.length > 0;
    if (isDateColumn) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            return date.toLocaleString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });
        }
    }

    return String(value);
  }, [tableName, relationalData]);

  if (data.length === 0) {
    return (
      <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No data available for this table.</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">The table is empty. You can add a new entry if this action is available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b dark:border-gray-700">
        <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder={`Search in ${tableName}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
        </div>
        <button
          onClick={handleGenerateSummary}
          disabled={isSummaryLoading}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          {isSummaryLoading && <Spinner size="small" />}
          <span className={isSummaryLoading ? 'ml-2' : ''}>Generate Summary with AI</span>
        </button>
      </div>
      
      {(summary || isSummaryLoading || summaryError) && (
        <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">AI Summary</h4>
          {isSummaryLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Generating summary, please wait...</p>}
          {summaryError && <p className="text-sm text-red-500">{summaryError}</p>}
          {summary && <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{summary}</p>}
        </div>
      )}
      
      <div className="p-4 border-b dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
        Displaying {paginatedData.length} of {filteredData.length} results.
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((col) => (
                <th key={col} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {col.replace(/_/g, ' ')}
                </th>
              ))}
              {showActionsColumn && (
                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((row, rowIndex) => (
              <tr key={row.id || rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {formatCellContent(row, col)}
                  </td>
                ))}
                {showActionsColumn && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-4">
                      {isEditable && (
                         <button onClick={() => onEditRow(row)} className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 transition-colors" title="Edit">
                            <PencilIcon className="w-5 h-5" />
                         </button>
                      )}
                      {tableName === 'users' && (
                        <button onClick={() => onResetPassword(row)} className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors" title="Reset Password">
                            <KeyIcon className="w-5 h-5" />
                        </button>
                      )}
                      {isDeletable && (
                        <button onClick={() => onDeleteRow(row)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors" title="Delete">
                            <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {totalPages > 1 && (
            <div className="p-4 flex justify-between items-center border-t dark:border-gray-700">
                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-600 dark:text-gray-200 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        )}
    </div>
  );
};

export default DataTable;