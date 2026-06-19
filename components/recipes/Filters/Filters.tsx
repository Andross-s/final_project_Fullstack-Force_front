import styles from './Filters.module.css';

export default function Filters() {
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} placeholder="Search recipes" />
      <input className={styles.input} placeholder="Category" />
      <input className={styles.input} placeholder="Ingredient" />
    </div>
  );
}
