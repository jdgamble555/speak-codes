import { loading, resourcesStore, resourceStore, snackStore } from "./stores";

export interface Resource {
    id?: string
    title: string;
    description: string;
    url: string;
};

const messages = {
    ADD_SUCCESS: 'The resource was successfully added!',
    UPDATE_SUCCESS: 'The resource was successfully updated!'
};

export async function addResource(e: any): Promise<void> {
    return;
}

export async function getResources(): Promise<Resource[]> {
    return;
}

export async function getResource(id: string) {
    return;
}

export async function updateResource(e: any): Promise<void> {
    return;

}

export async function deleteResource(e: any): Promise<void> {
    return;

}