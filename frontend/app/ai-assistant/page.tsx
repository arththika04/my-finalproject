"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./ai-assistant.css";

export default function AIAssistantPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("userToken") ||
      sessionStorage.getItem("token");

    if (!token) {
      alert("Please login or register first to access AI Diet Assistant.");
      router.replace("/login?next=/ai-assistant");
      return;
    }

    setAllowed(true);
  }, [router]);

  if (!allowed) {
    return null;
  }

  return (
    <div className="ai-page">
      <div className="ai-hero">
        <div className="ai-hero-text">
          <span className="ai-badge">AI Powered</span>
          <h1>AI Diet Assistant</h1>
          <p>
            Get smart, personalized diet guidance based on your goals,
            eating habits, and lifestyle.
          </p>

          <div className="ai-hero-buttons">
            <button className="ai-primary-btn">Start Now</button>
            <button className="ai-secondary-btn">View Suggestions</button>
          </div>
        </div>

        <div className="ai-hero-image">
          <img src="/ai.jpg" alt="AI Diet Assistant" />
        </div>
      </div>

      <div className="ai-features">
        <div className="ai-feature-card">
          <h3>Personalized Plans</h3>
          <p>
            Get meal suggestions tailored to your body goals and routine.
          </p>
        </div>

        <div className="ai-feature-card">
          <h3>Smart Recommendations</h3>
          <p>
            Receive healthy food alternatives and better diet choices.
          </p>
        </div>

        <div className="ai-feature-card">
          <h3>Daily Guidance</h3>
          <p>
            Track your meals and stay consistent with AI-powered support.
          </p>
        </div>
      </div>
    </div>
  );
}