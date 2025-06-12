
import { API_ENDPOINTS } from '@/constants';

/**
 * Default options for fetch requests
 */
const defaultOptions: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Custom error for API responses
 */
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Basic API client for making HTTP requests
 */
export const apiClient = {
  /**
   * Send a GET request
   * @param endpoint API endpoint
   * @param options Request options
   * @returns Response data
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
      ...defaultOptions,
      ...options,
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new ApiError(`Error fetching data from ${endpoint}`, response.status);
    }
    
    return response.json();
  },
  
  /**
   * Send a POST request
   * @param endpoint API endpoint
   * @param data Request body
   * @param options Request options
   * @returns Response data
   */
  async post<T>(endpoint: string, data: any, options?: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
      ...defaultOptions,
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new ApiError(`Error posting data to ${endpoint}`, response.status);
    }
    
    return response.json();
  },
  
  /**
   * Send a PUT request
   * @param endpoint API endpoint
   * @param data Request body
   * @param options Request options
   * @returns Response data
   */
  async put<T>(endpoint: string, data: any, options?: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
      ...defaultOptions,
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new ApiError(`Error updating data at ${endpoint}`, response.status);
    }
    
    return response.json();
  },
  
  /**
   * Send a DELETE request
   * @param endpoint API endpoint
   * @param options Request options
   * @returns Response data
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(endpoint, {
      ...defaultOptions,
      ...options,
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new ApiError(`Error deleting data at ${endpoint}`, response.status);
    }
    
    return response.json();
  },
};

/**
 * API endpoints for specific resources
 */
export const api = {
  exercises: {
    getAll: () => apiClient.get(API_ENDPOINTS.EXERCISES),
    getById: (id: string) => apiClient.get(`${API_ENDPOINTS.EXERCISES}/${id}`),
    create: (data: any) => apiClient.post(API_ENDPOINTS.EXERCISES, data),
    update: (id: string, data: any) => apiClient.put(`${API_ENDPOINTS.EXERCISES}/${id}`, data),
    delete: (id: string) => apiClient.delete(`${API_ENDPOINTS.EXERCISES}/${id}`),
  },
  foods: {
    getAll: () => apiClient.get(API_ENDPOINTS.FOODS),
    getById: (id: string) => apiClient.get(`${API_ENDPOINTS.FOODS}/${id}`),
    create: (data: any) => apiClient.post(API_ENDPOINTS.FOODS, data),
    update: (id: string, data: any) => apiClient.put(`${API_ENDPOINTS.FOODS}/${id}`, data),
    delete: (id: string) => apiClient.delete(`${API_ENDPOINTS.FOODS}/${id}`),
  },
  user: {
    get: () => apiClient.get(API_ENDPOINTS.USER),
    update: (data: any) => apiClient.put(API_ENDPOINTS.USER, data),
  },
  metrics: {
    getAll: () => apiClient.get(API_ENDPOINTS.METRICS),
    getById: (id: string) => apiClient.get(`${API_ENDPOINTS.METRICS}/${id}`),
    create: (data: any) => apiClient.post(API_ENDPOINTS.METRICS, data),
  },
};
