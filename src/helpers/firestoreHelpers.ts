import { db } from '../firebase';
import { collection, getDocs, orderBy, limit, query, doc, getDoc } from 'firebase/firestore';

interface Game {
    id: string;
    gameName: string;
    reviewsCount: number;
    averageRating: number; 
    cover?: {
        url?: string;
    };
}

export const getMostReviewedGames = async (): Promise<Game[]> => {
    try {
        const gamesRef = collection(db, 'games');
        const q = query(gamesRef, orderBy('reviewsCount', 'desc'), limit(5)); 

        const querySnapshot = await getDocs(q);
        const games: Game[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            games.push({
                id: doc.id,
                gameName: data.gameName,
                reviewsCount: data.reviewsCount,
                averageRating: data.averageRating,
                cover: data.cover,
            });
        });

        return games;
    } catch (error) {
        console.error('Error fetching most reviewed games:', error);
        return [];
    }
};