import React from 'react';
import twitter from './Twitter_Icon.png';
import './Menu.css';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Menu: React.FC = () => {
    return (
        <div className="menu">
            <img src={twitter} alt="Tweet Image"/>
            <button className="action">
                <HomeIcon/>
                <b>Home</b>
            </button>
            <button className="action">
                <SearchIcon/>
                Explore
            </button>
            <button  className="action">
                <MailOutlineIcon/>
                Message
            </button>
            <button className="action">
                <PersonOutlineIcon/>
                Profile
            </button>
            <button  className="button">
                Tweet
            </button>
        </div>
    );
}

export default Menu;