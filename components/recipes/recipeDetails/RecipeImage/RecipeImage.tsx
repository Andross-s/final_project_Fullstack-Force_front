"use client";

import Image from "next/image";
import styles from "./RecipeImage.module.css";

type RecipeImageProps = {
  src: string;
  alt: string;
};

export default function RecipeImage({
  src,
  alt,
}: RecipeImageProps) {
  return (
    <div className={styles.wrapper}>
      <Image
        src={src}
        alt={alt}
        fill
        className={styles.image}
      />
    </div>
  );
}