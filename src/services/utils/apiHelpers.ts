
/**
 * API Helper utilities for consistent error handling and response formatting
 */

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: number;
  success: boolean;
};

/**
 * Format an API response consistently
 */
export function formatApiResponse<T>(data?: T, error?: string, status = 200): ApiResponse<T> {
  return {
    data,
    error,
    status,
    success: !error && status >= 200 && status < 300,
  };
}

/**
 * Standard error handler for fetch requests
 */
export async function handleApiError(response: Response): Promise<string> {
  try {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const errorData = await response.json();
      return errorData.message || errorData.error || 'An unknown error occurred';
    } else {
      const text = await response.text();
      return text || `HTTP Error ${response.status}`;
    }
  } catch (err) {
    return `HTTP Error ${response.status}`;
  }
}

/**
 * Universal fetch wrapper with error handling
 */
export async function fetchWithErrorHandling<T>(
  url: string, 
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      return formatApiResponse<T>(undefined, error, response.status);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return formatApiResponse<T>(undefined, undefined, 204);
    }

    const data = await response.json();
    return formatApiResponse<T>(data);
  } catch (error) {
    return formatApiResponse<T>(
      undefined, 
      error instanceof Error ? error.message : 'An unknown error occurred',
      500
    );
  }
}
