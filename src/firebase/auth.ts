import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile 
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebaseconfig";

const ADMIN_COLLECTION = "firestore-users-admin";

export const signInAdmin = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const adminDoc = await getDoc(doc(db, ADMIN_COLLECTION, uid));
    if (!adminDoc.exists()) {
        throw new Error("Access Denied: Not an authorized administrator.");
    }

    return {
        uid,
        name: adminDoc.data().name as string,
        email: adminDoc.data().email as string,
        role: 'admin' as const
    };
};

export const registerAdmin = async (name: string, email: string, phone: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    await updateProfile(userCredential.user, { displayName: name });

    const adminData = {
        uid,
        name,
        email,
        phone,
        role: 'admin',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    };

    await setDoc(doc(db, ADMIN_COLLECTION, uid), adminData);

    return {
        uid,
        name,
        email
    };
};
