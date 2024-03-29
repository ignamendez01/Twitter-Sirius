import React from 'react';
import './App.css';
import Tweet from './Tweet';
import tweetsData from './tweets.json';

function App() {
  return (
      <div className="tweets">
        {tweetsData.map(tweet => (
            <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
  );
}

export default App;
