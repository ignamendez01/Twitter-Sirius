import './Tweet.css';
import { Modal } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import { useState } from "react";
import TweetModal from '../Tweet Modal/TweetModal';

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

function TweetStats(tweet: { id: string; author: { id: string; firstName: string; lastName: string; username: string; profilePicture: string; private: boolean }; content: string; createdAt: string; reactions: { id: string; user: { username: string; profilePicture: string; private: boolean }; type: string }[]; comments: { id: string; author: { id: string; firstName: string; lastName: string; username: string; profilePicture: string; private: boolean }; content: string }[]; images?: string[] }, liked: boolean, unlike: () => void, like: () => void, likes: number, retweeted: boolean, unretweet: () => void, retweet: () => void, retweets: number) {
    return <div className="tweet-stats">
        <button aria-label="comment" className="icon-button">
            <ChatBubbleOutlineIcon fontSize="inherit"/>
        </button>
        <span>{tweet.comments.length}</span>
        {liked ?
            <button aria-label="like" onClick={unlike} className="icon-button">
                <FavoriteIcon fontSize="inherit" className="liked"/>
            </button>
            :
            <button aria-label="like" className="icon-button" onClick={like}>
                <FavoriteBorderIcon fontSize="inherit"/>
            </button>
        }
        <span>{likes}</span>
        {retweeted ?
            <button aria-label="retweet" onClick={unretweet} className="icon-button">
                <RepeatIcon fontSize="inherit" className="retweeted"/>
            </button>
            :
            <button aria-label="retweet" onClick={retweet} className="icon-button">
                <RepeatIcon fontSize="inherit" />
            </button>
        }
        <span>{retweets}</span>
    </div>;
}

function MoreButton() {
    return <button aria-label="more" className="icon-button">
        <div className="circle-button"/>
        <div className="circle-button"/>
        <div className="circle-button"/>
    </button>;
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        return `${month} ${day}`;
    };

    return (
        <div className="tweet-card">
            <div className="tweet-author" onClick={handleOpen}>
                <div className="information">
                    <img src={tweet.author.profilePicture} alt="Profile"/>
                    <span>{tweet.author.firstName} {tweet.author.lastName}</span>
                    <p>@{tweet.author.username}</p>
                    <div className="circle"/>
                    <p>{formatDate(tweet.createdAt)}</p>
                </div>
                <div>
                    {MoreButton()}
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <TweetModal
                    tweet={tweet}
                    likes={likes}
                    liked={liked}
                    retweets={retweets}
                    retweeted={retweeted}
                    onClose={handleClose}
                    updateLikesState={setLikes}
                    updateRetweetsState={setRetweets}
                    updateLikedState={setLiked}
                    updateRetweetedState={setRetweeted}
                />
            </Modal>
            <div className="tweet-content" onClick={handleOpen}>
                <p>{tweet.content}</p>
            </div>
            <div className="tweet-images" onClick={handleOpen}>
                {tweet.images && (
                    <div>
                        {tweet.images.map((image, index) => (
                            <img key={index} src={image} alt="Tweet Image"/>
                        ))}
                    </div>
                )}
            </div>
            {TweetStats(tweet, liked, unlike, like, likes, retweeted, unretweet, retweet, retweets)}
        </div>
    );
}

export default Tweet;