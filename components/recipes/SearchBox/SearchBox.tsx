"use client";

import { useState } from "react";
import styles from "./SearchBox.module.css";

type SearchBoxProps = {
  onSearch: (value: string) => void;
};

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = searchQuery.trim();

    if (!trimmedValue) {
      setError("Please enter a recipe name");
      return;
    }

    if (trimmedValue.length < 2) {
      setError("Search query must contain at least 2 characters");
      return;
    }

    setError("");

    onSearch(trimmedValue);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
  <div className={styles.inputWrapper}>
    <input
      className={`${styles.input} ${error ? styles.inputError : ""}`}
      type="text"
      value={searchQuery}
      onChange={(event) => {
        setSearchQuery(event.target.value);

        if (error) {
          setError("");
        }
      }}
      placeholder="Search recipes"
    />

    <button className={styles.button} type="submit">
      Search
    </button>
  </div>

  <p className={styles.error}>
    {error || "\u00A0"}
  </p>
</form>
  );
}