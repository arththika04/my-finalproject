"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ServicesInteractive() {

  const router = useRouter();
  const [active,setActive] = useState(0)

  const services = [
    {
      title:"AI Diet Assistant",
      desc:"Generate personalized diet plans using AI.",
      image:"/ai.jpg",
      link:"/ai-assistant"
    },
    {
      title:"Dietician Consultation",
      desc:"Connect with certified nutrition experts for guidance.",
      image:"/dietician.jpg",
      link:"/dietician"
    },
    {
      title:"Dietary Kitchen",
      desc:"Order healthy meals prepared by our dietary kitchen.",
      image:"/kitchen.jpg",
      link:"/kitchen"
    },
    {
      title:"Meal Tracking & Analytics",
      desc:"Track calories and nutrition progress easily.",
      image:"/track.jpg",
      link:"/tracking"
    },
    {
      title:"Smart Reminders",
      desc:"Get reminders for meals and healthy habits.",
      image:"/reminder.jpg",
      link:"/reminders"
    }
  ]

  return (

    <section className="services-section">

      <h2 className="services-title">
        How SmartDiet Hub Helps You
      </h2>

      <div className="services-container">

        <div className="services-list">

          {services.map((service,index)=>{

            return(

              <div
                key={index}
                className={`service-item ${active===index ? "active":""}`}
                onMouseEnter={()=>setActive(index)}
                onClick={()=>router.push(service.link)}
              >

                <h3>{service.title}</h3>
                <p>{service.desc}</p>

              </div>

            )

          })}

        </div>

        <div className="services-image">

          <img
            src={services[active].image}
            alt={services[active].title}
          />

        </div>

      </div>

    </section>

  )

}