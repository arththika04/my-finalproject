"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import "./about.css";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="premium-about">

        {/* LEFT */}
        <div className="about-left">
          <h1>
            AESTHETICS <br />
            COMPLEMENT
          </h1>

          <h2>COMFORT</h2>

          {/* CARDS ADD HERE */}
          <div className="about-cards">

            <div className="card">
              <h3>AI Diet Planning</h3>
              <p>
                Personalized meal plans using AI based on your health goals.
              </p>
            </div>

            <div className="card">
              <h3>Expert Dieticians</h3>
              <p>
                Get guidance from certified nutrition experts anytime.
              </p>
            </div>

            <div className="card">
              <h3>Healthy Kitchen</h3>
              <p>
                Fresh meals prepared according to your diet plan.
              </p>
            </div>

            <div className="card">
              <h3>Smart Tracking</h3>
              <p>
                Track calories, meals, and progress easily.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGES (UNCHANGED) */}
        <div className="about-images">

          <div className="img img1">
            <Image src="/plate.jpg" alt="Healthy Meal" fill className="img-fit" />
          </div>

          <div className="img img2">
            <Image src="/plate2.jpg" alt="Diet Food" fill className="img-fit" />
          </div>

          <div className="img img3">
            <Image src="/plate3.jpg" alt="Meal Plan" fill className="img-fit" />
          </div>

        </div>

      </section>
    </>
  );
}

