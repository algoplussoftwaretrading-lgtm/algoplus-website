import React, { useState, useEffect, useRef } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element only in browser environment
    if (typeof window !== 'undefined') {
      const audio = new Audio();
      audio.src = "/assets/audio/ambient.mp3";
      audio.loop = true;
      audio.volume = 0.5;
      audio.preload = "auto";

      // Listen for when audio is ready to play
      audio.addEventListener('canplaythrough', () => {
        setIsLoaded(true);
      });

      audio.addEventListener('error', (e) => {
        console.error("Audio loading error:", e);
      });

      audioRef.current = audio;
    }

    // Function to try playing audio
    const attemptPlay = () => {
      const audio = audioRef.current;
      if (!audio || !isLoaded) return;

      audio.play()
        .then(() => {
          // Success: Music is playing
          setIsPlaying(true);
          // Remove the "waiting" listeners so we don't try to play again
          removeInteractionListeners();
        })
        .catch((error) => {
          // Silently fail - autoplay blocked
        });
    };

    // Helper to cleanup listeners
    const removeInteractionListeners = () => {
      document.removeEventListener("click", attemptPlay);
      document.removeEventListener("scroll", attemptPlay);
      document.removeEventListener("keydown", attemptPlay);
      document.removeEventListener("touchstart", attemptPlay);
    };

    // Wait a bit for audio to load before attempting autoplay
    const autoplayTimer = setTimeout(() => {
      if (isLoaded) {
        attemptPlay();
      }
    }, 500);

    // If blocked, wait for ANY interaction (Click, Scroll, Key, or Touch)
    document.addEventListener("click", attemptPlay, { once: true });
    document.addEventListener("scroll", attemptPlay, { once: true });
    document.addEventListener("keydown", attemptPlay, { once: true });
    document.addEventListener("touchstart", attemptPlay, { once: true });

    // Cleanup on component unmount
    return () => {
      clearTimeout(autoplayTimer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      removeInteractionListeners();
    };
  }, [isLoaded]);

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