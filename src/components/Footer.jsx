// src/components/Footer.jsx
import React from "react";
import "../index.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">AuraGift Atelier</div>
        <p className="footer-text">
          Curated gifting made personal. Every gift tells a story.
        </p>
        <p className="footer-copy">
          © {new Date().getFullYear()} AuraGift Atelier. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
