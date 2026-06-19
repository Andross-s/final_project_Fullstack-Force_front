'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ErrorMessage } from 'formik';

interface Props {
  setFieldValue: (field: string, value: File | null) => void;
}

export default function ImageUpload({ setFieldValue }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) return;

    setFieldValue('recipeImg', file);

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const removeImage = () => {
    setFieldValue('recipeImg', null);
    setPreview(null);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div>
      <label>Recipe image</label>

      <input type="file" accept="image/*" onChange={handleChange} />

      <ErrorMessage name="recipeImg" component="p" />

      {preview && (
        <div>
          <Image src={preview} alt="preview" width={200} height={200} />
          <button type="button" onClick={removeImage}>
            Remove
          </button>
        </div>
      )}
    </div>
  );
}