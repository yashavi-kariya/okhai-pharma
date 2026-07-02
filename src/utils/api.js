// API utility to handle backend requests
// Uses environment variable for backend URL, falls back to current domain for local dev

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    (typeof window !== 'undefined' ? `${window.location.origin}` : '');

export const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    // Merge default options with provided options
    const finalOptions = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    const response = await fetch(url, finalOptions);

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    // Handle empty responses
    const text = await response.text();
    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        console.error('Failed to parse JSON response:', text);
        throw new Error('Invalid JSON response from server');
    }
};

export default API_BASE_URL;
