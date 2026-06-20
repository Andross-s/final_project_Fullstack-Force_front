"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import ModalNotAutor from "@/components/auth/ModalNotAutor/ModalNotAutor";
import styles from "./SaveButton.module.css";

type SaveButtonProps = {
  recipeId: string;
};

export default function SaveButton({ recipeId }: SaveButtonProps) {
  // Отримуємо дані користувача зі стору
  const user = useAuthStore((state) => state.user);

  // Функція для перемикання "в обране"
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  // Перевірка, чи рецепт уже в обраному
  const isFavorite = useFavoritesStore((state) => state.isFavorite);

  // Локальний стан для блокування кнопки під час запиту
  const [isProcessing, setIsProcessing] = useState(false);

  // ДОДАНО: локальний стан для модалки "потрібна авторизація"
  const [showAuthModal, setShowAuthModal] = useState(false);

  const fav = isFavorite(recipeId);

  const handleClick = async () => {
    // ФІКС: раніше тут був document.body.classList.add("modal-open"),
    // який нічого не показував (немає обробника цього класу). Тепер реально відкриваємо модалку.
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Захист від подвійного кліку
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      // ФІКС: toggleFavorite більше не приймає userId — бекенд визначає користувача по сесії
      await toggleFavorite(recipeId);

    } finally {
      // Повертаємо кнопку в нормальний стан
      setIsProcessing(false);
    }
  };

  return (
    <>
      <button
        className={styles.button}
        onClick={handleClick}
        disabled={isProcessing} // Блокуємо кнопку під час запиту
        style={{
          color: fav ? "var(--light-brown)" : "#999",
          borderColor: fav ? "var(--light-brown)" : "var(--light-gray)",
          opacity: isProcessing ? 0.6 : 1, // Візуальний ефект блокування
          cursor: isProcessing ? "not-allowed" : "pointer",
        }}
      >
        ♥ {fav ? "Saved" : "Save"}
      </button>

      {/* Модалка для неавторизованих користувачів */}
      {showAuthModal && (
        <ModalNotAutor onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}
