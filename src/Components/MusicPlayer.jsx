import React, { useState, useEffect, useRef } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const hasAttemptedAutoplay = useRef(false);

  useEffect(() => {
    // Create audio element
    const audio = new Audio("/assets/audio/algoplus-background.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Log audio loading status
    audio.addEventListener('loadeddata', () => {
      console.log("Algo Plus background music loaded successfully");
    });

    audio.addEventListener('error', (e) => {
      console.error("Failed to load Algo Plus background music:", {
        error: e,
        src: audio.src,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
    });

    // Function to attempt playing
    const tryPlay = () => {
      if (!audioRef.current || hasAttemptedAutoplay.current) return;

      audioRef.current.play()
        .then(() => {
          console.log("Algo Plus music started playing");
          setIsPlaying(true);
          hasAttemptedAutoplay.current = true;
        })
        .catch(() => {
          console.log("Autoplay blocked. Click the music button to play.");
        });
    };

    // Try to play after a short delay
    const playTimer = setTimeout(tryPlay, 1000);

    // Also try on first user interaction
    const handleInteraction = () => {
      tryPlay();
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });
    document.addEventListener("keydown", handleInteraction, { once: true });

    // Cleanup on unmount
    return () => {
      clearTimeout(playTimer);
      cleanup();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

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
