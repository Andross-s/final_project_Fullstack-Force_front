'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ErrorMessage } from 'formik';

import styles from './ImageUpload.module.css';

interface Props {
  setFieldValue: (field: string, value: File | null) => void;
}

export default function ImageUpload({ setFieldValue }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFieldValue('recipeImg', file);

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const removeImage = () => {
    setFieldValue('recipeImg', null);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
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
      <p className={styles.label}>Upload Photo</p>

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
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7F7F7F"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
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