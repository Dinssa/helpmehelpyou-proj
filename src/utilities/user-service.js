// In this service file, 

import * as usersAPI from './users-api';

export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    const token = await usersAPI.signUp(userData);

    // Persist the "token"
    localStorage.setItem('token', token);

    return token;
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  // Check if expired, remove if it is
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  // to milliseconds here
  if (payload.exp < Date.now() / 1000) {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    return null;
  }

  return token;
}

export function getUserFromToken() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}