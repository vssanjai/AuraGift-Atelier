// src/components/Hero.jsx
import React from "react";
import "../index.css";

export default function Hero({ onShopClick }) {
  return (
<div
  className="hero"
  style={{
    backgroundImage: `url("/hero.png")`,
    backgroundSize: "cover",
    backgroundPosition: "top center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#111",  // remove ugly empty space
    height: "75vh",           // adjust until looks perfect
    width: "100%",
  }}
>

    
      <div className="hero-content">
        
      </div>
    </div>
  );
}
