import React from 'react';
import Button from '@mui/material/Button';
import './Home.css';

interface HomeProps {
    currentUser: any;  
}

const Home: React.FC<HomeProps> = ({ currentUser }) => {
    //Replcae with backend connection to find these? Maybe a stack for recent reviews 
    // or add up how many games have been added to each profile over period of time
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
                        <h3>Top 5 Most Popular Games Today</h3>
                        <div className="games-row">
                            {popularGames.map((game, index) => (
                                <div key={index} className="game-card">
                                    <img src={game.image} alt={game.title} className="game-image" />
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
                    <div className='color-divider'></div>
                </>
            )}
        </>
    );
}

export default Home;
