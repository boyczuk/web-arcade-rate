import './Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
    return (
        <div className='bar'>
            <div className='text'>
                <h2>@ Adlai.ca</h2>
                <h2>Video game data from IDGB Database. (Link site)</h2>
            </div>

            <div className='social_media-links'>
                <InstagramIcon />
                <FacebookIcon />
                <MailOutlineIcon />
                <TwitterIcon />
            </div>
        </div>
    );
}


export default Footer;
