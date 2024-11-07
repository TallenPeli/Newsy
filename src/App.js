import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'; // Importing the markdown renderer
import { SyncLoader } from 'react-spinners'; // Importing the spinner from react-spinners
import './App.css';

function App() {
  // Initialize URLs from localStorage
  const [urls, setUrls] = useState(() => {
    const savedUrls = localStorage.getItem('feedUrls');
    console.log('Initializing URLs from localStorage:', savedUrls);
    return savedUrls ? JSON.parse(savedUrls) : [];
  });
  const [newUrl, setNewUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading

  // Save URLs to localStorage whenever the user add urls
  useEffect(() => {
    console.log('Saving URLs to localStorage:', urls);
    localStorage.setItem('feedUrls', JSON.stringify(urls));
  }, [urls]);

  const handleAddFeed = () => {
    if (newUrl.trim() !== '') {
      setUrls((prevUrls) => {
        const updatedUrls = [...prevUrls, newUrl.trim()];
        console.log('Adding new URL:', newUrl);
        return updatedUrls;
      });
      setNewUrl('');
    }
  };

  const handleRemoveFeed = (index) => {
    setUrls((prevUrls) => {
      const updatedUrls = [...prevUrls];
      console.log('Removing URL at index:', index, 'URL:', updatedUrls[index]);
      updatedUrls.splice(index, 1);
      return updatedUrls;
    });
  };

  const handleFetchSummary = async () => {
    setError('');
    setSummary('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/get_summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail);
      }

      const data = await response.json();
      setSummary(data.summary); // Assuming summary is markdown-formatted because gpt4o mini sometimes sucks at doing this stuff
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="App">
      <div className='sidebar shadow-4'>
        <div className='sidebar-header-bar shadow-2'>
          <h2 className='sidebar-header text-shadow-1'>Feeds</h2>
        </div> 
        <div className="feed-container">
          {urls.map((url, index) => (
            <div key={index} className="feed-item shadow-2">
              <div className='url-item'>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </div>
              <button className="remove-button" onClick={() => handleRemoveFeed(index)}>
                  ❌
                </button>
            </div>
          ))}
        </div>
        <div className="add-feed-container">
            <input
              type="text"
              className="input-field shadow-2"
              placeholder="Enter RSS feed URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <button className="add-button shadow-3" onClick={handleAddFeed}>
              +
            </button>
        </div>
      </div>
      <div className="content-container">
        <h1 className='test-shadow-2 title'>Summmary</h1>
        <div className="summary-container shadow-5">
          <div className="summary-text">
            {loading ? (
              <div className="spinner-container">
                <SyncLoader color="#ffffff" loading={loading} size={20} />
                <p>Generating Summary...</p>
              </div>
            ) : summary ? (
              <ReactMarkdown>{summary}</ReactMarkdown>
            ) : (
              'Click the "Generate Summary" button to get started.'
            )}
          </div>
          {error && <div className="error-message">Error: {error}</div>}
        </div>
        <div className="input-container">
          <button className="submit-button shadow-2" onClick={handleFetchSummary}>
            Generate Summary
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
