import './TweetModal.css';
import { IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RepeatOnIcon from "@mui/icons-material/RepeatOn";
import RepeatIcon from "@mui/icons-material/Repeat";
import { useState } from "react";

interface TweetModalProps {
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
    likes: number;
    liked: boolean;
    retweets: number;
    retweeted: boolean;
    onClose: () => void;
    updateLikesState: (value: number) => void;
    updateRetweetsState: (value: number) => void;
    updateLikedState: (value: boolean) => void;
    updateRetweetedState: (value: boolean) => void;
}

const TweetModal: React.FC<TweetModalProps> = ({ tweet, likes, liked, retweets, retweeted, onClose, updateLikesState, updateRetweetsState, updateLikedState, updateRetweetedState }) => {
    const [likesCount, setLikesCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(liked);
    const [retweetsCount, setRetweetsCount] = useState(retweets);
    const [isRetweeted, setIsRetweeted] = useState(retweeted);

    const like = () => {
        setLikesCount(likesCount + 1);
        setIsLiked(true);
        updateLikesState(likesCount + 1);
        updateLikedState(true);
    };

    const unlike = () => {
        setLikesCount(likesCount - 1);
        setIsLiked(false);
        updateLikesState(likesCount - 1);
        updateLikedState(false);
    };

    const retweet = () => {
        setRetweetsCount(retweetsCount + 1);
        setIsRetweeted(true);
        updateRetweetsState(retweetsCount + 1);
        updateRetweetedState(true);
    };

    const unretweet = () => {
        setRetweetsCount(retweetsCount - 1);
        setIsRetweeted(false);
        updateRetweetsState(retweetsCount - 1);
        updateRetweetedState(false);
    };

    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString);
        // Obtener la hora en formato 12 horas
        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convertir a formato 12 horas
        // Obtener los minutos y agregar un cero inicial si es necesario
        const minutes = String(date.getMinutes()).padStart(2, '0');
        // Obtener el nombre del mes y el día del mes
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        // Obtener el año
        const year = date.getFullYear();
        // Crear la cadena de fecha y hora formateada
        return `${hours}:${minutes} ${ampm} ${month} ${day}, ${year}`;
    };

    return (
        <div className="modal">
            <div className="modal-author">
                <img src={tweet.author.profilePicture} alt="Profile" />
                <div>
                    <span className="name">{tweet.author.firstName} {tweet.author.lastName}</span>
                    <br/>
                    <span className="user">@{tweet.author.username}</span>
                </div>
            </div>
            <div className="modal-content">
                <p>{tweet.content}</p>
            </div>
            <div className="modal-date">
                <p>{formatDateTime(tweet.createdAt)}</p>
            </div>
            <div className="modal-stats">
                <IconButton aria-label="comment" size="small">
                    <ChatBubbleOutlineIcon fontSize="inherit" />
                </IconButton>
                <span>{tweet.comments.length}</span>
                {isLiked ?
                    <IconButton aria-label="like" size="small" onClick={unlike}>
                        <FavoriteIcon fontSize="inherit" />
                    </IconButton>
                    :
                    <IconButton aria-label="like" size="small" onClick={like}>
                        <FavoriteBorderIcon fontSize="inherit" />
                    </IconButton>
                }
                <span>{likesCount}</span>
                {isRetweeted ?
                    <IconButton aria-label="retweet" size="small" onClick={unretweet}>
                        <RepeatOnIcon fontSize="inherit" />
                    </IconButton>
                    :
                    <IconButton aria-label="retweet" size="small" onClick={retweet}>
                        <RepeatIcon fontSize="inherit" />
                    </IconButton>
                }
                <span>{retweetsCount}</span>
            </div>
        </div>
    );
}

export default TweetModal;