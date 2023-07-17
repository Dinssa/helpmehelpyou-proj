// Used to make HTTP requests
import sendRequest from './send-request';
const BASE_URL = '/api/templates';

// Create a template
export async function createTemplate(templateData) {
    return sendRequest(BASE_URL, 'POST', templateData);
}

// Get all templates that belong to the user
export async function userIndex() {
    return sendRequest(`${BASE_URL}/user`);
}

// Get all templates that match search query
export async function searchTemplates(searchQuery) {
    const params = {
        searchQuery
    }
    return sendRequest(`${BASE_URL}/search`, 'GET', null, params);
}

// Get a single template
export async function getTemplate(id) {
    return sendRequest(`${BASE_URL}/${id}`);
}

// Update a template
export async function updateTemplate(id, templateData) {
    const payload = {
        templateData
    }
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', payload);
}

// Delete a template
export async function deleteTemplate(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}