import styles from './NoRecipesYet.module.css';

type NoRecipesYetProps = {
  message?: string;
};

export function NoRecipesYet({ message = 'No recipes yet' }: NoRecipesYetProps) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default NoRecipesYet;