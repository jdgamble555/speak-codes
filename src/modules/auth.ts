import { get, type Subscriber, writable } from "svelte/store";

import { auth, confirmSignIn, loginWithGoogle, logout, onIdTokenChanged, sendEmailLink, type User } from "./firebase";
import { queryRedis } from "./queryRedis";

import { browser } from "$app/env";

export interface Profile {
    id: string;
    username: string;
    website: string;
    email: string;
    displayName: string;
    photoURL: string;
    role: 'Admin' | 'Editor' | 'User'
};

const messages = {
    EMAIL_SENT: 'Check your email for the login link!',
    LOGIN_SUCCESS: 'You have been successfully logged in!',
    LOGOUT_SUCCESS: 'You have been successfully logged out!',
    LOGIN_EXPIRED: 'Your login link is expired!',
    UPDATE_SUCCESS: 'Your profile has been successfully updated!'
};

// authentication methods

export const _loginWithLink = async ({
    email,
    url
}: {
    email?: string,
    url: string
}): Promise<{ message?: string, status: string }> => {
    const status = await confirmSignIn({ url, email });
    let message: string;
    if (status === 'loggedIn') {
        message = messages.LOGIN_SUCCESS;
    } else if (status === 'expiredLink') {
        message = messages.LOGIN_EXPIRED;
    }
    return { message, status };
};

export const _sendLoginLink = async ({
    host,
    email,
    isDev
}: {
    host: string,
    email: string,
    isDev?: boolean
}): Promise<{ error?: string, message?: string }> =>
    await sendEmailLink(host, email, isDev)
        .then(() => ({ message: messages.EMAIL_SENT }))
        .catch((error: any) => ({ error }));

export const _loginWithGoogle = async (): Promise<{ error?: string, message?: string }> =>
    await loginWithGoogle()
        .then(() => ({ message: messages.LOGIN_SUCCESS }))
        .catch((error: any) => ({ error }));

export const _logout = async (): Promise<{ message: string }> => {
    await logout();
    return { message: messages.LOGOUT_SUCCESS };
};

// profile methods

export const _addProfile = async (
    { displayName, email }: {
        displayName: string;
        photoURL: string;
        uid: string;
        email: string;
    }): Promise<{ data?: any, error?: string }> => { return; }


export const _getProfile = async (email: string): Promise<{ data?: any, error?: string }> => { return; };

export const _updateProfile = async (e: SubmitEvent): Promise<{
    data?: string,
    error?: string
}> => {
    const email = get(user).email;
    const { username, displayName } = eventToData(e);
    return;
};

export const user = writable<User>(null, (set: Subscriber<User>) => {
    if (browser) {
        onIdTokenChanged(auth, async (u: User) => {
            const { props } = await queryRedis({ type: 'User', method: 'query', filter: { email: u.email }, fields: { email: 1, displayName: 1 } });
            //console.log(props.data);
            if (props?.data.length) {
                u ? set(u) : set(null)
            } else {
                //const { props } = await queryRedis({ type: 'User', method: 'add', data: u });
                //console.log(props);
            }
        })
    }
});

export const eventToData = (e: SubmitEvent) =>
    Object.fromEntries(new FormData(e.target as HTMLFormElement));