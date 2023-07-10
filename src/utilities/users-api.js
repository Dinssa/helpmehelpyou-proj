// This file should only contain AJAX helper methods
// for making requests to the server, and simply return the response.
// It should not contain any application logic
// Other functionality like saving a token to localStorage, can be done in the service module.

import sendRequest from './send-request';
const BASE_URL = '/api/users';

// Create a user
export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

// Login a user
export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

// Check if a token is valid
export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}