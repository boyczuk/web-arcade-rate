export interface FirestoreUser {
    uid: string;
    username: string;
    name: string;
    email: string;
    photoURL?: string; // Optional since not all users might have this
}