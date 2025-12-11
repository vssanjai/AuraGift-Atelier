// src/pages/OrderPreview.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function OrderPreview({ cart, totalAmount, changeQty, removeItem }) {
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div
        className="container page-with-header"
        style={{ padding: "0 20px 32px", maxWidth: 900 }}
      >
        <h2>Order Summary</h2>
        <p>Your cart is empty.</p>
        <button className="btn" onClick={() => navigate("/landing")}>
          Browse products
        </button>
      </div>
    );
  }

  return (
    <div
      className="container page-with-header"
      style={{ padding: "0 20px 32px", maxWidth: 900 }}
    >
      <h2>Order Summary</h2>

      <div
        style={{
          marginTop: 18,
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          padding: 18,
        }}
      >
        {cart.map((item) => {
          const qty = item.qty || 1;
          const lineTotal = qty * (item.price || 0);

          return (
            <div
              key={item.id}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                gap: 16,
                alignItems: "center",
              }}
            >
              {/* image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 12,
                  flexShrink: 0,
                }}
              />

              {/* info + controls */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                <div style={{ fontSize: 13, color: "#666", marginTop: 2 }}>
                  {item.short}
                </div>

                {/* qty + line total + remove */}
                <div
                  style={{
                    marginTop: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  {/* qty controls */}
                  <div className="qty-control">
                    <button
                      className="qty-btn"
                      type="button"
                      onClick={() => changeQty && changeQty(item.id, -1)}
                    >
                      –
                    </button>
                    <span className="qty-value">{qty}</span>
                    <button
                      className="qty-btn"
                      type="button"
                      onClick={() => changeQty && changeQty(item.id, +1)}
                    >
                      +
                    </button>
                  </div>

                  {/* line total */}
                  <div style={{ fontSize: 14 }}>
                    Qty: {qty} × ₹{item.price} ={" "}
                    <strong>₹{lineTotal}</strong>
                  </div>

                  {/* remove link */}
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => removeItem && removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Total row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 12,
            fontWeight: 600,
          }}
        >
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <button className="btn" onClick={() => navigate("/checkout")}>
            Proceed to Payment
          </button>

          <button
            className="btn small"
            onClick={() => navigate("/landing")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
