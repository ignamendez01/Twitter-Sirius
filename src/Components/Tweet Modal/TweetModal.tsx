import './TweetModal.css';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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
        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
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
            <div className="modal-images">
                {tweet.images && (
                    <div>
                        {tweet.images.map((image, index) => (
                            <img key={index} src={image} alt="Modal Image"/>
                        ))}
                    </div>
                )}
            </div>
            <div className="modal-date">
                <p>{formatDateTime(tweet.createdAt)}</p>
            </div>
            <div className="modal-stats">
                <button aria-label="comment" className="icon-button">
                    <ChatBubbleOutlineIcon fontSize="inherit"/>
                </button>
                <span>{tweet.comments.length}</span>
                {isLiked ?
                    <button aria-label="like" onClick={unlike} className="icon-button">
                        <FavoriteIcon fontSize="inherit" className="liked"/>
                    </button>
                    :
                    <button aria-label="like" className="icon-button" onClick={like}>
                        <FavoriteBorderIcon fontSize="inherit"/>
                    </button>
                }
                <span>{likesCount}</span>
                {isRetweeted ?
                    <button aria-label="retweet" onClick={unretweet} className="icon-button">
                        <RepeatIcon fontSize="inherit" className="retweeted"/>
                    </button>
                    :
                    <button aria-label="retweet" onClick={retweet} className="icon-button">
                        <RepeatIcon fontSize="inherit" />
                    </button>
                }
                <span>{retweetsCount}</span>
            </div>
        </div>
    );
}

export default TweetModal;