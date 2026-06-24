'use client';

import { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import styles from './SearchBox.module.css';

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  isLoading?: boolean;
};

export default function SearchBox({
  value,
  onChange,
  onSearch,
  isLoading = false,
}: SearchBoxProps) {
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setError('Please enter a recipe name');
      return;
    }

    if (trimmedValue.length < 2) {
      setError('Search query must contain at least 2 characters');
      return;
    }

    setError('');
    onSearch(trimmedValue);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          type="text"
          value={value}
          onChange={event => {
            onChange(event.target.value);
            if (error) setError('');
          }}
          placeholder="Search recipes"
        />

        <button className={styles.button} type="submit" disabled={isLoading}>
          {isLoading ? (
            <Oval height={20} width={20} strokeWidth={5} color="#fff" secondaryColor="#fff" />
          ) : (
            'Search'
          )}
        </button>
      </div>

      <p className={styles.error}>{error || '\u00A0'}</p>
    </form>
  );
}