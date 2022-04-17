import type { SnackbarComponentDev } from '@smui/snackbar';
import { get, writable } from "svelte/store";

import type { Resource } from './resource';

// https://gradientdescent.de/porting-hooks/#useState

// main
export const loading = writable<boolean>(false);
export const darkMode = writable<boolean>(false);
export const toggleDarkMode = () => darkMode.set(!get(darkMode));
export const loader = async (fn: () => any) => {
    loading.set(true);
    await fn();
    loading.set(false);
}

// auth
export const showLogin = writable<boolean>(false);
export const showProfile = writable<boolean>(false);
export const confirmEmail = writable<boolean>(false);
export const toggleLogin = () => showLogin.set(!get(showLogin));
export const toggleProfile = () => showProfile.set(!get(showProfile));


// snackbar
const _snackStore = writable<{
    opened: SnackbarComponentDev,
    msg: string | null
}>({
    opened: null,
    msg: null
});

export const snackStore = {
    subscribe: _snackStore.subscribe,
    set: _snackStore.set,
    update: _snackStore.update,
    showMsg: (msg: string) => {
        _snackStore.update(self => {
            self.msg = msg;
            self.opened.open();
            return self;
        });
    }
};

// resources
export const resourcesStore = writable<Resource[]>(null);

interface rStore {
    type: 'add' | 'edit' | 'delete' | null,
    resource?: Resource | null,
    opened?: boolean
};

const _resourceStore = writable<rStore>({
    type: null,
    resource: null,
    opened: false
});

export const resourceStore = {

    subscribe: _resourceStore.subscribe,
    set: _resourceStore.set,
    update: _resourceStore.update,
    reset: () =>
        _resourceStore.update((self: rStore) => {
            self.type = null;
            self.opened = false;
            self.resource = null;
            return self;
        }),
    add: () =>
        _resourceStore.update((self: rStore) => {
            self.type = 'add';
            self.opened = true;
            return self;
        }),
    edit: (resource: Resource) =>
        _resourceStore.update((self: rStore) => {
            self.type = 'edit';
            self.resource = resource;
            self.opened = true;
            return self;
        }),
    delete: (resource: Resource) =>
        _resourceStore.update((self: rStore) => {
            self.type = 'delete';
            self.resource = resource;
            self.opened = true;
            return self;
        })
};


