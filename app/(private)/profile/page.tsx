import ProfileNavigation from "@/components/profile/ProfileNavigation/ProfileNavigation";
import Filters from "@/components/recipes/Filters/Filters";
import RecipesList from "@/components/recipes/RecipesList/RecipesList";
import LoadMoreBtn from "@/components/recipes/LoadMoreBtn/LoadMoreBtn";
import styles from "./page.module.css";

const recipes = [
  {
    id: "1",
    title: "Test recipe",
    description: "Recipe description",
    time: "30 min",
    calories: 250,
    image: "/default-image-desktop.jpg",
  },
];

export default function ProfilePage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>My profile</h1>

      <ProfileNavigation />

      <Filters />

      <RecipesList recipes={recipes} />

      <LoadMoreBtn />
    </main>
  );
}