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
                    Keep track of all the games you've played. 
                </p>
            </div>
            <div className='color-divider'></div>
        </>
    )
}

export default Home;