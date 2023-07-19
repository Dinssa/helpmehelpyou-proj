import * as formsAPI from './forms-api';

export async function userIndex() {
    return formsAPI.userIndex();
}

export async function getForm(id) {
    return formsAPI.getForm(id);
}

export async function getFormByUUID(uuid) {
    return formsAPI.getFormByUUID(uuid);
}

export async function defaultIndex() {
    return formsAPI.defaultIndex();
}
