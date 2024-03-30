import React from 'react';
import MainMenu from './Menu/Menu';
import Tweet from './Tweet/Tweet'
import Recommendations from "./Recommendations/Recommendations";
import tweetsData from "./tweets.json";

const Menu: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', paddingRight: '10px', paddingLeft: '10px', gap:'0.5%' }}>
            <div>
                <MainMenu/>
            </div>
            <div className="tweets" style={{ overflowY: 'auto', maxHeight: 'calc(100vh)'}}>
                {tweetsData.map(tweet => (
                    <Tweet key={tweet.id} tweet={tweet} />
                ))}
            </div>
            <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh)'}}>
                <Recommendations></Recommendations>
            </div>
        </div>
);
}

export default Menu;