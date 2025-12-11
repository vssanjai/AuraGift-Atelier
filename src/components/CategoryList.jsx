// src/components/CategoryList.jsx
import React from "react";
import "./CategoryList.css";

/**
 * props:
 *  - categories: array of { slug, label, count? }
 *  - active: current active slug (optional)
 *  - onSelect: fn(slug) called when clicked
 */
export default function CategoryList({ categories = [], active = "", onSelect = () => {} }) {
  return (
    <aside className="category-list" aria-label="Product categories">
      <h4 className="cat-title">Categories</h4>
      <ul>
        <li>
          <button
            className={`cat-btn ${active === "" ? "active" : ""}`}
            onClick={() => onSelect("")}
          >
            <span>All</span>
            <small className="count" />
          </button>
        </li>

        {categories.map((c) => (
          <li key={c.slug}>
            <button
              className={`cat-btn ${active === c.slug ? "active" : ""}`}
              onClick={() => onSelect(c.slug)}
            >
              <span>{c.label}</span>
              {typeof c.count === "number" && <small className="count"> {c.count}</small>}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
