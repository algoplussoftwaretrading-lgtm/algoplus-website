import React, { useEffect, useRef } from "react";
import VideoButton from "../Video/VideoButton";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function BannerHomeSection() {

    const playerRef = useRef(null);
    const videoContainerRef = useRef(null);

    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            window.onYouTubeIframeAPIReady();
        }

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player("banner-video-background", {
                videoId: "P68V3iH4TeE",
                playerVars: {
                autoplay: 1,
                controls: 0,
                mute: 1,
                loop: 1,
                playlist: "P68V3iH4TeE",
                showInfo: 0,
                rel: 0,
                enableJsApi: 1,
                disableKb: 1,
                modestBranding: 1,
                iv_load_policy: 3,
                'origin': window.location.origin
                },
                events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
                }
            });
        };

        function onPlayerReady(event) {
            event.target.playVideo();
            setYoutubeSize();
            window.addEventListener("resize", setYoutubeSize);
        }

        function onPlayerStateChange(event) {
            if (event.data === window.YT.PlayerState.ENDED) {
                playerRef.current.playVideo();
            }
            if (event.data === window.YT.PlayerState.PLAYING) {
                playerRef.current.setPlaybackQuality("hd1080");
            }
        }

        function setYoutubeSize() {
            const container = videoContainerRef.current;
            if (!container || !playerRef.current?.getIframe) return;

            const containerWidth = container.offsetWidth;
            const containerHeight = container.offsetHeight;
            const aspectRatio = 16 / 9;

            let newWidth, newHeight;
            if (containerWidth / containerHeight > aspectRatio) {
                newWidth = containerWidth;
                newHeight = containerWidth / aspectRatio;
            } else {
                newWidth = containerHeight * aspectRatio;
                newHeight = containerHeight;
            }

            const iframe = playerRef.current.getIframe();
            iframe.style.width = `${newWidth}px`;
            iframe.style.height = `${newHeight}px`;
        }

        function handleYouTubeErrors() {
            window.addEventListener('message', function(event) {
                if (event.origin !== 'https://www.youtube.com') return;
            
                try {
                    var data = JSON.parse(event.data);
                   
                } catch (e) {
         
                }
            });
        }

        return () => {
            window.removeEventListener("resize", setYoutubeSize);
        };
    }, []);

    return (
        <div className="section-banner">
            <AnimateOnScroll animation="fadeInUp">
                <div
                    ref={videoContainerRef}
                    className="banner-video-container keep-dark"
                >
                    <div id="banner-video-background"></div>
                    <div className="hero-container position-relative">
                        <div className="d-flex flex-column gspace-2">
                            <AnimateOnScroll animation="slideInLeft" speed="normal">
                                <h1 className="title-heading-banner" style={{ background: 'none', WebkitTextFillColor: 'initial', color: 'white' }}>
                                    AI-Powered Solutions for Modern Enterprises
                                </h1>
                            </AnimateOnScroll>
                            <div className="banner-heading">

                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                    <div className="banner-video-content order-lg-1 order-2">
                                        <div className="d-flex flex-column flex-lg-row text-lg-start text-center align-items-center gspace-5">
                                            <VideoButton videoUrl="https://www.youtube.com/" />
                                            <p>
                                                Watch our video reviews and see how businesses achieve success
                                                with Algo Plus IT solutions.
                                            </p>
                                        </div>
                                    </div>
                                </AnimateOnScroll>

                                <AnimateOnScroll animation="fadeInRight" speed="normal">
                                    <div className="banner-content order-lg-2 order-1">
                                        <p style={{ fontSize: '20px', lineHeight: '1.6', color: '#dddddd' }}>
                                            From AI voice agents to enterprise security, we deliver technology solutions that drive growth, efficiency, and competitive advantage.
                                        </p>
                                        <div className="d-flex flex-md-row flex-column justify-content-center justify-content-lg-start align-self-center align-self-lg-start gspace-3">
                                            <a href="./about" className="btn btn-accent">
                                                <div className="btn-title">
                                                    <span>Who we are?</span>
                                                </div>
                                                <div className="icon-circle">
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </div>
                                            </a>
                                            
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </div>  
            </AnimateOnScroll>
        </div>
    );
}

export default BannerHomeSection;
