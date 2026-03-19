"use client";

import "./reminder.css";
import { useEffect, useMemo, useState } from "react";

type MealStatus = "done" | "upcoming" | "missed";

type MealItem = {
  name: string;
  time: string;
  status: MealStatus;
};

export default function ReminderPage() {
  const [waterIntake, setWaterIntake] = useState(1.5);
  const [waterGoal] = useState(3);
  const [currentTime, setCurrentTime] = useState("");

  const [weightGoal] = useState(60);
  const [currentWeight, setCurrentWeight] = useState(64.2);

  const [meals, setMeals] = useState<MealItem[]>([
    { name: "Breakfast", time: "08:00", status: "done" },
    { name: "Lunch", time: "13:00", status: "upcoming" },
    { name: "Dinner", time: "19:30", status: "upcoming" },
  ]);

  const [lastWaterReminder, setLastWaterReminder] = useState<number | null>(null);
  const [notifiedMeals, setNotifiedMeals] = useState<string[]>([]);

  const waterPercent = useMemo(() => {
    return Math.min((waterIntake / waterGoal) * 100, 100);
  }, [waterIntake, waterGoal]);

  const weightDifference = useMemo(() => {
    return (currentWeight - weightGoal).toFixed(1);
  }, [currentWeight, weightGoal]);

  const nextMeal = useMemo(() => {
    return meals.find((meal) => meal.status === "upcoming");
  }, [meals]);

  const requestNotificationPermission = async () => {
    if ("Notification" in window && Notification.permission === "default") {
      try {
        await Notification.requestPermission();
      } catch (error) {
        console.log("Notification permission error:", error);
      }
    }
  };

  const showBrowserNotification = (title: string, body: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  const handleDrinkWater = () => {
    setWaterIntake((prev) => Math.min(prev + 0.25, waterGoal));
  };

  const handleResetWater = () => {
    setWaterIntake(0);
  };

  const markMealDone = (mealName: string) => {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.name === mealName ? { ...meal, status: "done" } : meal
      )
    );
  };

  const markMealMissed = (mealName: string) => {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.name === mealName ? { ...meal, status: "missed" } : meal
      )
    );
  };

  const handleWeightUpdate = () => {
    setCurrentWeight((prev) => Number((prev - 0.2).toFixed(1)));
  };

  useEffect(() => {
    requestNotificationPermission();

    const savedWaterReminder = localStorage.getItem("lastWaterReminder");
    const savedMealNotifications = localStorage.getItem("notifiedMeals");

    if (savedWaterReminder) {
      setLastWaterReminder(Number(savedWaterReminder));
    }

    if (savedMealNotifications) {
      setNotifiedMeals(JSON.parse(savedMealNotifications));
    }
  }, []);

  useEffect(() => {
    if (lastWaterReminder !== null) {
      localStorage.setItem("lastWaterReminder", String(lastWaterReminder));
    }
  }, [lastWaterReminder]);

  useEffect(() => {
    localStorage.setItem("notifiedMeals", JSON.stringify(notifiedMeals));
  }, [notifiedMeals]);

  useEffect(() => {
    const updateNow = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;

      setCurrentTime(formattedTime);

      const nowTimestamp = Date.now();
      const twentyMinutes = 20 * 60 * 1000;

      if (
        lastWaterReminder === null ||
        nowTimestamp - lastWaterReminder >= twentyMinutes
      ) {
        showBrowserNotification("Water Reminder 💧", "Time to drink some water.");
        setLastWaterReminder(nowTimestamp);
      }

      meals.forEach((meal) => {
        if (
          meal.time === formattedTime &&
          meal.status === "upcoming" &&
          !notifiedMeals.includes(meal.name)
        ) {
          showBrowserNotification(
            `${meal.name} Reminder 🍽️`,
            `It's time for ${meal.name}.`
          );
          setNotifiedMeals((prev) => [...prev, meal.name]);
        }
      });
    };

    updateNow();
    const interval = setInterval(updateNow, 60000);

    return () => clearInterval(interval);
  }, [lastWaterReminder, meals, notifiedMeals]);

  return (
    <main className="reminder-page">
      <div className="reminder-bg-glow reminder-bg-glow-1" />
      <div className="reminder-bg-glow reminder-bg-glow-2" />

      <section className="reminder-shell">
        <header className="reminder-hero">
          <div className="hero-left">
            <div className="hero-badge">Smart Reminder System</div>
            <h1>
              Your Daily <span>Health Reminders</span>
            </h1>
            <p>
              Water intake, meal timing and weight loss reminders in a premium
              futuristic UI.
            </p>
            <div className="live-time-box">
              Current Time: {currentTime || "--:--"}
            </div>
          </div>

          <div className="hero-orb-wrap">
            <div className="hero-orb-core" />
            <div className="hero-orb-ring hero-orb-ring-1" />
            <div className="hero-orb-ring hero-orb-ring-2" />
            <div className="hero-orb-ring hero-orb-ring-3" />
          </div>
        </header>

        <section className="top-status-grid">
          <div className="mini-card">
            <span className="mini-label">Today’s Focus</span>
            <strong>Consistency</strong>
          </div>

          <div className="mini-card">
            <span className="mini-label">Next Reminder</span>
            <strong>{nextMeal ? `${nextMeal.name} - ${nextMeal.time}` : "All Done"}</strong>
          </div>

          <div className="mini-card">
            <span className="mini-label">Weight Goal</span>
            <strong>{weightGoal} kg</strong>
          </div>
        </section>

        <section className="reminder-grid">
          <article className="reminder-card water-card">
            <div className="card-top">
              <div>
                <span className="card-kicker">Hydration</span>
                <h2>Water Intake</h2>
              </div>
              <div className="glow-icon">💧</div>
            </div>

            <div className="big-stat-row">
              <div>
                <h3>{waterIntake.toFixed(2)}L</h3>
                <p>of {waterGoal}L goal</p>
              </div>
              <div className="circle-stat">
                <span>{Math.round(waterPercent)}%</span>
              </div>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill water-fill"
                style={{ width: `${waterPercent}%` }}
              />
            </div>

            <div className="sub-info-row">
              <span>Auto reminder every 20 mins</span>
              <span>Small steps matter</span>
            </div>

            <div className="action-row">
              <button className="primary-btn-reminder" onClick={handleDrinkWater}>
                Drink Now
              </button>
              <button className="secondary-btn-reminder" onClick={handleResetWater}>
                Reset
              </button>
            </div>
          </article>

          <article className="reminder-card meal-card">
            <div className="card-top">
              <div>
                <span className="card-kicker">Nutrition</span>
                <h2>Meal Time Reminder</h2>
              </div>
              <div className="glow-icon">🍽️</div>
            </div>

            <div className="meal-list">
              {meals.map((meal) => (
                <div className="meal-item-neo" key={meal.name}>
                  <div className="meal-left">
                    <div
                      className={`meal-status-dot ${
                        meal.status === "done"
                          ? "status-done"
                          : meal.status === "missed"
                          ? "status-missed"
                          : "status-upcoming"
                      }`}
                    />
                    <div>
                      <h4>{meal.name}</h4>
                      <p>{meal.time}</p>
                    </div>
                  </div>

                  <div className="meal-right">
                    <span
                      className={`meal-status-pill ${
                        meal.status === "done"
                          ? "pill-done"
                          : meal.status === "missed"
                          ? "pill-missed"
                          : "pill-upcoming"
                      }`}
                    >
                      {meal.status}
                    </span>

                    {meal.status !== "done" && (
                      <button
                        className="tiny-action-btn"
                        onClick={() => markMealDone(meal.name)}
                      >
                        Done
                      </button>
                    )}

                    {meal.status === "upcoming" && (
                      <button
                        className="tiny-action-btn tiny-danger"
                        onClick={() => markMealMissed(meal.name)}
                      >
                        Miss
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="reminder-card weight-card">
            <div className="card-top">
              <div>
                <span className="card-kicker">Progress</span>
                <h2>Weight Loss Goal</h2>
              </div>
              <div className="glow-icon">⚖️</div>
            </div>

            <div className="weight-panel">
              <div className="weight-box">
                <span>Current</span>
                <strong>{currentWeight.toFixed(1)} kg</strong>
              </div>

              <div className="weight-box">
                <span>Target</span>
                <strong>{weightGoal} kg</strong>
              </div>
            </div>

            <div className="weight-highlight">
              <p>You are</p>
              <h3>{weightDifference} kg away</h3>
              <span>Stay on track with your meals and water intake</span>
            </div>

            <div className="action-row">
              <button className="primary-btn-reminder" onClick={handleWeightUpdate}>
                Update Progress
              </button>
              <button className="secondary-btn-reminder">View Plan</button>
            </div>
          </article>
        </section>

        <div className="floating-ai-btn" title="AI Assistant">
          ✦
        </div>
      </section>
    </main>
  );
}