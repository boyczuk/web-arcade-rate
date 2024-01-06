import Button from '@mui/material/Button';
import './Home.css';

const Home = () => {
    return (
        <div className="page">

            <div className="body">
                <h2>Track and rank <br></br>your favourite games</h2>
                <Button className="gs_button" variant="contained">GET STARTED</Button>
            </div>
        </div>
    )
}

export default Home;