// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import OrderPreview from "./pages/OrderPreview";

import "./index.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCartPanel, setShowCartPanel] = useState(false);

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  const totalCount = cart.reduce((s, it) => s + (it.qty || 0), 0);
  const totalAmount = cart.reduce(
    (s, it) => s + (it.qty || 0) * (it.price || 0),
    0
  );

  return (
    <Router>
      <Navbar cartCount={totalCount} />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Hero
                onShopClick={() => {
                  window.location.href = "/landing";
                }}
              />
              <section
                id="about"
                className="container"
                style={{ padding: "48px 20px" }}
              >
                <h2>About Us</h2>
                <p style={{ maxWidth: 820 }}>
                  AuraGift Atelier crafts thoughtful, handmade and curated
                  gifts. We design each product with care so every gift tells a
                  story — personal, memorable and beautifully packaged.
                </p>
              </section>
              <HowItWorks />
              <div className="container" style={{ padding: "28px 20px" }}>
                <Link
                  to="/landing"
                  className="btn"
                  style={{ textDecoration: "none" }}
                >
                  Explore Categories
                </Link>
              </div>
            </>
          }
        />

        <Route path="/landing" element={<Landing onAdd={addToCart} />} />

        <Route
          path="/category/:slug"
          element={<CategoryPage onAdd={addToCart} />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetail onAdd={addToCart} />}
        />

        {/* 🔹 order preview uses cart + totalAmount */}
        <Route
  path="/order-preview"
  element={
    <OrderPreview
      cart={cart}
      totalAmount={totalAmount}
      changeQty={changeQty}
      removeItem={removeItem}
    />
  }
/>


        <Route
          path="/cart"
          element={
            <div
              className="container page-with-header"
              style={{ padding: "0 20px 28px" }}
            >
              <h2>Your Cart</h2>
              <Cart
                cart={cart}
                changeQty={changeQty}
                removeItem={removeItem}
                onClose={() => {}}
              />
            </div>
          }
        />

        <Route
          path="/checkout"
          element={<Checkout cart={cart} totalAmount={totalAmount} />}
        />
      </Routes>

      {/* Floating cart button */}
      <button
        onClick={() => setShowCartPanel((v) => !v)}
        className="floating-cart"
        aria-label={`Open cart (${totalCount})`}
        title="Open cart"
      >
        Cart ({totalCount})
      </button>

      {/* Floating cart panel */}
      {showCartPanel && (
        <div
          style={{ position: "fixed", right: 20, bottom: 80, zIndex: 1200 }}
        >
          <Cart
            cart={cart}
            changeQty={changeQty}
            removeItem={removeItem}
            onClose={() => setShowCartPanel(false)}
          />
        </div>
      )}

      <Footer />
    </Router>
  );
}
