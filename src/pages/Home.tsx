import Button from '@mui/material/Button';
import './Home.css';

const Home = () => {
    return (
        <>
            <div className="page">

                <div className="body">
                    <h2>Track and rank <br></br>your favourite games</h2>
                    <Button className="gs_button" variant="contained" href="/Login">GET STARTED</Button>
                </div>
            </div>
            <div className='color-divider'></div>
            <div className='description'>
                <h1>Ranking video games</h1>
                <p>
                    Throughout my life video games have always been incredibly impactful, and although a number rating 
                    out of 5 doesn't do it any justice, I've always wanted to keep a record of which games impacted me the most. 
                    Arcade-rate is designed to make it easy to track your own favourites and compare them with your friends. I figured 
                    this would be a great opportunity to learn how to work with firebase as well as opening avenues for a building a 
                    recommendation system in the future.
                </p>
            </div>
            <div className='color-divider'></div>
        </>
    )
}

export default Home;