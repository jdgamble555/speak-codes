import { initializeApp } from 'firebase/app';
import {
    getAuth,
    getIdToken,
    GoogleAuthProvider,
    isSignInWithEmailLink,
    onIdTokenChanged,
    sendSignInLinkToEmail,
    signInWithEmailLink,
    signInWithPopup,
    signOut,
    type User
} from 'firebase/auth';
export type { User } from 'firebase/auth';

export { onIdTokenChanged } from 'firebase/auth';

let process: any;

const p = process?.env ? process.env : import.meta.env;

export const firebase_config = JSON.parse(p.VITE_FIREBASE);

export interface Auth {
    displayName: string;
    photoURL: string;
    uid: string;
    email: string;
}

initializeApp(firebase_config);

export const auth = getAuth();

export const loginWithGoogle = async () => await signInWithPopup(auth, new GoogleAuthProvider());

export const logout = async () => await signOut(auth);

export const getToken = async () => new Promise<User>((res: any, rej: any) =>
    onIdTokenChanged(auth, res, rej))
    .then(async (u: User) => u ? await getIdToken(u) : '');

export const sendEmailLink = async (host: string, email: string, isDev = false): Promise<void> => {
    await sendSignInLinkToEmail(
        auth,
        email,
        { url: (isDev ? 'http://' : 'https://') + host, handleCodeInApp: true, }
    ).catch((e: any) => console.error(e));
    localStorage.setItem('emailForSignIn', email);
}

export const confirmSignIn = async ({ url, email }: { url: string, email?: string }): Promise<'loggedIn' | 'noEmail' | 'expiredLink'> => {
    const savedEmail = localStorage.getItem('emailForSignIn');
    if (!email) {
        email = savedEmail;
        if (!email) {
            return 'noEmail';
        }
    }
    try {
        if (isSignInWithEmailLink(auth, url)) {
            // login user and remove the email localStorage
            if (email) {
                const r = await signInWithEmailLink(auth as any, email, url);
                localStorage.removeItem('emailForSignIn');
                await auth.updateCurrentUser(r.user);
                return 'loggedIn';
            }
        }
    } catch (e: any) {
        console.error(e);
    }
    return 'expiredLink';
}


