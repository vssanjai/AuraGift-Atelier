// src/components/HowItWorks.jsx
import React, { useEffect, useRef, useState } from "react";
import "../index.css";

const STEPS = [
  { id: 1, title: "Concept", text: "We sketch and refine the idea together." },
  { id: 2, title: "Research", text: "Materials, colours and personalised options are chosen." },
  { id: 3, title: "Strategy", text: "We plan production and estimate lead time." },
  { id: 4, title: "Teamwork", text: "Our artisans craft your item with care." },
  { id: 5, title: "Management", text: "We package and prepare shipping." },
  { id: 6, title: "Success", text: "Your gift arrives — a story delivered." },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how" className="how-section" ref={ref}>
      <div className="container">
        <h2 className="how-title">How It Works</h2>
        <p className="how-sub">A calm, clear process from concept to gifting.</p>

        <div className={`timeline ${visible ? "visible" : ""}`}>
          {/* vertical connecting line */}
          <div className="timeline-line" />

          {STEPS.map((s, idx) => (
            <div key={s.id} className={`timeline-item ${idx % 2 === 0 ? "left" : "right"}`}>
              <div className="timeline-marker" aria-hidden>
                {/* simple icon using SVG (gift-like / gear / target) */}
                <svg viewBox="0 0 24 24" className="marker-icon" aria-hidden>
                  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="0"/>
                </svg>
              </div>

              <div className="timeline-card">
                <div className="timeline-card-head">
                  <div className="step-num">0{s.id}</div>
                  <h3>{s.title}</h3>
                </div>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
