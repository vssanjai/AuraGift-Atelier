// src/pages/Checkout.jsx
import React, { useState } from "react";
import "../index.css";

export default function Checkout({ cart, totalAmount }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "gpay", // "gpay" or "cod"
  });

  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [showBill, setShowBill] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const canGenerateBill =
    form.payment === "cod" || (form.payment === "gpay" && paymentConfirmed);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cart.length) return;
    if (!canGenerateBill) return;
    setShowBill(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const orderId = `AURA-${Date.now().toString().slice(-6)}`;
  const today = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
<div
  className="container page-with-header"
  style={{ padding: "0 20px 32px", maxWidth: 900 }}
>      <h1 style={{ marginBottom: 16 }}>Checkout</h1>

      {!cart.length && <p>Your cart is empty. Please add some products first.</p>}

      {cart.length > 0 && (
        <>
          {/* ---------- FORM ---------- */}
          <form
            onSubmit={handleSubmit}
            className="checkout-form"
            style={{ display: "grid", gap: 16, marginBottom: 32 }}
          >
            <div>
              <label className="label">Name</label>
              <input
                className="input"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">Phone</label>
              <input
                className="input"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">Address</label>
              <textarea
                className="input"
                name="address"
                rows="3"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label">Payment Method</label>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  marginTop: 8,
                  flexWrap: "wrap",
                }}
              >
                <label className="radio-pill">
                  <input
                    type="radio"
                    name="payment"
                    value="gpay"
                    checked={form.payment === "gpay"}
                    onChange={(e) => {
                      handleChange(e);
                      setPaymentConfirmed(false);
                    }}
                  />
                  <span>Google Pay / UPI</span>
                </label>

                <label className="radio-pill">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={form.payment === "cod"}
                    onChange={(e) => {
                      handleChange(e);
                      setPaymentConfirmed(false);
                    }}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              {/* ---- GPay QR + confirmation ---- */}
              {form.payment === "gpay" && (
                <div className="gpay-section">
                  <p className="hint">
                    Scan this QR using Google Pay / any UPI app and complete
                    the payment.
                  </p>

                  <img
                    src="/gpay-qr-code.webp"
                    alt="GPay QR code"
                    className="gpay-qr"
                  />

                  <div style={{ marginTop: 10 }}>
                    <label className="label" style={{ marginBottom: 4 }}>
                      UPI Transaction ID (optional)
                    </label>
                    <input
                      className="input"
                      value={txnId}
                      onChange={(e) => setTxnId(e.target.value)}
                      placeholder="Example: 324567890123"
                    />
                  </div>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 8,
                      fontSize: "0.85rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={paymentConfirmed}
                      onChange={(e) =>
                        setPaymentConfirmed(e.target.checked)
                      }
                    />
                    <span>I have completed the payment in my UPI app.</span>
                  </label>

                  <p className="hint" style={{ marginTop: 8 }}>
                    We will verify the payment in our GPay account using this
                    ID / your name.
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn"
              style={{
                alignSelf: "flex-start",
                marginTop: 8,
                opacity: canGenerateBill ? 1 : 0.6,
              }}
              disabled={!canGenerateBill}
            >
              Generate e-Bill
            </button>
          </form>

          {/* ---------- E-BILL ---------- */}
          {showBill && (
            <div
              className="bill-card"
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <div>
                  <h3 style={{ margin: 0 }}>AuraGift Atelier</h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "#666",
                    }}
                  >
                    Order Invoice
                  </p>
                </div>
                <div style={{ textAlign: "right", fontSize: 14 }}>
                  <div>Order ID: {orderId}</div>
                  <div>{today}</div>
                </div>
              </div>

              <hr style={{ margin: "12px 0 18px" }} />

              <div style={{ fontSize: 14, marginBottom: 16 }}>
                <strong>Customer:</strong> {form.name}
                <br />
                <strong>Phone:</strong> {form.phone}
                <br />
                <strong>Address:</strong> {form.address}
                <br />
                <strong>Payment:</strong>{" "}
                {form.payment === "gpay"
                  ? "Google Pay / UPI"
                  : "Cash on Delivery"}
                <br />
                <strong>Status:</strong>{" "}
                {form.payment === "gpay"
                  ? "Paid via GPay – pending our verification"
                  : "To be collected on delivery"}
                {form.payment === "gpay" && txnId && (
                  <>
                    <br />
                    <strong>Txn ID:</strong> {txnId}
                  </>
                )}
              </div>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                  marginBottom: 16,
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        paddingBottom: 8,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      Item
                    </th>
                    <th
                      style={{
                        textAlign: "center",
                        paddingBottom: 8,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      Qty
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        paddingBottom: 8,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      Price
                    </th>
                    <th
                      style={{
                        textAlign: "right",
                        paddingBottom: 8,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const qty = item.qty || 1;
                    const lineTotal = qty * (item.price || 0);
                    return (
                      <tr key={item.id}>
                        <td style={{ padding: "8px 0" }}>{item.name}</td>
                        <td
                          style={{
                            textAlign: "center",
                            padding: "8px 0",
                          }}
                        >
                          {qty}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "8px 0",
                          }}
                        >
                          ₹{item.price}
                        </td>
                        <td
                          style={{
                            textAlign: "right",
                            padding: "8px 0",
                          }}
                        >
                          ₹{lineTotal}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan="3"
                      style={{ textAlign: "right", paddingTop: 8 }}
                    >
                      <strong>Total</strong>
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        paddingTop: 8,
                      }}
                    >
                      <strong>₹{totalAmount}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>

              <p style={{ fontSize: 12, color: "#777" }}>
                Thank you for shopping with AuraGift Atelier ✨ This e-bill can
                be used as proof of purchase.
              </p>

              <button className="btn small no-print" onClick={handlePrint}>
                Print / Save as PDF
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
