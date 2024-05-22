import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface FirestoreUser {
    uid: string;
    username: string;
    name: string;
    email: string;
    photoURL?: string;
}

const searchUsers = async (searchTerm: string): Promise<FirestoreUser[]> => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", searchTerm));
    const querySnapshot = await getDocs(q);
    const users: FirestoreUser[] = [];
    querySnapshot.forEach((doc) => {
        const userData = doc.data() as Omit<FirestoreUser, 'uid'>; 
        users.push({
            uid: doc.id,
            ...userData
        });
    });
    console.log("Search results:", users);
    return users;
};

export default searchUsers;
