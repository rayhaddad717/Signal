import { initializeApp, getApp, getApps  } from 'firebase/app';
import { deleteDoc ,getFirestore, collection, addDoc,getDocs, query, where,onSnapshot,doc,serverTimestamp ,collectionGroup,setDoc,updateDoc,arrayUnion,orderBy } from 'firebase/firestore';
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile  } from 'firebase/auth';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyApc72C1sRSgrPYJqtF_Gq3pEgJHc7KZkE",
    authDomain: "signal-5ade2.firebaseapp.com",
    projectId: "signal-5ade2",
    storageBucket: "signal-5ade2.appspot.com",
    messagingSenderId: "539516588045",
    appId: "1:539516588045:web:7e968bc1fafc0ae948c544"
};
let app;
if (getApps().length == 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}
const db = getFirestore(app);

const auth = getAuth(app);
export { db,deleteDoc , auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile, collection, addDoc,getDocs,arrayUnion,updateDoc, query, where,onSnapshot,doc,serverTimestamp ,setDoc,collectionGroup,orderBy  };