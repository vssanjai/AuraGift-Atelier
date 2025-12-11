// src/pages/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, changeQty, removeItem, onClose }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (s, it) => s + (it.price || 0) * (it.qty || 1),
    0
  );

  const goToCheckout = () => {
    navigate("/checkout");
    if (onClose) onClose && onClose();
  };

  return (
    <aside className="cart-panel">
      <h4>Your Cart</h4>

      {cart.length === 0 && <div>No items yet</div>}

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{item.name}</div>
            <div style={{ color: "#6b6b6b", fontSize: 13 }}>
              ₹{item.price} x {item.qty}
            </div>

            <div className="qty" style={{ marginTop: 8 }}>
              <button onClick={() => changeQty(item.id, -1)}>-</button>
              <div style={{ minWidth: 20, textAlign: "center" }}>
                {item.qty}
              </div>
              <button onClick={() => changeQty(item.id, +1)}>+</button>

              <button
                style={{
                  marginLeft: 10,
                  color: "#b00",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <div
            style={{
              marginTop: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>Subtotal</strong>
            <strong>₹{subtotal}</strong>
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button className="btn" onClick={goToCheckout}>
              Checkout
            </button>
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
