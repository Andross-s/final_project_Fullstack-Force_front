'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ErrorMessage } from 'formik';

import styles from './ImageUpload.module.css';

interface Props {
  setFieldValue: (
    field: string,
    value: File | null
  ) => void;
}

export default function ImageUpload({
  setFieldValue,
}: Props) {
  const [preview, setPreview] =
    useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0] ?? null;

    if (!file) return;

    setFieldValue('recipeImg', file);

    const imageUrl =
      URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  const removeImage = () => {
    setFieldValue('recipeImg', null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>
        Upload photo
      </p>

      <label className={styles.uploadArea}>
        {preview ? (
  <Image
 src={preview}
 alt="Recipe preview"
  fill
 className={styles.preview}
  />
 ) : (
 <div className={styles.placeholder}>
  <span
 className={
    styles.placeholderText
 }
 >
  Upload recipe photo
 </span>
  </div>
  )}
<input
 type="file"
 accept=".jpg,.jpeg,.png,.webp"
 onChange={handleChange}
 className={styles.input}
 />
 </label>

 <ErrorMessage
 name="recipeImg"
 component="p"
 className={styles.error}
      />

      {preview && (
        <button
  type="button"
  onClick={removeImage}
 className={styles.removeBtn}
 >
 Remove photo
 </button>
 )}
    </div>
  );
}