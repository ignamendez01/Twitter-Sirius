import './Tweet.css';
import { IconButton } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import {useState} from "react";

interface TweetProps {
    tweet: {
        id: string;
        author: {
            id: string;
            firstName: string;
            lastName: string;
            username: string;
            profilePicture: string;
            private: boolean;
        };
        content: string;
        createdAt: string;
        reactions: {
            id: string;
            user: {
                username: string;
                profilePicture: string;
                private: boolean;
            };
            type: string;
        }[];
        comments: {
            id: string;
            author: {
                id: string;
                firstName: string;
                lastName: string;
                username: string;
                profilePicture: string;
                private: boolean;
            };
            content: string;
        }[];
        images?: string[];
    };
}

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
    let likesCount = 0;
    let retweetsCount = 0;

    tweet.reactions.forEach(reaction => {
        if (reaction.type === 'LOVE') {
            likesCount++;
        } else if (reaction.type === 'RETWEET') {
            retweetsCount++;
        }
    });

    const [likes, setLikes] = useState(likesCount);
    const [liked, setLiked] = useState(false);
    const [retweets, setRetweets] = useState(retweetsCount);
    const [retweeted, setRetweeted] = useState(false);

    const like = () => {
        setLikes(likes + 1);
        setLiked(true);
    };

    const unlike = () => {
        setLikes(likes - 1);
        setLiked(false);
    };

    const retweet = () => {
        setRetweets(retweets + 1);
        setRetweeted(true);
    };

    const unretweet = () => {
        setRetweets(retweets - 1);
        setRetweeted(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()]; // Obtener el nombre del mes
        const day = date.getDate(); // Obtener el día del mes
        return `${month} ${day}`; // Devolver el formato "Month Day"
    };

    return (
        <div className="tweet-card">
            <div className="tweet-author">
                <div className="information">
                    <img src={tweet.author.profilePicture} alt="Profile" />
                    <span>{tweet.author.firstName} {tweet.author.lastName}</span>
                    <p>@{tweet.author.username}</p>
                    <div className="circle" />
                    <p>{formatDate(tweet.createdAt)}</p>
                </div>
                <div>
                    <IconButton aria-label="comment" size="small" >
                        <div className="circle-button" />
                        <div className="circle-button" />
                        <div className="circle-button" />
                    </IconButton>
                </div>
            </div>
            <div className="tweet-content">
                <p>{tweet.content}</p>
            </div>
            <div className="tweet-images">
                {tweet.images && (
                    <div>
                        {tweet.images.map((image, index) => (
                            <img key={index} src={image} alt="Tweet Image" />
                        ))}
                    </div>
                )}
            </div>
            <div className="tweet-stats">
                <IconButton aria-label="comment" size="small">
                    <ChatBubbleOutlineIcon fontSize="inherit" />
                </IconButton>
                <span>{tweet.comments.length}</span>
                {liked ?
                    <IconButton aria-label="like" size="small" onClick={unlike}>
                        <FavoriteIcon fontSize="inherit" />
                    </IconButton>
                    :
                    <IconButton aria-label="like" size="small" onClick={like}>
                        <FavoriteBorderIcon fontSize="inherit" />
                    </IconButton>
                }
                <span>{likes}</span>
                {retweeted ?
                    <IconButton aria-label="retweet" size="small" onClick={unretweet}>
                        <RepeatOnIcon fontSize="inherit" />
                    </IconButton>
                    :
                    <IconButton aria-label="retweet" size="small" onClick={retweet}>
                        <RepeatIcon fontSize="inherit" />
                    </IconButton>
                }
                <span>{retweets}</span>
            </div>
        </div>
    );
}

export default Tweet;