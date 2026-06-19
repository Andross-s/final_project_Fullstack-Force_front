import { ProfileNavigation } from "@/components/profile/ProfileNavigation/ProfileNavigation";
import RecipesList from "@/components/recipes/RecipesList/RecipesList";
import { LoadMoreBtn } from "@/components/recipes/LoadMoreBtn/LoadMoreBtn";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

const recipes = [
  {
    _id: "1",
    title: "Test recipe",
    description: "Recipe description",
    time: 30,
    calories: 250,
    thumb: "/default-image-desktop.jpg",
  },
];

export default function ProfilePage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>My profile</h1>

      <ProfileNavigation />

      <RecipesList recipes={recipes} />

      <LoadMoreBtn onClick={() => {}} isLoading={false} />
    </main>
  );
}