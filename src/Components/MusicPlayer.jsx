import React, { useState, useEffect, useRef } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio("/assets/audio/ambient.mp3"));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.5;

    // Function to try playing audio
    const attemptPlay = () => {
      audio.play()
        .then(() => {
          // Success: Music is playing
          setIsPlaying(true);
          // Remove the "waiting" listeners so we don't try to play again
          removeInteractionListeners();
        })
        .catch((error) => {
          console.log("Autoplay prevented. Waiting for user interaction...");
        });
    };

    // Helper to cleanup listeners
    const removeInteractionListeners = () => {
      document.removeEventListener("click", attemptPlay);
      document.removeEventListener("scroll", attemptPlay);
      document.removeEventListener("keydown", attemptPlay);
    };

    // 1. Try to play immediately (Works in some browsers)
    attemptPlay();

    // 2. If blocked, wait for ANY interaction (Click, Scroll, or Key)
    document.addEventListener("click", attemptPlay, { once: true });
    document.addEventListener("scroll", attemptPlay, { once: true });
    document.addEventListener("keydown", attemptPlay, { once: true });

    // Cleanup on component unmount
    return () => {
      audio.pause();
      removeInteractionListeners();
    };
  }, []);

  const toggleMusic = (e) => {
    // Stop the click from bubbling up (prevents triggering the listener again)
    e.stopPropagation(); 
    
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      title={isPlaying ? "Mute Music" : "Play Music"}
      style={{
        position: "fixed",
        bottom: "30px",
        left: "30px",
        zIndex: 9999,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        backgroundColor: isPlaying ? "#3b82f6" : "#222", // Blue = Playing, Dark = Muted
        color: "#fff",
        cursor: "pointer",
        boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        outline: "none"
      }}
    >
      {isPlaying ? (
        <i className="fa-solid fa-volume-high" style={{ fontSize: "18px" }}></i>
      ) : (
        <i className="fa-solid fa-volume-xmark" style={{ fontSize: "18px", color: "#888" }}></i>
      )}
    </button>
  );
};

export default MusicPlayer;