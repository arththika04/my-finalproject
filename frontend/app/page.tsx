"use client";

import { useEffect, useState } from "react";

import ServicesInteractive from "@/components/ServicesInteractive";
import BMICalculator from "@/components/BMICalculator";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { isLoginOpen, openLogin, closeLogin } = useAuth();

  const [split, setSplit] = useState(false);
  const [hideIntro, setHideIntro] = useState(false);

  // 🔥 SPLIT ANIMATION
  useEffect(() => {
    const t1 = setTimeout(() => setSplit(true), 1500);
    const t2 = setTimeout(() => setHideIntro(true), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <AuthModal isOpen={isLoginOpen} onClose={closeLogin} />

      {/* 🔥 INTRO SPLIT OVERLAY */}
      {!hideIntro && (
        <div className={`intro-wrapper ${split ? "split" : ""}`}>
          <div className="intro-left"></div>
          <div className="intro-right"></div>
        </div>
      )}

      {/* 🔥 MAIN PAGE (ALREADY LOADED) */}
      <main className="fitness-home">
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

                <button className="primary-btn" onClick={openLogin}>
                  Get Started
                </button>

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

        <ServicesInteractive />
        <BMICalculator />
      </main>
    </>
  );
}