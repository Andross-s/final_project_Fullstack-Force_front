import Link from "next/link";
import styles from "./ProfileNavigation.module.css";

export default function ProfileNavigation() {
  return (
    <nav className={styles.nav}>
      <Link href="/profile" className={styles.link}>
        My recipes
      </Link>

      <Link href="/profile?type=favorites" className={styles.link}>
        Saved recipes
      </Link>
    </nav>
  );
}