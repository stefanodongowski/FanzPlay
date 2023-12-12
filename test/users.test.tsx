import * as firebase from '@firebase/testing';
import { userAuth, getFirestore, cleanupFirestore } from './testUtils';

// Tests read, create, update, and delete functions for our Users Firestore collection
describe('Users Firestore collection',  () => {
    it("Allows all users to read documents", async () => {
        const db = getFirestore();
        const testDoc = db.collection('users').doc('testDoc1');
        await firebase.assertSucceeds(testDoc.get());
    })

    it('Allows authenticated users to write to the collection', async () => {
        const db = getFirestore(userAuth);
        const testDoc = db.collection('users').doc('testDoc2');
        await firebase.assertSucceeds(testDoc.set({ username: 'user_1' }));
    });

    it('Does not allow unauthenticated users to write to the collection', async () => {
        const db = getFirestore();
        const testDoc = db.collection('users').doc('testDoc3');
        await firebase.assertFails(testDoc.set({ username: 'test' }));
    });

})

afterAll(cleanupFirestore);