'use client';

import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useFavoritesStore } from '@/stores/favoritesStore';
import { Oval } from 'react-loader-spinner';
import ModalNotAutor from '@/components/auth/ModalNotAutor/ModalNotAutor';
import Image from 'next/image';
import styles from './SaveButton.module.css';

type SaveButtonProps = {
  recipeId: string;
};

export default function SaveButton({ recipeId }: SaveButtonProps) {
  // Отримуємо дані користувача зі стору
  const user = useAuthStore(state => state.user);
  console.log(user);

  // Функція для перемикання "в обране"
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);

  // Перевірка, чи рецепт уже в обраному
  const isFavorite = useFavoritesStore(state => state.isFavorite);

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
          opacity: isProcessing ? 0.6 : 1, // Візуальний ефект блокування
          cursor: isProcessing ? 'not-allowed' : 'pointer',
        }}
      >
        {isProcessing ? (
          <Oval height={18} width={18} strokeWidth={5} color={fav ? '#fff' : '#050505'} />
        ) : (
          <>
            {fav ? 'Unsave' : 'Save'}
            <Image
              src={fav ? '/icons/bookmark-alternative-fill.svg' : '/icons/bookmark-alternative.svg'}
              alt="Bookmark"
              width={24}
              height={24}
            />
          </>
        )}
      </button>

      {/* Модалка для неавторизованих користувачів */}
      {showAuthModal && <ModalNotAutor onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
