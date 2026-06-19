"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Categories</h1>

      <div className={styles.grid}>
        {categories.map((c: any) => (
          <Link
            key={c._id}
            href={`/categories/${c._id}`}
            className={styles.card}
          >
            <h3>{c.name}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
