"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import { ErrorMessage } from "formik";

import styles from "./ImageUpload.module.css";

interface ImageUploadProps {
  setFieldValue: (
    field: string,
    value: File | null
  ) => void;
}

export default function ImageUpload({
  setFieldValue,
}: ImageUploadProps) {
  const [preview, setPreview] =
    useState<string | null>(
      null
    );

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setFieldValue(
      "recipeImg",
      file
    );

    const imageUrl =
      URL.createObjectURL(
        file
      );

    setPreview(imageUrl);
  };

  const removeImage = () => {
    setFieldValue(
      "recipeImg",
      null
    );

    setPreview(null);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(
          preview
        );
      }
    };
  }, [preview]);

  return (
    <div
      className={styles.wrapper}
    >
      <label
        className={
          styles.label
        }
      >
        Recipe image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={
          handleImageChange
        }
        className={
          styles.input
        }
      />

      <ErrorMessage
        name="recipeImg"
        component="p"
        className={
          styles.error
        }
      />

      {preview && (
        <div
          className={
            styles.previewWrapper
          }
        >
          <Image
            src={preview}
            alt="Recipe preview"
            fill
            className={
              styles.preview
            }
          />

          <button
            type="button"
            onClick={
              removeImage
            }
            className={
              styles.removeButton
            }
          >
            Remove image
          </button>
        </div>
      )}
    </div>
  );
}