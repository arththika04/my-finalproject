"use client";

import { useState } from "react";

export default function ContactPage() {
  const [open, setOpen] = useState(false);

  return (
    <main className="contact-page">
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>Get in touch with Dietara</p>
      </section>

      {/* 3 line button */}

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            fontSize: "28px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      </div>

      {open && (
        <>
          {/* CONTACT DETAILS */}

          <div
            className="contact-card"
            style={{ maxWidth: "800px", margin: "auto", marginBottom: "40px" }}
          >
            <h2>Contact Details</h2>

            <p>
              <strong>Email:</strong> Dietara@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +94 77 123 4567
            </p>
            <p>
              <strong>Address:</strong> Jaffna, Sri Lanka
            </p>
            <p>
              <strong>Working Hours:</strong> Monday - Saturday 9AM - 8PM
            </p>
          </div>

          {/* FORM + MAP */}

          <section className="contact-grid">
            {/* FORM */}

            <div className="contact-card">
              <h2>Send Message</h2>

              <form>
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email Address" />
                <input type="text" placeholder="Subject" />
                <textarea placeholder="Your Message..." />
                <button type="submit">Send Message</button>
              </form>
            </div>

            {/* MAP */}

            <div className="contact-card">
              <h2>Our Location</h2>

              <iframe
                className="contact-map"
                src="https://www.google.com/maps?q=Colombo,Sri%20Lanka&output=embed"
                loading="lazy"
              />
            </div>
          </section>
        </>
      )}
    </main>
  );
}