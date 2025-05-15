import { useEffect, useState} from 'react';
import './App.css';
import { submitText, getLatestText } from './api.ts';


function App() {
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await getLatestText();
        setCurrentText(response);
      } catch (err) {
        console.error('Unable to fetch text:', err);
      }
    };

    fetchText();
  }, []);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const updatedText = await submitText(userInput);
      setCurrentText(updatedText);
      setUserInput('');
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>

      <div className="wrapper">
        <h1 className="title">Most Recent Submission</h1>
        <span id="answer">{currentText || 'Loading...'}</span>
      </div>
    </>
  );
}

export default App;
