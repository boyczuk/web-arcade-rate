import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';

class AuthService {
  async signUp(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async signIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async signOut() {
    await signOut(auth);
  }

  onAuthStateChanged(callback: (user: User | null) => void) {
    onAuthStateChanged(auth, callback);
  }
}

export default new AuthService();
