"use client";

import Image from "next/image";
import styles from "./RecipeImage.module.css";

export default function RecipeImage({ src, alt }) {
  return (
    <div className={styles.wrapper}>
      <Image src={src} alt={alt} fill className={styles.image} />
    </div>
  );
}
