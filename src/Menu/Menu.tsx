import React from 'react';
import { Button } from '@mui/material';
import twitter from './Twitter_Icon.png';
import './Menu.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Menu: React.FC = () => {
    return (
        <div className="menu">
            <img src={twitter} alt="Tweet Image" style={{  width: '20px', height: '16px' }}/>
            <Button  startIcon={<HomeIcon style={{ fontSize: '1.8rem' }} />} className="action">
                <b>Home</b>
            </Button>
            <Button  startIcon={<SearchIcon style={{ fontSize: '1.8rem' }} />} className="action">
                Explore
            </Button>
            <Button  startIcon={<MailOutlineIcon style={{ fontSize: '1.8rem' }} />} className="action">
                Message
            </Button>
            <Button  startIcon={<PersonOutlineIcon style={{ fontSize: '1.8rem' }} />} className="action">
                Profile
            </Button>
            <Button  variant="contained" className="button">
                Tweet
            </Button>
        </div>
    );
}

export default Menu;