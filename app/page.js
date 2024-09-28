"use client";

import React, { useState } from 'react';
import videos from './data/video.js';
import YouTubePlayer from './YouTubePlayer.js'; 

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => {
      if (prevIndex < videos.length - 1) {
        return prevIndex + 1; 
      }
      return prevIndex; 
    });
  };

  return (
    <div>
      <h1>Project X</h1>
      <br />
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", 
          gap: "20px",
          marginBottom: "20px",
          maxWidth: "100%", 
        }}
      >
        {/* Video Player */}
        <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>
          <YouTubePlayer
            key={currentVideoIndex} 
            video={videos[currentVideoIndex]} 
            onEnd={handleVideoEnd} 
          />
        </div>
        
        {/* Other videos */}
        {videos.map((video, index) => (
          index !== currentVideoIndex && ( 
            <div key={video.id} style={{ textAlign: "center" }}>
              <iframe
                width="100%" 
                height="auto"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  aspectRatio: "16/9",
                }}
              ></iframe>
              <div>
                <label>{video.title}</label>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
