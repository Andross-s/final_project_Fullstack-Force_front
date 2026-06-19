"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch("/api/ingredients")
      .then((r) => r.json())
      .then(setIngredients);
  }, []);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Ingredients</h1>

      <div className={styles.grid}>
        {ingredients.map((i: any) => (
          <Link
            key={i._id}
            href={`/ingredients/${i.name}`}
            className={styles.card}
          >
            <h3>{i.name}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
