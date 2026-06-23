import styles from './NoMatchFound.module.css';

type NoMatchFoundProps = {
  onReset: () => void;
};

export default function NoMatchFound({ onReset }: NoMatchFoundProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        We’re sorry! We were not able to find a match.
      </p>

      <button className={styles.button} type="button" onClick={onReset}>
        Reset search and filters
      </button>
    </div>
  );
}