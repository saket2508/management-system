import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Firebase app config
const firebaseConfig = {
    apiKey: "AIzaSyAGdC7GoipEX1hvavfc9rGh7v0pZZ68oHc",
    authDomain: "management-system-3f3cd.firebaseapp.com",
    projectId: "management-system-3f3cd",
    storageBucket: "management-system-3f3cd.appspot.com",
    messagingSenderId: "691896148959",
    appId: "1:691896148959:web:254604aaca23bdfafb5a6a"
  }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
}

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};