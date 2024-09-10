import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Rating } from '@mui/material'; 
import { getMostReviewedGames } from '../helpers/firestoreHelpers';
import './Home.css';

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
    cover?: {
        url?: string;
    };
    comment: string;
}

interface HomeProps {
    currentUser: any;
}

const getLargeCoverUrl = (url: string | undefined) => {
    return url ? url.replace('t_thumb', 't_cover_big') : '';
};


const fetchGameCover = async (gameId: number): Promise<string | undefined> => {
    try {
        const response = await fetch(`http://localhost:3001/fetch-game-by-id?id=${gameId}`);
        const gameDataArray = await response.json();
        const gameData = gameDataArray[0];
        return gameData.cover ? gameData.cover.url : undefined;
    } catch (error) {
        console.error('Failed to fetch game cover:', error);
        return undefined;
    }
};

const Home: React.FC<HomeProps> = ({ currentUser }) => {
    const [popularGames, setPopularGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [recentReviews2, setRecentReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchGames = async () => {
            setIsLoading(true);

            const mostReviewedGames = await getMostReviewedGames();

            const gamesWithCovers = await Promise.all(
                mostReviewedGames.map(async (game) => {
                    const coverUrl = await fetchGameCover(Number(game.id));
                    return { ...game, cover: { url: coverUrl } };
                })
            );

            setPopularGames(gamesWithCovers);
            setIsLoading(false);
        };

        fetchGames();
    }, []);

    useEffect(() => {
        const getRecentReviews = async () => {

        }
    })

    const recentReviews = [
        { user: 'User1', game: 'Cyberpunk 2077', review: 'Definitely my all-time #1 game' },
        { user: 'User2', game: 'Grand Theft Auto V', review: 'Endlessly entertaining and always something to do!' },
        { user: 'User3', game: 'Overwatch', review: 'Great for team play, but needs more updates.' },
        { user: 'User4', game: 'NHL 24', review: 'Fun for hockey fans, but needs better graphics.' },
    ];

    return (
        <>
            {/* Non-logged-in */}
            {!currentUser && (
                <>
                    <div className="page">
                        <div className="body">
                            <h2>Track and rank <br />your favourite games</h2>
                            <Button className="gs_button" variant="contained" href="/Login">GET STARTED</Button>
                        </div>
                    </div>
                    <div className='color-divider'></div>
                    <div className='description'>
                        <h1></h1>
                        <p>
                            Dive into the world of gaming with Arcade-Rate! Keep track of every game you've played, rank your favorites, and see how your taste
                            evolves over time. Whether you're a casual gamer or a hardcore enthusiast, our platform helps you organize your gaming 
                            experiences and connect with others who share your passion. Start your journey today!
                        </p>
                    </div>
                    <div className='color-divider'></div>
                </>
            )}

            {/* Logged-in */}
            {currentUser && (
                <>
                    <div className="popular-games">
                        <h3>Top 5 Most Reviewed Games</h3>
                        {isLoading ? (
                            <p>Loading games...</p>
                        ) : (
                            <div className="games-row">
                                {popularGames.length > 0 ? (
                                    popularGames.map((game, index) => (
                                        <div key={index} className="game-card">
                                            {game.cover?.url ? (
                                                <img src={getLargeCoverUrl(game.cover.url)} alt={game.gameName} className="game-image" />
                                            ) : (
                                                <img src={'placeholder.jpg'} alt="No cover available" className="game-image" />
                                            )}
                                            <p>{game.gameName}</p>
                                            <p>Reviews: {game.reviewsCount}</p>
                                            <Rating
                                                name={`rating-${index}`}
                                                value={game.averageRating}
                                                precision={0.5} 
                                                readOnly
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p>No popular games available.</p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className='color-divider'></div>

                    <div className="recent-reviews">
                        <h3>Recent Reviews from the Community</h3>
                        <div className="reviews-feed">
                            {recentReviews.map((review, index) => (
                                <div key={index} className="review-post">
                                    <strong>{review.user}</strong> reviewed <em>{review.game}</em>:
                                    <p>{review.review}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='color-divider'></div>
                </>
            )}
        </>
    );
}

export default Home;
