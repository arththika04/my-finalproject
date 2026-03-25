"use client";

import { useParams } from "next/navigation";
import "./style.css";

export default function CategoryPage() {
  const params = useParams();
  const type = params.type as string;

  const foodData: any = {
    oats: [
      { name: "Oats Pittu", price: 500, img: "/oats-pittu.jpg" },
      { name: "Oats Smoothie", price: 350, img: "/oats2.jpg" },
    ],

    kurakkan: [
      { name: "Kurakkan Pittu", price: 450, img: "/kurakkan.jpg" },
    ],

    rice: [
      { name: "Brown Rice Meal", price: 600, img: "/rice.jpg" },
    ],

    aval: [
      { name: "Aval Mix", price: 300, img: "/aval.jpg" },
    ],

    egg: [
      { name: "Egg Bowl", price: 400, img: "/egg.jpg" },
    ],

    cowpea: [
      { name: "Cowpea Salad", price: 350, img: "/cowpea.jpg" },
    ],

    kadala: [
      { name: "Kadala Curry", price: 400, img: "/kadala.jpg" },
    ],

    payaru: [
      { name: "Green Gram Bowl", price: 380, img: "/payaru.jpg" },
    ],
  };

  const foods = foodData[type] || [];

  return (
    <div className="food-page">

      <h1>{type.toUpperCase()} Foods</h1>

      <div className="grid">
        {foods.map((item: any, i: number) => (
          <div className="card" key={i}>
            <img src={item.img} />
            <h2>{item.name}</h2>
            <p>Rs. {item.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
}