// Used to make HTTP requests
import sendRequest from './send-request';
const BASE_URL = '/api/forms';

// Get all projects that belong to the user
export async function userIndex() {
    return sendRequest(`${BASE_URL}/user`);
}

// Get all default projects
export async function defaultIndex() {
    return sendRequest(`${BASE_URL}/default`);
}

// Get a single project
export async function getForm(id) {
    return sendRequest(`${BASE_URL}/${id}`);
}
