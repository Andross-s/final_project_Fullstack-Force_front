import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipesList.module.css";

export default function RecipesList({ recipes }) {
  if (!recipes.length) {
    return <p className={styles.empty}>No recipes found</p>;
  }

  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => {
        const imageSrc =
          recipe.thumb ||
          recipe.image ||
          recipe.preview ||
          "https://res.cloudinary.com/dkiruwtcx/image/upload/q_auto/f_auto/v1781512091/Photo_dkn9mn.png";

        return (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            description={recipe.description}
            image={imageSrc}
            time={recipe.time}
            likes={recipe.likes}
          />
        );
      })}
    </div>
  );
}
