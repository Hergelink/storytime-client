import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import stories from '../context/exampleStories';
import style from '../styles/SingleStory.module.css';

export default function SingleStory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const param = id * 1;

  const currentStory = stories.filter((story) => story.id === param);


  const handleScroll = () => {
    const element = document.querySelector('header');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = () => {
    if (param === 3) {
      navigate('/story/1');
    } else if (param === 2) {
      navigate('/story/3');
    } else {
      navigate('/story/2');
    }
    handleScroll();
  };

  return (
    <main className='single'>
      {currentStory.map((story) => {
        return (
          <div key={story.id}>
            <h1 id={style.title}>{story.title}</h1>
            <img src={story.photo} alt={story.title} id={style.image} />
            <p className={style.text}>{story.storyEntry}</p>
            <p className={style.text}>{story.storyBody}</p>
            <p className={style.text}>{story.storyEnd}</p>
          </div>
        );
      })}

      <button id={style.navigateButton} onClick={handleNavigate}>
        Next Story
      </button>
      <Link to='/create' id={style.createLink} onClick={handleScroll}>
        + Create Your Own
      </Link>
    </main>
  );
}
