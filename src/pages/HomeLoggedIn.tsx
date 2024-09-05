import React from 'react';
import './HomeLoggedIn.css';

const Home = () => {
    // Switch to some kind of backend function that updates a few times a day and calculates
    const popularGames = [
        { title: 'Cyberpunk 2077', image: 'cyberpunk.jpg', rating: 5 },
        { title: 'Grand Theft Auto V', image: 'gtav.jpg', rating: 5 },
        { title: 'Overwatch', image: 'overwatch.jpg', rating: 4.5 },
        { title: 'NHL 24', image: 'nhl24.jpg', rating: 4 },
        { title: 'Minecraft', image: 'minecraft.jpg', rating: 5 }
    ];

    const recentReviews = [
        { user: 'User1', game: 'Cyberpunk 2077', review: 'Definitely my all-time #1 game' },
        { user: 'User2', game: 'Grand Theft Auto V', review: 'Endlessly entertaining and always something to do!' },
        { user: 'User3', game: 'Overwatch', review: 'Great for team play, but needs more updates.' },
        { user: 'User4', game: 'NHL 24', review: 'Fun for hockey fans, but needs better graphics.' },
    ];

    return (
        <>
            <div className="popular-games">
                <h3>Top 5 Most Popular Games Today</h3>
                <div className="games-row">
                    {popularGames.map((game, index) => (
                        <div key={index} className="game-card">
                            <img src={game.image} alt={game.title} className="game-image"/>
                            <h4>{game.title}</h4>
                            <div className="game-rating">
                                {'★'.repeat(Math.floor(game.rating))}{game.rating % 1 !== 0 && '☆'}
                            </div>
                        </div>
                    ))}
                </div>
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
        </>
    );
}

export default Home;
