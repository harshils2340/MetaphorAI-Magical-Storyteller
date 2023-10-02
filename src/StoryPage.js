// StoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './story.css';



const sampleStoryData = [
  {
    text: "Once upon a time...",
    url: "https://example.com/image1.jpg",
  },
  {
    text: "In a faraway land...",
    url: "https://example.com/image2.jpg",
  },
  {
    text: "There lived a brave knight...",
    url: "https://example.com/image3.jpg",
  },
  {
    text: "And so the adventure began...",
    url: "https://example.com/image4.jpg",
  },
  // Add more objects as needed
];

function StoryPage() {
  const { pageNumber } = useParams(); // Get the pageNumber from the URL
  const [storyData, setStoryData] = useState(sampleStoryData);
  const [currentPage, setCurrentPage] = useState(0);


  const nextPage = () => {
    if (currentPage < storyData.length - 2) {
      setCurrentPage(currentPage + 2);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 2);
    }
  };

  return (
    <div className="story-book">
      <div className="book-page">
        <div className="book-image">
          {storyData[currentPage] && (
            <img src={storyData[currentPage].url} alt={`Page ${currentPage + 1}`} />
          )}
        </div>
        <div className="book-text">
          {storyData[currentPage] && storyData[currentPage].text}
        </div>
      </div>
      <div className="book-page">
        <div className="book-image">
          {storyData[currentPage + 1] && (
            <img src={storyData[currentPage + 1].url} alt={`Page ${currentPage + 2}`} />
          )}
        </div>
        <div className="book-text">
          {storyData[currentPage + 1] && storyData[currentPage + 1].text}
        </div>
      </div>
      <div className="book-controls">
        <button onClick={prevPage}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );  
}

export default StoryPage;
