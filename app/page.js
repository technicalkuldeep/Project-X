"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import videos from './data/video.js';
import YouTubePlayer from './YouTubePlayer.js'; 
import { Appbar } from './components/Appbar.js';

export default function Home() {
    const { data: session, status } = useSession();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [videoIdInput, setVideoIdInput] = useState("");

    const handleVideoEnd = () => {
        setCurrentVideoIndex((prevIndex) => {
            if (prevIndex < videos.length - 1) {
                prevIndex = prevIndex + 1; 
            }
            return prevIndex; 
            //xyz
        });
    };

    const handleVideoIdSubmit = (event) => {
        event.preventDefault(); // Prevent form submission
        const videoIndex = parseInt(videoIdInput, 10) - 1; // Adjust for 1-based input
        if (!isNaN(videoIndex) && videoIndex >= 0 && videoIndex < videos.length) {
            setCurrentVideoIndex(videoIndex); // Set the current video index to the user input
        } else {
            alert("Invalid video ID. Please enter a number between 1 and 11."); // Alert for invalid input
        }
        setVideoIdInput(""); 
    };


    return (
        <div>
            <Appbar />

            {!session ? ( // If not logged in, only show Appbar
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h1>Please log in to view content.</h1>
                </div>
            ) : ( // If logged in, show the main content
                <>
                    <br />
                    <form onSubmit={handleVideoIdSubmit} style={{ textAlign: 'center' }}>
                        <label>
                            Enter Video ID (1-11):
                            <input
                                type="number"
                                value={videoIdInput}
                                onChange={(e) => setVideoIdInput(e.target.value)}
                                min="1"
                                max={videos.length} // This will be 11 if videos.length is 11
                                required
                                style={{ marginLeft: '10px', padding: '5px' }}
                            />
                        </label>
                        <button type="submit" style={{ marginLeft: '10px', padding: '5px 10px' }}>
                            Set Video
                        </button>
                    </form>
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
                </>
            )}
        </div>
    );
}
