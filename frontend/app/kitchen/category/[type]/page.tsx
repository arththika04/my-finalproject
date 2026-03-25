"use client";

import { useParams } from "next/navigation";
import "./style.css";

export default function CategoryPage() {
  const params = useParams();
  const type = params.type as string;

  const foodData: any = {
    oats: [
      { name: "Oats Pittu", price: 500, img: "/oats-pittu.jpg" },
      { name: "Oats Smoothie", price: 350, img: "/oatssmoothie.jpg" },
      { name: "Oats Salad", price: 400, img: "/oatssalad.jpg" },
      { name: "Oats Porridge", price: 450, img: "/oatspridge.jpg" },
      { name: "Oats Idli", price: 300, img: "/oatsidli.jpg" },
      { name: "Oats Dosa", price: 350, img: "/oatsdosa.jpg" },
      { name: "Oats Upma", price: 400, img: "/oatsupma.jpg" },
      { name: "Oats Pancakes", price: 450, img: "/oatspancakes.jpg" },
      { name: "Oats Energy Balls", price: 300, img: "/oatsenergyballs.jpg" },
      { name: "Oats Muffins", price: 400, img: "/oatsmuffins.jpg" },
    
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
  <div className="category-page">

    <h1>{type.toUpperCase()} Foods</h1>

    <div className="food-grid">
      {foods.map((item: any, i: number) => (
        <div className="food-card" key={i}>
          <img src={item.img} />
          <h3>{item.name}</h3>
          <p>Rs. {item.price}</p>
        </div>
      ))}
    </div>

  </div>
);
}