"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./IngredientsDropdown.module.css";

type Ingredient = {
  _id: string;
  name: string;
};

export default function IngredientsDropdown({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (val: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  //  Завантаження інгредієнтів з API
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/ingredients");
      const json = await res.json();
      setIngredients(json);
    };
    load();
  }, []);

  //  Закриття при кліку поза елементом
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedName =
    ingredients.find((i) => i._id === value)?.name || "Ingredient";

  return (
    <div className={styles.wrapper} ref={ref}>
      {/*  Кнопка відкриття */}
      <div className={styles.selectBtn} onClick={() => setOpen(!open)}>
        <span>{selectedName}</span>
        <span className={styles.arrow}>{open ? "▲" : "▼"}</span>
      </div>

      {/*  Список опцій */}
      {open && (
        <div className={styles.options}>
          <div
            className={styles.option}
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
          >
            All ingredients
          </div>

          {ingredients.map((ing) => (
            <div
              key={ing._id}
              className={styles.option}
              onClick={() => {
                onChange(ing._id);
                setOpen(false);
              }}
            >
              {ing.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
