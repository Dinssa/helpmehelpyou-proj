// Used to make HTTP requests
import sendRequest from './send-request';
const BASE_URL = '/api/projects';

// Create a project
export async function createProject(projectData) {
    return sendRequest(BASE_URL, 'POST', projectData);
}

// Get all projects that belong to the user
export async function userIndex() {
    return sendRequest(`${BASE_URL}/user`);
}

// Get all projects that match search query
export async function searchProjects(searchQuery) {
    const params = {
        searchQuery
    }
    return sendRequest(`${BASE_URL}/search`, 'GET', null, params);
}

// Get all default projects
export async function defaultIndex() {
    return sendRequest(`${BASE_URL}/default`);
}

// Get a single project
export async function getProject(id) {
    return sendRequest(`${BASE_URL}/${id}`);
}

// Update a project
export async function updateProject(id, projectData) {
    const payload = {
        projectData
    }
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', payload);
}

// Delete a project
export async function deleteProject(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

// Archive a project
export async function archiveProject(id) {
    return sendRequest(`${BASE_URL}/archive/${id}`, 'PUT');
}

// Unarchive a project
export async function unarchiveProject(id) {
    return sendRequest(`${BASE_URL}/unarchive/${id}`, 'PUT');
}

// Get all archived projects
export async function getArchivedProjects() {
    return sendRequest(`${BASE_URL}/user/archived`);
}

// Add a form to a project
export async function addFormToProject(projectId, templateId, name) {
    return sendRequest(`${BASE_URL}/addform/${projectId}/${templateId}`, 'POST', null, {name});
}