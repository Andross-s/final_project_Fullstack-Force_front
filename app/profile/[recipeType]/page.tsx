'use client'

import { ProfileNavigation } from '@/components/profile/ProfileNavigation/ProfileNavigation';
import { RecipesList } from '@/components/recipes/RecipesList/RecipesList';
import { LoadMoreBtn } from '@/components/recipes/LoadMoreBtn/LoadMoreBtn';

import styles from './page.module.css'

const mockRecipes = [
  {
    _id: '1',
    name: 'Classic French Omelette',
    description: 'A soft, creamy classic with butter and eggs.',
    cookingTime: 15,
    calories: 340,
    recipeImage: 'https://picsum.photos/seed/1/300/200',
  },
  {
    _id: '2',
    name: 'Pasta Carbonara',
    description: 'A classic Italian dish with bacon, Parmesan cheese, and eggs.',
    cookingTime: 20,
    calories: 450,
    recipeImage: 'https://picsum.photos/seed/2/300/200',
  },
  {
    _id: '3',
    name: 'Beef Burger',
    description: 'Tasty beef patty in a bun with vegetables and sauce.',
    cookingTime: 25,
    calories: 550,
    recipeImage: 'https://picsum.photos/seed/3/300/200',
  },
  {
    _id: '4',
    name: 'Philadelphia Sushi Roll',
    description: 'A refreshing blend of sushi, seafood, and guacamole.',
    cookingTime: 30,
    calories: 300,
    recipeImage: 'https://picsum.photos/seed/4/300/200',
  },
  {
    _id: '5',
    name: 'Tom Yum Soup',
    description: 'Sizzling spicy, sour, and spicy soup.',
    cookingTime: 15,
    calories: 500,
    recipeImage: 'https://picsum.photos/seed/5/300/200',
  },
  {
    _id: '6',
    name: 'Omelette with Mushrooms',
    description: 'A delicious, filling omelette with mushrooms.',
    cookingTime: 10,
    calories: 150,
    recipeImage: 'https://picsum.photos/seed/6/300/200',
  },
  {
    _id: '7',
    name: 'Omelette with Goat Cheese',
    description: 'Cheesy, goat cheese, and fresh spinach.',
    cookingTime: 12,
    calories: 300,
    recipeImage: 'https://picsum.photos/seed/7/300/200',
  },
  {
    _id: '8',
    name: 'Omelette with Smoked Salmon',
    description: 'Tasty egg with smoked salmon and vegetables.',
    cookingTime: 10,
    calories: 180,
    recipeImage: 'https://picsum.photos/seed/8/300/200',
  },
  {
    _id: '9',
    name: 'Omelette with Ratatouille',
    description: 'Classic ratatouille with eggplant, tomatoes, and onions.',
    cookingTime: 15,
    calories: 180,
    recipeImage: 'https://picsum.photos/seed/9/300/200',
  },
  {
    _id: '10',
    name: 'Omelette with Vegetables',
    description: 'Powerful flavor of peppers, tomatoes, and onions.',
    cookingTime: 10,
    calories: 120,
    recipeImage: 'https://picsum.photos/seed/10/300/200',
  },
  {
    _id: '11',
    name: 'Classic Beef Steak',
    description: 'Juicy steak with herbs and garlic butter.',
    cookingTime: 20,
    calories: 600,
    recipeImage: 'https://picsum.photos/seed/11/300/200',
  },
  {
    _id: '12',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan and croutons.',
    cookingTime: 10,
    calories: 250,
    recipeImage: 'https://picsum.photos/seed/12/300/200',
  },
];

export default function ProfilePage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.profileTitle}>My profile</h1>

      <ProfileNavigation />

      <div className={styles.profileInfo}>
        <p className={styles.recipesCount}>
          {mockRecipes.length} recipes
        </p>
      </div>

      <div className={styles.profileRecipes}>
        <RecipesList recipes={mockRecipes} type="own" />

        <LoadMoreBtn
          onClick={() => {}}
          isLoading={false}
        />
      </div>
    </main>
  );
}