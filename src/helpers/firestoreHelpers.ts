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

interface Review {
    id: string;
    gameName: string;
    rating: number;
    comment: string;
    userId: string;
    createdAt: any;
}

export const getRecentReviews = async (): Promise<Review[]> => {
    try {
        const reviewsRef = collection(db, 'reviews');
        const q = query(reviewsRef, orderBy('createdAt', 'desc'), limit(5));

        const querySnapshot = await getDocs(q);
        const reviews: Review[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            reviews.push({
                id: doc.id,
                gameName: data.gameName,
                rating: data.rating,
                comment: data.comment,
                userId: data.userId,  // Assuming you store the userId with the review
                createdAt: data.createdAt
            });
        });

        return reviews;
    } catch (error) {
        console.error('Error fetching recent reviews:', error);
        return [];
    }
};

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