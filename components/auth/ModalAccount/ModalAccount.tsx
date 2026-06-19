"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import css from "./ModalAccount.module.css";

type Props = {
  onClose: () => void;
};

export default function ModalAccount({ onClose }: Props) {
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

        <h2 className={css.title}>Welcome to Tasteorama</h2>

        <p className={css.text}>
          Save your favorite recipes and create your own collections
        </p>

        <div className={css.actions}>
          <Link href="/auth/register" className={css.actionBtn} onClick={onClose}>
            Register
          </Link>

          <Link href="/auth/login" className={css.actionBtnSecondary} onClick={onClose}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
