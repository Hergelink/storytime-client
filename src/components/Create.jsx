import { useState } from 'react';
import style from '../styles/Create.module.css';
import OutputArea from './OutputArea';
import Spinner from './Spinner';
import headerImg from '../images/space-1.webp';

export default function Create() {
  const [input, setInput] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('Your story will appear here');
  const [description, setDescription] = useState('Description');
  const [storyBody, setStoryBody] = useState('Story');
  const [image, setImage] = useState('');
  const [storyEnd, setStoryEnd] = useState('');

  const handleInput = (e) => {
    setInput(() => e.target.value);
    e.target.value.length > 0
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
  };

  // Start to implement base64 img conversion
  async function generateText() {
    setErrorMessage('');
    setTitle('');
    setImage('');
    setDescription('');
    setStoryBody('');
    setStoryEnd('');
    setLoading(true);
    try {
      // const response = await fetch(
      //   'http://localhost:3001/openai/generatetext',
      //   {
      const response = await fetch(
        `${process.env.REACT_APP_API_END_POINT}/openai/generatetext`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('prompt could not be generated');
      }

      const returnedData = await response.json();

      setImage(returnedData.data.imageUrl);
      setTitle(returnedData.data.aiOutput);
      setDescription(returnedData.data.entryOutput);
      setStoryBody(returnedData.data.storyBodyOutput);
      setStoryEnd(returnedData.data.storyEndOutput);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    generateText(input);
  };

  return (
    <main>
      <h1 id={style.pageTitle}>Create your story</h1>
      <img src={headerImg} alt='sunny weather' id={style.headerImg} />
      <form onSubmit={handleSubmit}>
        <label id={style.createLabel}>
          What kind of story do you want?
          <p className={style.inputDescription}>
            Please give as much detail as possible for more personalized
            stories.
          </p>
          <input
            id={style.createInput}
            placeholder='Eg: A race story in space'
            type='text'
            onChange={handleInput}
            className={style.pulsingOn}
          />
        </label>

        <p className={style.inputDescription}>
          **Avoid harmful language as it may be flagged and result in loss of
          credits.
        </p>
        <button
          id={style.createBtn}
          type='submit'
          disabled={buttonDisabled}
          className={buttonDisabled ? `${style.disabled}` : `${style.enabled}`}
        >
          {loading ? <Spinner /> : 'Create Story'}
        </button>
      </form>
      <OutputArea
        title={title}
        description={description}
        storyBody={storyBody}
        image={image}
        storyEnd={storyEnd}
        loading={loading}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
