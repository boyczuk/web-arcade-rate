import { db } from '../../firebase';
import { collection, query, getDocs } from 'firebase/firestore';

interface FirestoreUser {
    uid: string;
    username: string;
    name: string;
    email: string;
    photoURL?: string;
}

const searchUsers = async (searchTerm: string): Promise<FirestoreUser[]> => {
    const usersRef = collection(db, "users");
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Get all users (you could limit this if the dataset is large)
    const snapshot = await getDocs(usersRef);

    // Process snapshot, filtering users manually for case-insensitive matching
    const users: FirestoreUser[] = [];
    snapshot.forEach((doc) => {
        const userData = doc.data() as Omit<FirestoreUser, 'uid'>;

        // Check for case-insensitive match in both username and name fields
        if (userData.username.toLowerCase().includes(lowerCaseSearchTerm) ||
            userData.name.toLowerCase().includes(lowerCaseSearchTerm)) {
            users.push({ uid: doc.id, ...userData });
        }
    });

    console.log("Search results:", users);
    return users;
};

export default searchUsers;
