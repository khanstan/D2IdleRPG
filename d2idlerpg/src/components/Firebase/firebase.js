import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    this.app = initializeApp(config);
    this.auth = getAuth();
    this.user = this.auth.currentUser;
    this.db = getDatabase();
  }
  //***Auth API***
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignOut = () => signOut(this.auth);

  doPasswordReset = email => sendPasswordResetEmail(this.auth, email);

  doPasswordUpdate = password =>
    this.user.updatePassword(this.auth, password);

  // *** User API ***
  userRef = (uid, name, email) => set(ref(this.db, 'users/' + uid), {
    username: name,
    email: email
  });

  // newCharacter = (uid, name) =()

  usersRef = () => ref(this.db, 'users');

}

export default Firebase;