import firebase from "firebase/compat/app";
import { getFirestore, collection, addDoc, where, query, getDocs} from "firebase/firestore"
import "firebase/compat/auth";




// const firebaseConfig = {
//   apiKey: "AIzaSyBVDOvDKBfXnuPZfGH9nSTHLM38hoJ5F6o",
//   authDomain: "fbeg-375009.firebaseapp.com",
//   databaseURL: "https://fbeg-375009-default-rtdb.firebaseio.com",
//   projectId: "fbeg-375009",
//   storageBucket: "fbeg-375009.appspot.com",
//   messagingSenderId: "971831979037",
//   appId: "1:971831979037:web:0bc3160d5c3d7cbf3beaf4"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBcZwS5OfjWzKi6GbEtdT7ToYGOUjnRh50",
  authDomain: "egplag.firebaseapp.com",
  databaseURL: "https://egplag-default-rtdb.firebaseio.com",
  projectId: "egplag",
  storageBucket: "egplag.appspot.com",
  messagingSenderId: "1079518635974",
  appId: "1:1079518635974:web:06bd30d5ff3377ba82b4c7",
  measurementId: "G-YCJHNK071Q"
};


firebase.initializeApp(firebaseConfig);
const db = getFirestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = firebase.auth();
export default firebase;

export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(provider);
    const user = res.user;
    const userRef = collection(db, "users");
    const result = await getDocs(query(userRef, where("uid", "==", user.uid)));
    if (result.empty) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    // alert(err.message);
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    alert(err.message);
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    alert(err.message);
  }
};

// const sendPasswordResetEmail = async (email) => {
//   try {
//     await auth.sendPasswordResetEmail(email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const logout = () => {
//   auth.signOut();
// };
