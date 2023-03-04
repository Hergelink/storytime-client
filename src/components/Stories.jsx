import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StoryCard from './StoryCard';
import style from '../styles/Stories.module.css';

export default function Stories() {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/post`).then((response) => {
    // fetch('http://localhost:3001/post').then((response) => {
      response.json().then((stories) => {
        setStories(stories);
      });
    });
  }, []);

  const handleScroll = () => {
    const element = document.querySelector('header');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <h1 id={style.pageTitle}>Latest Stories</h1>
      {stories.length > 0 ? (
        stories.map((story) => {
          return <StoryCard {...story} key={story._id} />;
        })
      ) : (
        <p id={style.zeroStoryMessage}>There are 0 stories</p>
      )}
      <div id={style.callToActionDiv}>
        <h3 id={style.callToAction}>
          Don't just read,
          <br /> <span>create your own!</span>
        </h3>
        <Link to='/create' id={style.linkToCreatePage} onClick={handleScroll}>
          + Create your Story
        </Link>
      </div>
    </main>
  );
}
