import * as firebase from '@firebase/testing';

const PROJECT_ID = 'fanzplay-6229f';

describe('FanzPlay Firebase',  () => {
    it("Can read items in the users collection", async () => {
        const db = firebase.initializeTestApp({projectId: PROJECT_ID}).firestore();
        const testDoc = db.collection('users').doc('testDoc');
        await firebase.assertSucceeds(testDoc.get());
    })
})