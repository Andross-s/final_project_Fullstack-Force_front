"use client";

import styles from "./GeneralInfo.module.css";

type GeneralInfoProps = {
  time: number | string | null;
  calories?: number | null;
};

export default function GeneralInfo({ time, calories }: GeneralInfoProps) {
  const formattedTime =
    time !== null && time !== undefined && time !== ""
      ? `${time} min`
      : "—";

  const formattedCalories =
    calories !== null && calories !== undefined
      ? `${calories} kcal`
      : null;

  return (
    <div className={styles.meta}>
      <span>⏱ {formattedTime}</span>

      {formattedCalories && (
        <span>🔥 {formattedCalories}</span>
      )}
    </div>
  );
}
