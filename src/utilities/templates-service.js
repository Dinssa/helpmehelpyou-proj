import * as templateAPI from './templates-api';

export async function createTemplate(templateData) {
    return templateAPI.createTemplate(templateData);
}

export async function userIndex() {
    return templateAPI.userIndex();
}

export async function searchTemplates(query) {
    return templateAPI.searchTemplates(query);
}

export async function getTemplate(id) {
    return templateAPI.getTemplate(id);
}

export async function updateTemplate(id, templateData) {
    return templateAPI.updateTemplate(id, templateData);
}
