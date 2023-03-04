import React, { useState } from 'react';
import style from '../styles/Stories.module.css';

export default function StoryCard({
  image,
  title,
  description,
  storyBody,
  storyEnd,
}) {
  const [storyDisplay, setStoryDisplay] = useState(false);
  const handleStoryDisplay = () => {
    setStoryDisplay((e) => !e);
  };

  const editedTitle = title.replace(/"/g, '');
  const formattedImageUrl = image.replace('./server', '');

  return (
    <div className={style.storyContainer}>
      <div className={style.imageContainer}>
        <img
          src={`${process.env.REACT_APP_API_END_POINT}${formattedImageUrl}`}
          // src={`http://localhost:3001${formattedImageUrl}`}
          alt={`a description of ${title}`}
        />
      </div>
      <div className={style.storyText}>
        <h2>{editedTitle}</h2>
        <p className='summary'>{description}</p>
        {storyDisplay ? (
          <div id='showAllTextDiv'>
            <p>{storyBody}</p>
            <p>{storyEnd}</p>
            <button
              onClick={handleStoryDisplay}
              className={style.closeDisplayBtn}
            >
              Minimize Story
            </button>
          </div>
        ) : (
          <button onClick={handleStoryDisplay} className={style.openDisplayBtn}>
            Continue Reading...
          </button>
        )}
      </div>
    </div>
  );
}
