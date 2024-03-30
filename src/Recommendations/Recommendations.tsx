import React from 'react';
import tweetsData from "../tweets.json";
import { Button } from '@mui/material';
import './Recommendations.css';

interface OptionProps {
    picture: string;
    name: string;
    lastName: string;
    userName: string;
}

const Option: React.FC<OptionProps> = ({picture, name, lastName, userName}) =>{
    return (
        <div className="option">
            <div className="person">
                <img src={picture} alt="Profile" />
                <div>
                    <span className="name">{name} {lastName}</span>
                    <br/>
                    <span className="user">@{userName}</span>
                </div>
            </div>
            <Button variant="contained" className="follow-button">
                Follow
            </Button>
        </div>
    );
}

const Recommendations: React.FC = () => {
    return (
        <div className="recommendation">
            <input className="text-input" placeholder="Search"/>
            <div className="candidates">
                <p style={{color: "black", fontSize: "18px"}}><b>Who to Follow</b></p>
                {tweetsData.map(tweet => (
                    <Option key={tweet.id} picture={tweet.author.profilePicture} name={tweet.author.firstName}
                            lastName={tweet.author.lastName} userName={tweet.author.username}/>
                ))}
                <Button variant="text">
                    Show More
                </Button>
            </div>
        </div>
    );
}

export default Recommendations;