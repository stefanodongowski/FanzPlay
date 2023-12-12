import * as firebase from '@firebase/testing';
import { userAuth, getFirestore, getAdminFirestore, cleanupFirestore} from './testUtils';
import { DocumentReference, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { Game } from '../types/Game';

beforeEach(cleanupFirestore);

// Tests read, create, update, and delete functions for our Games Firestore collection
describe('Games Firestore collection',  () => {
    it("Allows all users to read documents", async () => {
        const db = getFirestore();
        const testDoc = db.collection('games').doc('testDoc1');
        await firebase.assertSucceeds(testDoc.get());
    })

    it('Allows authenticated users to write to the collection', async () => {
        const db = getFirestore(userAuth);
        const testDoc = db.collection('games').doc('testDoc2');
        await firebase.assertSucceeds(testDoc.set({ username: 'user_1' }));
    });

    it('Prevents unauthenticated users to write to the collection', async () => {
        const db = getFirestore();
        const testDoc = db.collection('games').doc('testDoc2');
        await firebase.assertFails(testDoc.set({ username: 'test' }));
    });

    it('Allows authenticated users to update documents', async () => {
        const adminDb = getAdminFirestore();
        const gameId = "test_game_id";
        const setupDoc = adminDb.collection("games").doc(gameId);
        await setupDoc.set({gameId: gameId, gameState: 'undefined'})

        const db = getFirestore(userAuth);
        const testDoc = db.collection('games').doc(gameId);
        await firebase.assertSucceeds(
            testDoc.update({ gameState: 'lobby' })
        );
    });

    it('Prevents unauthenticated users from updating documents', async () => {
        const adminDb = getAdminFirestore();
        const gameId = 'test_game_id';
        const setupDoc = adminDb.collection('games').doc(gameId);
        await setupDoc.set({ gameId: gameId, gameState: 'undefined' });

        const db = getFirestore();
        const testDoc = db.collection('games').doc(gameId); 
        await firebase.assertFails(
            testDoc.update({ updatedField: 'lobby' })
        );
    });

    it('Allows authenticated users to delete documents', async () => {
        const adminDb = getAdminFirestore();
        const gameId = 'test_game_id';
        const setupDoc = adminDb.collection('games').doc(gameId);
        await setupDoc.set({ gameId: gameId, gameState: 'undefined' });

        const db = getFirestore(userAuth);
        const testDoc = db.collection('games').doc(gameId); 
        await firebase.assertSucceeds(testDoc.delete());
    });

    it('Prevents unauthenticated users from deleting documents', async () => {
        const adminDb = getAdminFirestore();
        const gameId = 'test_game_id';
        const setupDoc = adminDb.collection('games').doc(gameId);
        await setupDoc.set({ gameId: gameId, gameState: 'undefined' });

        const db = getFirestore();
        const testDoc = db.collection('games').doc(gameId); 
        await firebase.assertFails(testDoc.delete());
    });
})

afterAll(cleanupFirestore);
