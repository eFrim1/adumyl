import axios from 'axios';
import { getCsrfTokenFromCookies } from '../utils/csrf';

const API_BASE_URL = '/auth/';
const API_LOGIN_URL = 'login/';
const API_SIGNUP_URL =  'signup/';

/**
 * Handles login or sign-up API call.
 * @param {Object} payload - The payload for the API request.
 * @param {boolean} isLogin - True for login, false for sign-up.
 * @returns {Promise<Object>} - The response data.
 * @throws {Error} - If the request fails.
 */
export const authenticateUser = async (payload, isLogin) => {
  const csrfToken = getCsrfTokenFromCookies();

  if (!csrfToken) {
    throw new Error('CSRF token is missing. Please refresh the page.');
  }
  try {
    const url = API_BASE_URL.concat(isLogin? API_LOGIN_URL : API_SIGNUP_URL);
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken, // Include CSRF token in headers
      },
      withCredentials: true, // Include cookies in the request
    });

    if (response.status < 300 && response.status >= 200) {
      return response.data;
    } else {
      throw new Error('Unexpected response from the server.');
    }
  } catch (error) {
    // Handle known errors
    if (error.response) {
      const errorMessage = error.response.data.error || 'An error occurred.';
      throw new Error(`Error ${error.response.status}: ${errorMessage}`);
    } else if (error.request) {
      throw new Error('No response from the server. Please try again later.');
    } else {
      throw new Error('Request error. Please check your input and try again.');
    }
  }
};