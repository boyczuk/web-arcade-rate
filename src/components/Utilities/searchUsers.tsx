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
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Query to find users whose usernames start with the searchTerm
    const usernameQuery = query(usersRef, 
        where("username", ">=", lowerCaseSearchTerm),
        where("username", "<=", lowerCaseSearchTerm + '\uf8ff')
    );

    // Query to find users whose names start with the searchTerm
    const nameQuery = query(usersRef, 
        where("name", ">=", lowerCaseSearchTerm),
        where("name", "<=", lowerCaseSearchTerm + '\uf8ff')
    );

    const [usernameSnapshot, nameSnapshot] = await Promise.all([
        getDocs(usernameQuery),
        getDocs(nameQuery)
    ]);

    // Create a Set to store unique users
    const usersSet = new Map<string, FirestoreUser>();
    
    // Process username query results
    usernameSnapshot.forEach((doc) => {
        const userData = doc.data() as Omit<FirestoreUser, 'uid'>;
        usersSet.set(doc.id, { uid: doc.id, ...userData });
    });

    // Process name query results
    nameSnapshot.forEach((doc) => {
        const userData = doc.data() as Omit<FirestoreUser, 'uid'>;
        usersSet.set(doc.id, { uid: doc.id, ...userData });
    });

    // Convert Map to Array
    const users = Array.from(usersSet.values());
    console.log("Search results:", users);
    return users;
};

export default searchUsers;
