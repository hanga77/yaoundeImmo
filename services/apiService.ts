import type { User } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Handles API responses, parsing JSON and throwing errors for non-ok statuses.
 * This version is robust against non-JSON error responses.
 * @param response The raw Response object from fetch.
 * @returns The parsed JSON data.
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text();

  if (!response.ok) {
    let errorMessage;
    try {
      // Attempt to parse as JSON for structured error messages from our API
      const errorData = JSON.parse(text);
      errorMessage = errorData.message || errorData.error || `Request failed with status: ${response.status}`;
    } catch (e) {
      // If parsing fails, the response was not JSON. Use the raw text.
      // This handles HTML error pages from proxies, servers, etc.
      errorMessage = text || `Request failed with status: ${response.status}`;
    }
    throw new Error(errorMessage);
  }
  
  // For successful responses, we expect JSON.
  // Handle cases where a successful response might have an empty body (e.g., 204 No Content).
  return text ? JSON.parse(text) : ({} as T);
}


/**
 * Authenticates a user against the backend API.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A Promise that resolves with the User object on success.
 */
export const login = async (email: string, password: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse<User>(response);
};

/**
 * Fetches data for a specific table from the backend API.
 * @param tableName The name of the table to fetch.
 * @returns A Promise that resolves with an array of data.
 */
export const fetchTableData = async (tableName: string): Promise<any[]> => {
  const response = await fetch(`${API_BASE_URL}/tables/${tableName}`);
  return handleResponse<any[]>(response);
};

/**
 * Fetches the schema (column names) for a specific table.
 * @param tableName The name of the table.
 * @returns A promise that resolves with an array of column names.
 */
export const fetchTableSchema = async (tableName: string): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/tables/${tableName}/schema`);
  return handleResponse<string[]>(response);
};

/**
 * Fetches aggregate stats for the main dashboard.
 * @returns A Promise that resolves with an object containing table counts.
 */
export const fetchDashboardStats = async (): Promise<Record<string, number>> => {
  const response = await fetch(`${API_BASE_URL}/stats/overview`);
  return handleResponse<Record<string, number>>(response);
};

/**
 * Creates a new row in a table.
 * @param tableName The name of the table.
 * @param data An object containing the columns and values for the new row.
 * @returns A Promise that resolves with the server's response.
 */
export const createTableRow = async (tableName: string, data: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/tables/${tableName}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};


/**
 * Updates a specific row in a table.
 * @param tableName The name of the table.
 * @param id The ID of the row to update.
 * @param data An object containing the columns and new values to update.
 * @returns A Promise that resolves with the server's response.
 */
export const updateTableRow = async (tableName: string, id: number | string, data: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/tables/${tableName}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

/**
 * Deletes a specific row from a table.
 * @param tableName The name of the table.
 * @param id The ID of the row to delete.
 * @returns A Promise that resolves with the server's response.
 */
export const deleteTableRow = async (tableName: string, id: number | string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/tables/${tableName}/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

/**
 * Resets all user passwords to a system default.
 * @returns A Promise that resolves with the server's confirmation message.
 */
export const resetAllUserPasswords = async (): Promise<{ message: string; affectedRows: number; }> => {
    const response = await fetch(`${API_BASE_URL}/users/reset-all-passwords`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse<{ message: string; affectedRows: number; }>(response);
};

/**
 * Resets a single user's password to a system default.
 * @param userId The ID of the user.
 * @returns A Promise that resolves with the server's confirmation message.
 */
export const resetUserPassword = async (userId: number | string): Promise<{ message: string; }> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse<{ message: string; }>(response);
};