import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
        apiKey: "AIzaSyCrLzwJfob-rZ6EL1D3hEyWpYRwXq3ofL8",
        authDomain: "crwn-db-a8804.firebaseapp.com",
        projectId: "crwn-db-a8804",
        storageBucket: "crwn-db-a8804.appspot.com",
        messagingSenderId: "648156394408",
        appId: "1:648156394408:web:27d2a8a38e2e2a50c3e39d",
        measurementId: "G-JW6JS8MRDM"
      
};

firebase.initializeApp(config);
export const createUserProfileDocument = async (userAuth, additionalData) => {
        if (!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);

        const snapShot = await userRef.get();
        
        if (!snapShot.exists) {
                const { displayName, email } = userAuth;
                const createdAt = new Date();
                try {
                        await userRef.set({
                                displayName,
                                email,
                                createdAt,
                                ...additionalData
                        });
                }catch (error) {
                        console.log('error creating user', error.message);
                }
        } 
        return userRef;
        
};
    


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;