import AddRecipeForm from "@/components/recipes/AddRecipeForm/AddRecipeForm";
import styles from "./page.module.css";

export default function AddRecipePage() {
  return (
    <section className={styles.container}>
      <AddRecipeForm />
    </section>
  );
}