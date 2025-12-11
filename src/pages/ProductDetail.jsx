// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PRODUCTS from "../data/products";
import "../index.css";

// ---- Demo starting reviews for specific products ----
// Use the same ids that you have in src/data/products.js
const INITIAL_REVIEWS = {
  "keychain-1": [
    {
      id: 1,
      name: "Aaradhya",
      rating: 5,
      text: "So cute and perfectly packed. Loved the mini details!",
      media: null,
    },
    {
      id: 2,
      name: "Rohit",
      rating: 4,
      text: "Nice quality keychain, feels sturdy.",
      media: null,
    },
  ],
  "keychain-2": [
    {
      id: 3,
      name: "Meera",
      rating: 5,
      text: "Leather feels premium, perfect as a gift.",
      media: null,
    },
  ],
  "bracelet-1": [
    {
      id: 4,
      name: "Ananya",
      rating: 5,
      text: "Bracelet is so elegant and fits perfectly.",
      media: null,
    },
  ],
  // you can add more product ids here if you want:
  // "keychain-3": [ ... ],
  // "postcard-1": [ ... ],
};

export default function ProductDetail({ onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === id);

  // reviews are now per product id
  const [reviews, setReviews] = useState(INITIAL_REVIEWS[id] || []);

  // whenever URL changes to another product, load that product's reviews
  useEffect(() => {
    setReviews(INITIAL_REVIEWS[id] || []);
  }, [id]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    text: "",
    media: null,
    mediaUrl: "",
  });

  if (!product) {
    return (
      <div
        className="container page-with-header"
        style={{ padding: "0 20px 32px", maxWidth: 1100 }}
      >
        <p>Product not found.</p>
        <button className="btn" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    );
  }

  // recommended products (same category)
  const recommended = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleMediaChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setNewReview((prev) => ({ ...prev, media: file, mediaUrl: url }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    setReviews((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newReview.name,
        rating: Number(newReview.rating),
        text: newReview.text,
        media: newReview.mediaUrl,
      },
    ]);

    // reset form
    setNewReview({
      name: "",
      rating: 5,
      text: "",
      media: null,
      mediaUrl: "",
    });
  };

  const avgRating =
    reviews.length === 0
      ? 0
      : (
          reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length
        ).toFixed(1);

  return (
    <div
      className="container page-with-header"
      style={{ padding: "0 20px 32px", maxWidth: 1100 }}
    >
      {/* back link */}
      <button
        className="link-btn no-print"
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        ← Back to products
      </button>

      <div className="product-detail">
        {/* left: big image */}
        <div className="pd-image-wrapper">
          <img src={product.image} alt={product.name} className="pd-image" />
        </div>

        {/* right: details */}
        <div className="pd-info">
          <h2 className="pd-title">{product.name}</h2>
          <p className="pd-short">{product.short}</p>

          <div className="pd-rating">
            {avgRating > 0 && (
              <>
                <span className="pd-rating-badge">★ {avgRating} / 5</span>
                <span className="pd-rating-count">
                  ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
                </span>
              </>
            )}
          </div>

          <div className="pd-price-row">
            <div className="pd-price">₹{product.price}</div>
          </div>

          <ul className="pd-points">
            <li>Handpicked & packed by AuraGift Atelier.</li>
            <li>Perfect for gifting and personal use.</li>
            <li>Secure packaging to avoid damage in transit.</li>
          </ul>

          <button
            className="btn"
            onClick={() => {
              onAdd(product);
              navigate("/order-preview");
            }}
            style={{ marginTop: 12 }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <section className="pd-reviews">
        <h3>Customer Reviews</h3>

        {reviews.length === 0 && (
          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            No reviews yet. Be the first to review this product!
          </p>
        )}

        <div className="pd-review-list">
          {reviews.map((r) => (
            <div key={r.id} className="pd-review-card">
              <div className="pd-review-header">
                <strong>{r.name}</strong>
                <span className="pd-review-rating">
                  {"★".repeat(r.rating)}
                </span>
              </div>
              <p className="pd-review-text">{r.text}</p>
              {r.media && (
                <img
                  src={r.media}
                  alt="Review media"
                  className="pd-review-media"
                />
              )}
            </div>
          ))}
        </div>

        {/* Add review form (local only, resets on refresh) */}
        <form className="pd-review-form" onSubmit={handleSubmitReview}>
          <h4>Add your review</h4>

          <div className="pd-review-grid">
            <div>
              <label className="label">Name</label>
              <input
                className="input"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <label className="label">Rating</label>
              <select
                className="input"
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview((p) => ({ ...p, rating: e.target.value }))
                }
              >
                <option value={5}>5 - Loved it</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Okay</option>
                <option value={2}>2 - Not great</option>
                <option value={1}>1 - Disappointed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Review</label>
            <textarea
              className="input"
              rows="3"
              value={newReview.text}
              onChange={(e) =>
                setNewReview((p) => ({ ...p, text: e.target.value }))
              }
              placeholder="Share about quality, packaging, gifting experience..."
              required
            />
          </div>

          <div>
            <label className="label">
              Photo / video (optional – only stored in this browser)
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
            />
            {newReview.mediaUrl && (
              <img
                src={newReview.mediaUrl}
                alt="Preview"
                className="pd-review-media-preview"
              />
            )}
          </div>

          <button
            type="submit"
            className="btn small"
            style={{ marginTop: 10 }}
          >
            Submit review
          </button>
        </form>
      </section>

      {/* RECOMMENDED PRODUCTS */}
      {recommended.length > 0 && (
        <section className="pd-recommended">
          <h3>You may also like</h3>
          <div className="pd-recommended-row">
            {recommended.map((p) => (
              <div
                key={p.id}
                className="pd-reco-card"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <div
                  className="pd-reco-thumb"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <div className="pd-reco-name">{p.name}</div>
                <div className="pd-reco-price">₹{p.price}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
