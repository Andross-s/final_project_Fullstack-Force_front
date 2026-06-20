"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import css from "./ModalNotAutor.module.css";

type Props = {
  onClose: () => void;
};

// ФІКС: компонент раніше був заглушкою (`return null`) і нічого не показував.
// Тепер це робоча модалка "потрібна авторизація" для збереження рецепта в обране,
// за зразком ModalAccount.
export default function ModalNotAutor({ onClose }: Props) {
  // Закриття модалки по Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={css.closeModalBtn}
          onClick={onClose}
          aria-label="Close"
        >
          <Image src="/icons/close_1.svg" alt="Close" width={12} height={12} />
        </button>

        <h2 className={css.title}>Error while saving</h2>

        <p className={css.text}>
          To save this recipe, you need to authorize first
        </p>

        <div className={css.actions}>
          <Link href="/auth/login" className={css.actionBtnSecondary} onClick={onClose}>
            Log in
          </Link>

          <Link href="/auth/register" className={css.actionBtn} onClick={onClose}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
