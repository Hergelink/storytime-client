import React, { useState } from 'react';
import { Navigate } from 'react-router';
import style from '../styles/OutputArea.module.css';
import PdfFile from './PdfFile';
import { PDFDownloadLink } from '@react-pdf/renderer';

export default function OutputArea({
  title,
  description,
  storyBody,
  image,
  storyEnd,
  loading,
  errorMessage,
  handleSubmit,
}) {
  const [redirect, setRedirect] = useState(false);

  const createNewStory = async () => {
    const data = {
      title,
      description,
      storyBody,
      storyEnd,
      image,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_END_POINT}/post`,
      {
        // const response = await fetch('http://localhost:3001/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      }
    );

    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to='/stories' />;
  }

  return (
    <>
      {image.length > 1 ? (
        <div id={style.outputContainer}>
          <img src={image} id={style.storyImage} alt={`${title}`}></img>
          <h2 id={style.storyTitle}>{title}</h2>
          <p id={style.storyDescription}>{description}</p>
          <p id={style.wholeStory}>{storyBody}</p>
          <p id={style.storyEnd}>{storyEnd}</p>
          <button id={style.continueBtn} onClick={createNewStory}>
            Publish to Stories
          </button>
          <PDFDownloadLink
            document={
              <PdfFile
                title={title}
                description={description}
                storyBody={storyBody}
                storyEnd={storyEnd}
              />
            }
            fileName={title}
          >
            <button id={style.downloadBtn}>Download as PDF</button>
          </PDFDownloadLink>
        </div>
      ) : (
        <div id={style.preOutputContainer}>
          {loading ? (
            <>
              {errorMessage ? (
                <>
                  <p id={style.errorText}>
                    There was an error with the server.
                  </p>
                  <button id={style.tryAgainBtn} onClick={handleSubmit}>
                    Try Again
                  </button>
                </>
              ) : (
                <>
                  <h2>Your story is being generated ✍️</h2>
                  <p id={style.infoText}>
                    This process usually takes 30 to 60 seconds
                  </p>
                </>
              )}
            </>
          ) : (
            <h3>Your story will appear here:</h3>
          )}
        </div>
      )}
    </>
  );
}
