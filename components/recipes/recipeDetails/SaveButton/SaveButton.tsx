"use client";

import { useAuthStore } from "@/stores/authStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import ModalNotAutor from "@/components/auth/ModalNotAutor";
import styles from "./SaveButton.module.css";

export default function SaveButton({ recipeId }) {
  const user = useAuthStore((state) => state.user);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);

  const fav = isFavorite(recipeId);

  const handleClick = () => {
    if (!user) {
      // открыть модалку
      document.body.classList.add("modal-open");
      return;
    }

    toggleFavorite(recipeId, user._id);
  };

  return (
    <>
      <button
        className={styles.button}
        onClick={handleClick}
        style={{
          color: fav ? "var(--light-brown)" : "#999",
          borderColor: fav ? "var(--light-brown)" : "var(--light-gray)",
        }}
      >
        ♥ Save
      </button>

      <ModalNotAutor />
    </>
  );
}
