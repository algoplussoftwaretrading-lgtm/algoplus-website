import React, { useState, useEffect, useRef } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasAttemptedAutoplay = useRef(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/assets/audio/ambient.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'auto';
    audioRef.current = audio;

    // Log audio loading status
    audio.addEventListener('loadeddata', () => {
      console.log("Background music loaded successfully");
    });

    audio.addEventListener('error', (e) => {
      console.error("Failed to load background music:", {
        error: e,
        src: audio.src,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    // Function to attempt playing (only on user interaction)
    const handleUserInteraction = () => {
      if (!audioRef.current || isPlaying) return;

      audioRef.current.play()
        .then(() => {
          console.log("Background music started playing");
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Failed to play music:", err);
        });
    };

    // Listen for user interactions to enable music
    const cleanup = () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    // Cleanup on unmount
    return () => {
      cleanup();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isPlaying]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      console.log("Algo Plus music paused");
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          console.log("Algo Plus music resumed");
        })
        .catch((err) => {
          console.error("Failed to play music:", err);
        });
    }
  };

  return (
    <button
      onClick={toggleMusic}
      title={isPlaying ? "Pause Music" : "Play Music"}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      style={{
        position: "fixed",
        bottom: "30px",
        left: "30px",
        zIndex: 9999,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "2px solid rgba(255, 255, 255, 0.2)",
        backgroundColor: isPlaying ? "#3b82f6" : "#222",
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
