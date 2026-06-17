"use client";

import { useEffect } from "react";
import css from "./SignOutModal.module.css";
import Image from "next/image";

type Props = {
  onClose: () => void;
};

export default function SignOutModal({
  onClose,
}: Props) {
    useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  document.addEventListener(
    "keydown",
    handleEsc
  );

  return () =>
    document.removeEventListener(
      "keydown",
      handleEsc
    );
    }, [onClose]);

    
    
  return (
    <div
      className={css.backdrop}
      onClick={onClose}
    >
      <div
        className={css.modal}
        onClick={(e) => e.stopPropagation()}
          >
              <button
          type="button"
          className={css.closeModalBtn}
          onClick={onClose}
        >
          <Image
            src="/icons/close_1.svg"
            alt="Close"
            width={12}
            height={12}
          />
        </button>

        <h2 className={css.title}>
          Are you sure?
        </h2>

        <p className={css.text}>
          We will miss you!
        </p>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelBtn}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className={css.logoutBtn}
            onClick={onClose}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}