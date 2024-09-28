import React, { useEffect , useState } from 'react';

const YouTubePlayer = ({ video, onEnd }) => {
  useEffect(() => {
    // Load the YouTube Iframe API if it hasn't been loaded already
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      onYouTubeIframeAPIReady();
    }

    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player(`youtube-iframe-${video.id}`, {
        events: {
          'onStateChange': (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              onEnd(); 
            }
          }
        }
      });
    };
  }, [video, onEnd]);

  return (
    <iframe
      id={`youtube-iframe-${video.id}`} 
      width="100%" 
      height="auto"
      src={video.url + "?autoplay=1&enablejsapi=1"} 
      title={video.title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        aspectRatio: "16/9", 
      }}
    ></iframe>
  );
};

export default YouTubePlayer;
