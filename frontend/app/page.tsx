"use client";

import Link from "next/link";
import { useEffect } from "react";
import ServicesInteractive from "@/components/ServicesInteractive";
import BMICalculator from "@/components/BMICalculator";

export default function HomePage() {

  useEffect(() => {

    const existingScript = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

  }, []);

  return (
    <main className="fitness-home">

      {/* HERO SECTION */}

      <section className="hero-section">

        <div className="hero-overlay">

          <div className="hero-content">

            <div className="hero-text">

              <h1>Transform Your Diet & Health</h1>

              <p>
                Achieve your nutrition goals with customized meal plans,
                expert dietician advice, and a healthier lifestyle tailored
                for you.
              </p>

              <div className="hero-buttons">
                <Link href="/register" className="primary-btn">
                  Get Started
                </Link>
              </div>

              <div className="hero-stats">

                <div className="stat-box">
                  <h2>500+</h2>
                  <p>Active Members</p>
                </div>

                <div className="stat-box">
                  <h2>50+</h2>
                  <p>Expert Dieticians</p>
                </div>

                <div className="stat-box">
                  <h2>100+</h2>
                  <p>Healthy Plans</p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* WHY CHOOSE US */}

      <section className="why-section">

        <div className="why-title">
          <h2>Why Choose Us</h2>

          <p>
            Dietara helps you build healthier eating habits with expert
            guidance, smart tracking, and quality meal support.
          </p>
        </div>

        <div className="why-container">

          <div className="why-left">

            <div className="why-card">
              <div className="why-icon">🥗</div>
              <h3>Customized Plans</h3>
              <p>
                Customized meal plans based on your health goals.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">👩‍⚕️</div>
              <h3>Expert Dieticians</h3>
              <p>
                Get trusted advice from certified nutrition professionals.
              </p>
            </div>

          </div>

          <div className="why-center">
            <div className="why-logo">
              <img src="/logo.png" alt="Dietara Logo"/>
            </div>
          </div>

          <div className="why-right">

            <div className="why-card">
              <div className="why-icon">📊</div>
              <h3>Smart Tracking</h3>
              <p>
                Track your meals and progress easily.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">🍲</div>
              <h3>Healthy Kitchen</h3>
              <p>
                Enjoy balanced meals prepared with care.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* SERVICES SECTION */}

      <ServicesInteractive />


      {/* BMI CALCULATOR */}

      <BMICalculator />


      {/* CONTENT SECTION */}

      <section className="landing-sections">

        <div className="content-grid">

          <div className="content-card large-card">

            <h2>⚠ Dangers of Unhealthy Eating</h2>

            <div className="video-box">

              <video controls className="danger-video">

                <source src="/junk-food.mp4" type="video/mp4"/>

              </video>

            </div>

            <p>
              Learn how unhealthy food affects your body and long-term health.
            </p>

          </div>


          <div className="content-card side-card">

            <h2>Dietary Kitchen Food Videos</h2>

            <p className="orange-text">Instagram Post</p>

            <div className="insta-card">

              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/p/DV5qJ_SiVy6/"
                data-instgrm-version="14"
                style={{
                  background:"#FFF",
                  border:0,
                  borderRadius:"16px",
                  margin:0,
                  width:"100%"
                }}
              />

            </div>

          </div>

        </div>


        {/* ORDER SECTION */}

        <div className="content-card order-card">

          <div className="order-text">

            <h2>🍽 Order Healthy Meals</h2>

            <h3>Dietary Kitchen Prepares</h3>

            <p>Healthy meals delivered to your door.</p>

            <Link href="/kitchen">
              <button className="order-btn">
                Order Now
              </button>
            </Link>

          </div>

          <div className="order-illustration">
            🍲
          </div>

        </div>

      </section>

    </main>
  );
}