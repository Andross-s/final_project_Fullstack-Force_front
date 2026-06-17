import styles from "./GeneralInfo.module.css";

export default function GeneralInfo({ time, calories }) {
  return (
    <div className={styles.meta}>
      <span>⏱ {time} min</span>
      {calories && <span>🔥 {calories} kcal</span>}
    </div>
  );
}
