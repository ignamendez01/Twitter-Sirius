import React from 'react';
import MainMenu from '../Menu/Menu';
import Tweet from '../Tweet/Tweet'
import Recommendations from "../Recommendations/Recommendations";
import tweetsData from "../../tweets.json";
import './Home.css';

function MyPost() {
    return <div className="myTweet">
        <div className="post">
            <img src="https://randomuser.me/api/portraits/men/19.jpg" alt="Profile"/>
            <textarea placeholder={"What's happening?"}></textarea>
        </div>
        <div>
            <button className="tweet"> Tweet</button>
        </div>
    </div>;
}

const Menu: React.FC = () => {
    return (
        <div className="home">
            <div>
                <MainMenu/>
            </div>
            <div>
                <div className="title">
                    <p><b>Home</b></p>
                </div>
                <div className="controller">
                    <button className="selected">
                        For You
                    </button>
                    <button className="unselected">
                        Following
                    </button>
                </div>
                <br/>
                {MyPost()}
                <br/>
                <div className="personal-space">
                    {tweetsData.map(tweet => (
                        <Tweet key={tweet.id} tweet={tweet}/>
                    ))}
                </div>
            </div>
            <div className="personal-space">
                <Recommendations></Recommendations>
            </div>
        </div>
);
}

export default Menu;