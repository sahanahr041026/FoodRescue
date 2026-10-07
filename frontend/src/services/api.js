/**
 * Centralized API Client Service
 * ==============================
 * This module manages HTTP requests between our React frontend and FastAPI backend.
 * 
 * In development:
 * - Frontend runs on http://localhost:5173
 * - Backend runs on http://localhost:8000
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Check backend server health status
 * @returns {Promise<{ status: string, service: string, version: string, timestamp: string }>}
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { ok: true, data };
  } catch (error) {
    return { 
      ok: false, 
      error: error.message || 'Unable to connect to backend server.' 
    };
  }
}

export default {
  API_BASE_URL,
  checkBackendHealth,
};
