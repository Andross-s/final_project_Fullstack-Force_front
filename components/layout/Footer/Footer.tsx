"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";
//import ModalNotAutor from "../../auth/ModalNotAutor/ModalNotAutor";

type Props = {
  isUserAuthorized: boolean;
};

export const Footer = ({ isUserAuthorized }: Props) => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAccountClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isUserAuthorized) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };
  return (
    <footer className={styles["footer-container"]}>
      <div className={styles["footer-content"]}>
        <Link href="/" className={styles["footer-logo"]}>
          <img src="/icons/logo.svg" alt="Tasteorama" className={styles["footer-logo-icon"]} />
          <span className={styles["brand-text"]}>Tasteorama</span>
        </Link>

        <div className={styles["footer-credits"]}>
          <div>© 2025 CookingCompanion</div>
        </div>

      <nav className={styles["footer-nav"]}>
          <Link className={styles["footer-nav-link"]} href="/recipes">
            Recipes
          </Link>

          {/*залежить від авторизації */}
          <Link 
            className={styles["footer-nav-link"]} 
            href="/profile"
            onClick={handleAccountClick}
          >
            Account
          </Link>
        </nav>
      </div>

      {/* рендер модалки */}
      {/* isModalOpen && <ModalNotAutor onClose={() => setIsModalOpen(false)} /> */}
    </footer>
  );
};