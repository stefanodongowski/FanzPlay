import * as firebase from '@firebase/testing';

interface Auth {
    uid: string;
    email: string;
}
const PROJECT_ID = 'fanzplay-6229f';
export const userAuth: Auth = { uid: 'user1', email: 'user1@gmail.com' };
export function getFirestore(auth?: Auth) {
    return firebase
        .initializeTestApp({ projectId: PROJECT_ID, auth: auth })
        .firestore();
}
export function getAdminFirestore(auth?: Auth) {
    return firebase
        .initializeAdminApp({ projectId: PROJECT_ID})
        .firestore();
}
