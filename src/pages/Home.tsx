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
                <h1></h1>
                <p>
                    Dive into the world of gaming with Arcade-Rate! Keep track of every game you've played, rank your favorites, and see how your taste
                     evolves over time. Whether you're a casual gamer or a hardcore enthusiast, our platform helps you organize your gaming 
                     experiences and connect with others who share your passion. Start your journey today!"
                </p>
            </div>
            <div className='color-divider'></div>
        </>
    )
}

export default Home;