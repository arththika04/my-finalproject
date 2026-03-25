"use client";

import "./kitchen.css";
import { Cinzel_Decorative } from "next/font/google";
import { useRouter } from "next/navigation";

const font = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function KitchenPage() {
  const router = useRouter();

  // 🔥 SCROLL FUNCTION
  const scrollToMenu = () => {
    const el = document.getElementById("menu-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // 🔥 CATEGORY LIST
  const categories = [
    { name: "Oats related foods", img: "/oats-cover.jpg", path: "oats" },
    { name: "Kurakkan related foods", img: "/kurakkan.jpg", path: "kurakkan" },
    { name: "Rice related foods", img: "/rice.jpg", path: "rice" },
    { name: "Aval related foods", img: "/aval.jpg", path: "aval" },
    { name: "Egg related foods", img: "/egg.jpg", path: "egg" },
    { name: "Cowpea related foods", img: "/cowpea.jpg", path: "cowpea" },
    { name: "Kadala related foods", img: "/kadala.jpg", path: "kadala" },
    { name: "Payaru related foods", img: "/payaru.jpg", path: "payaru" },
  ];

  return (
    <div>

      {/* 🔥 HERO SECTION */}
      <section className="hero">
        <div className="overlay">

          <div className="swirl">~ ~ ~</div>

          <div className="utensils">
            <svg className="fork" viewBox="0 0 64 64">
              <path
                d="M20 2v20M26 2v20M32 2v20M38 2v20M20 22c0 8 6 8 6 8v32"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            <svg className="knife" viewBox="0 0 64 64">
              <path
                d="M44 2c-8 8-14 20-14 30v30"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          <h1 className={`title ${font.className}`}>
            DIETARA <br /> KITCHEN
          </h1>

          {/* ✅ SCROLL BUTTON */}
          <button className="hero-btn" onClick={scrollToMenu}>
            Start Your Plan
          </button>

        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section id="menu-section" className="menu-page">

        <h1>Choose Category</h1>

        <div className="grid">
          {categories.map((cat, i) => (
            <div className="card" key={i}>
              <img src={cat.img} alt={cat.name} />

              <h2>{cat.name}</h2>

              {/* NAVIGATION BUTTON */}
              <button
                onClick={() =>
                  router.push(`/kitchen/category/${cat.path}`)
                }
              >
                Show Foods
              </button>

            </div>
          ))}
        </div>

      </section>

    </div>
  );
}