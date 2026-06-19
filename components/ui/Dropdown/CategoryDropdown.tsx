"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CategoryDropdown.module.css";

type Category = {
  _id: string;
  name: string;
};

export default function CategoryDropdown({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (val: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  //  Завантаження категорій з API
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/categories");
      const json = await res.json();
      setCategories(json);
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
    categories.find((c) => c._id === value)?.name || "Category";

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
            All categories
          </div>

          {categories.map((cat) => (
            <div
              key={cat._id}
              className={styles.option}
              onClick={() => {
                onChange(cat._id);
                setOpen(false);
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
