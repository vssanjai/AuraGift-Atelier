// src/components/Navbar.jsx
import React, { useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "../index.css";

export default function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  function goToSection(targetId) {
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(`#${targetId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 180);
    } else {
      const el = document.querySelector(`#${targetId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // iPhone-style: make header slightly more solid on scroll
  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    };

    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header" role="banner">
      <div className="container nav-inner">
        <div
          className="brand"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          AuraGift Atelier
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              goToSection("about");
            }}
          >
            About
          </a>

          <NavLink
            to="/landing"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Shop
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
