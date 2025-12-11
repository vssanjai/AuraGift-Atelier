// src/pages/Landing.jsx
import React, { useMemo, useState } from "react";
import CategoryList from "../components/CategoryList";
import PRODUCTS from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Landing.css";

const PAGE_LIMIT = 8; // show up to 8 items per category view

export default function Landing({ onAdd }) {
  const byCat = useMemo(() => {
    return PRODUCTS.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});
  }, []);

  const categories = Object.keys(byCat).map((slug) => ({
    slug,
    label: slug.charAt(0).toUpperCase() + slug.slice(1),
    count: byCat[slug],
  }));

  /**
   * selected:
   * - "showAll"  => show all products (default)
   * - "<categorySlug>" => show that category
   */
  const [selected, setSelected] = useState("showAll");

  const filtered = useMemo(() => {
    if (selected === "showAll") {
      return PRODUCTS.slice(0, PAGE_LIMIT);
    }
    return PRODUCTS.filter((p) => p.category === selected).slice(
      0,
      PAGE_LIMIT
    );
  }, [selected]);

  const totalForSelected =
    selected === "showAll"
      ? PRODUCTS.length
      : byCat[selected] || 0;

  const headingText =
    selected === "showAll"
      ? "All Products"
      : categories.find((c) => c.slug === selected)?.label || "Products";

  return (
    <div
      className="landing-grid container page-with-header"
      style={{ display: "flex", gap: 24 }}
    >
      <CategoryList
        categories={categories}
        // when state is "showAll", tell CategoryList that active = "" (All)
        active={selected === "showAll" ? "" : selected}
        onSelect={(slug) => {
          if (slug === "") setSelected("showAll");
          else setSelected(slug);
        }}
      />

      <main style={{ flex: 1, padding: "20px 24px" }}>
        <h2 style={{ marginTop: 0 }}>{headingText}</h2>

        <p style={{ color: "#666", marginTop: 4 }}>
          Showing {filtered.length} of {totalForSelected} product
          {totalForSelected !== 1 ? "s" : ""}.
          {totalForSelected > PAGE_LIMIT && (
            <span> (Showing first {PAGE_LIMIT})</span>
          )}
        </p>

        <div className="product-grid" style={{ marginTop: 12 }}>
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={() => onAdd?.(p)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
