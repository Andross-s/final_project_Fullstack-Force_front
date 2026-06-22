'use client';

import styles from './GeneralInfo.module.css';

type GeneralInfoProps = {
  time?: number | string | null;
  calories?: number | null;
  category?: string | null;
};

export default function GeneralInfo({ time, calories, category }: GeneralInfoProps) {
  const formattedTime = time !== null && time !== undefined && time !== '' ? `${time} min` : '—';

  const formattedCalories = calories !== null && calories !== undefined ? `${calories} kcal` : '—';
  return (
    <div className={styles.meta}>
      <h3 className={styles.title}>General informations</h3>
      <span className={styles.stat}>
        <b className={styles.boldstat}>Category: </b>
        {category ?? '-'}
      </span>
      <span className={styles.stat}>
        <b className={styles.boldstat}>Cooking time: </b>
        {formattedTime}
      </span>

      <span className={styles.stat}>
        <b className={styles.boldstat}>Caloric content: </b>
        {formattedCalories}
      </span>
    </div>
  );
}
