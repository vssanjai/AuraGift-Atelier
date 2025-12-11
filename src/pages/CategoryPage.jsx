// src/pages/CategoryPage.jsx
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import PRODUCTS from "../data/products";
import ProductCard from "../components/ProductCard";

const PAGE_LIMIT = 8;

export default function CategoryPage({ onAdd }) {
  const { slug } = useParams();
  const filteredAll = useMemo(() => PRODUCTS.filter((p) => p.category === slug), [slug]);
  const filtered = filteredAll.slice(0, PAGE_LIMIT);

  const pretty = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "Category";

  return (
<div className="container page-with-header" style={{ padding: "0 20px 28px" }}>
      <h2>{pretty}</h2>

      <p style={{ color: "#666" }}>
        Showing {filtered.length} of {filteredAll.length} product{filteredAll.length !== 1 ? "s" : ""}.
        {filteredAll.length > PAGE_LIMIT && <span> (Showing first {PAGE_LIMIT})</span>}
      </p>

      {filtered.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
    <div className="container page-with-header" style={{ padding: "0 20px 28px" }}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={() => onAdd?.(p)} />
          ))}
        </div>
      )}
    </div>
  );
}
