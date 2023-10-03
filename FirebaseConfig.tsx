import { initializeApp} from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDEZhqyziPZhqCVvAPzOcSMuvTkJY4ltnc",
    authDomain: "fanzplay-6229f.firebaseapp.com",
    projectId: "fanzplay-6229f",
    storageBucket: "fanzplay-6229f.appspot.com",
    messagingSenderId: "440901499935",
    appId: "1:440901499935:web:436dfb992b1ece46bc292a"
  };

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const FIRESTORE = getFirestore(FIREBASE_APP);

export {FIREBASE_AUTH, FIRESTORE} ;

