"use client";

import videos from './data/video.js'; // Import video data

export default function Home() {
  return (
    <div>
      <h1>Project X </h1>
      <br></br>
      <br></br>
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(5, 1fr)", 
          gap: "20px", 
          marginBottom: "20px",
          maxWidth: "100%", // Adjust to screen width
        }}
      >
        {videos.map((video) => (
          <div key={video.id} style={{ textAlign: "center" }}>
            <iframe
              width="100%" // Make the video responsive to the container
              height="auto"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                aspectRatio: "16/9", // Maintain 16:9 ratio for videos
              }}
            ></iframe>
            <div>
              <label>{video.title}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
