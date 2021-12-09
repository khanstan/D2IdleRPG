import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, ref, set, push, child } from "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  databaseURL: "https://d2idlerpg-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    this.app = initializeApp(config);
    this.auth = getAuth();
    this.db = getDatabase();
    this.currentCharacterId = 0;
  }

  //***Auth API***
  doCreateUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(this.auth, email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(this.auth, email, password);

  doSignOut = () => signOut(this.auth);

  doPasswordReset = email => sendPasswordResetEmail(this.auth, email);

  doPasswordUpdate = password =>
    this.user.currentUser.updatePassword(this.auth, password);


  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              providerData: authUser.providerData,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  userRef = (uid, name, email, roles) => set(ref(this.db, 'users/' + uid), {
    username: name,
    email: email,
    roles
  });

  createCharacterKey = () => push(ref(this.db, 'characters/' + this.auth.currentUser.uid));


  createCharacter = (name, character, creationKey = this.createCharacterKey()) => set(creationKey, {
    characterName: name,
    characterType: character,
    characterLevel: 0,
    characterXp: 0,
    characterCurrentHp: 100,
    characterMaxHp: 100,
    uid: this.auth.currentUser.uid,
    cid: creationKey.key,
    base64: null
  });



  updateCharacter = (cid, cname, ctype, level, xp, currentHp, maxHp) =>
    set(push(ref(this.db, 'characters/' + this.auth.currentUser.uid + '/' + cid)), {
      characterName: cname,
      characterType: ctype,
      characterLevel: 0,
      characterXp: 0,
      characterCurrentHp: 100,
      characterMaxHp: 100,
      uid: this.auth.currentUser.uid,
      base64: null
    });

  playCharacter = (cid) => {
    this.currentCharacterId = cid;
  }

  currentCharacterRef = (cid) => ref(this.db, 'characters/' + this.auth.currentUser.uid + '/' + cid);

  charactersRef = (uid) => ref(this.db, 'characters/' + uid);

  // newCharacter = (uid, name) =()

  usersRef = () => ref(this.db, 'users');
  allCharactersRef = () => ref(this.db, 'characters');

}

export default Firebase;