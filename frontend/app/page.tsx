"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process: () => void;
      };
    };
  }
}

export default function HomePage() {

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const instagramPostLink = "https://www.instagram.com/p/DV5qJ_SiVy6/";

  /* HERO IMAGE SLIDER */

  const heroImages = [
    "/hero1.jpg",
    "/hero2.jpg",
    "/hero3.jpg",
    "/hero4.jpg",
    "/hero5.jpg"
  ];

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {

    const slider = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(slider);

  }, []);

  /* INSTAGRAM EMBED */

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.instgrm?.Embeds?.process) {
        window.instgrm.Embeds.process();
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.instgrm?.Embeds?.process) {
            window.instgrm.Embeds.process();
          }
        }}
      />

      <main className="landing-page">

        {/* HERO SECTION */}

        <section className="hero-banner">

          <div className="hero-text">
            <h1>Is Your Diet Healthy?</h1>
            <p>Find out how unhealthy food affects your body</p>

            <Link href="/quiz" className="landing-btn">
              Take Quiz
            </Link>
          </div>

          <div className="hero-image">
            <Image
              src={heroImages[heroIndex]}
              alt="Healthy diet"
              width={520}
              height={360}
              priority
              className="hero-slider-img"
            />
          </div>

        </section>

        {/* CONTENT GRID */}

        <section className="content-grid">

          <div className="left-column">

            {/* VIDEO CARD */}

            <div className="card large-card">

              <h2>⚠ Dangers of Unhealthy Eating</h2>

              <div className="video-card large-video">

                <video
                  ref={videoRef}
                  muted
                  playsInline
                  controls={isPlaying}
                  className="custom-video"
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="/junk-food.mp4" type="video/mp4" />
                </video>

                {!isPlaying && (
                  <button
                    type="button"
                    className="play-circle"
                    onClick={handlePlayVideo}
                    aria-label="Play video"
                  >
                    ▶
                  </button>
                )}

              </div>

              <p className="card-description">
                Learn how unhealthy food affects your body and long-term health.
              </p>

            </div>

            {/* ORDER CARD */}

            <div className="card order-card">

              <div className="order-content">

                <div>

                  <h2>🍽 Order Healthy Meals</h2>
                  <h3>Dietary Kitchen Prepares</h3>
                  <p>Healthy meals delivered to your door.</p>

                  <Link href="/order" className="landing-btn small-btn">
                    Order Now
                  </Link>

                </div>

                <div className="meal-illustration">
                  <div className="plate-base"></div>
                  <div className="food-cover"></div>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT COLUMN */}

          <div className="right-column">

            <div className="card side-card">

              <h2>Dietary Kitchen Food Videos</h2>
              <span className="post-label">Instagram Post</span>

              <div className="instagram-embed-wrap">

                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink={instagramPostLink}
                  data-instgrm-version="14"
                  style={{
                    background: "#fff",
                    border: 0,
                    borderRadius: "18px",
                    margin: 0,
                    maxWidth: "100%",
                    minWidth: "100%",
                    width: "100%",
                  }}
                ></blockquote>

              </div>

              <p className="card-description">
                See the original Instagram post directly on this page.
              </p>

              <a
                href={instagramPostLink}
                target="_blank"
                rel="noopener noreferrer"
                className="landing-btn small-btn"
              >
                View Post
              </a>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}