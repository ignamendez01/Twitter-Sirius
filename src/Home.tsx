import React from 'react';
import MainMenu from './Menu/Menu';
import Tweet from './Tweet/Tweet'
import Recommendations from "./Recommendations/Recommendations";
import tweetsData from "./tweets.json";
import {Button} from "@mui/material";

const Menu: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: '80px', gap:'0.5%' }}>
            <div>
                <MainMenu/>
            </div>
            <div>
                <div style={{padding: '16px', gap:'8px'}}>
                    <p style={{gap: '8px', fontSize:'20px'}}><b>Home</b></p>
                </div>
                {/*<div style={{display: 'flex', flexDirection: 'row', gap:'24px', maxWidth: '473px'}}>
                    <Button style={{border: 'none', color:'black', borderBottom: '1px solid #4A99E9', width:'200px', textTransform: 'none'}}>
                        For You
                    </Button>
                    <Button style={{border: 'none', color:'black', width:'200px', textTransform: 'none'}}>
                        Following
                    </Button>
                </div>
                */}
                <div className="tweets" style={{ overflowY: 'auto', maxHeight: 'calc(100vh)'}}>
                    {tweetsData.map(tweet => (
                        <Tweet key={tweet.id} tweet={tweet} />
                    ))}
                </div>
            </div>
            <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh)'}}>
                <Recommendations></Recommendations>
            </div>
        </div>
);
}

export default Menu;