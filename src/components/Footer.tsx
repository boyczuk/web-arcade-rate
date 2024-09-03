import './Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
    return (
        <div className='bar'>
            <div className='text'>
                <h2>@ Adlai.ca</h2>
                <h2>arcade.rate@gmail.com</h2>
                <h2>Video game data from <a href="#">IDGB Database.</a></h2>
            </div>

            <div className='social_media-links'>
                <h2>Connect with us on</h2>
                <div className='icons'>
                    <a href="https://www.instagram.com/arcade.rate" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                    </a>
                    <a href="https://www.youtube.com/@ArcadeRate" target="_blank" rel="noopener noreferrer">
                        <YouTubeIcon />
                    </a>
                    <a href="https://x.com/ArcadeRate" target="_blank" rel="noopener noreferrer">
                        <TwitterIcon />
                    </a>
                </div>
            </div>
        </div>
    );
}


export default Footer;
