import { db } from '../firebase';
import { collection, getDocs, orderBy, limit, query, doc, getDoc } from 'firebase/firestore';
import defaultPic from '../assets/notFound.png'

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
    notes: string;
    userId: string;
    userName?: string;
    profilePic?: string;
    createdAt: any;
}

export const getUserProfile = async (userId: string): Promise<{ name: string, profilePic: string }> => {
    try { 
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            return {
                name: userData.name || 'Unknown User',
                profilePic: userData.profilePic || defaultPic
            };
        } else {
            return {
                name: 'Unknown User',
                profilePic: 'default-profile-pic.jpg'
            };
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return {
            name: 'Uknown user',
            profilePic: 'default-profile-pic.jpg'
        };
    }
};

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
                notes: data.notes,
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