// src/components/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function ProductCard({ product, onAdd }) {
  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      {/* Clickable area = image + title/short, like Amazon */}
      <div onClick={openDetails} className="product-click">
        <div
          className="product-thumb"
          style={{ backgroundImage: `url(${product.image})` }}
          role="img"
          aria-label={product.name}
        />
        <div className="product-body">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-desc">{product.short}</p>
        </div>
      </div>

      {/* Footer with price + Add button */}
      <div className="product-footer">
        <div className="price">₹{product.price}</div>
        <button className="btn small" onClick={() => onAdd(product)}>
          Add
        </button>
      </div>
    </div>
  );
}
