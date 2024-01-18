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
                <h1>Header</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    uis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div className='color-divider'></div>
        </>
    )
}

export default Home;