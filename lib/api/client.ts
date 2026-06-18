import { isAxiosError } from 'axios';

import { RegisterLoginData, User } from '@/types/user';
import { nextServer } from './api';
import { Category } from '@/types/category';
import { Ingredient } from '@/types/ingredient';
import { Recipe } from '@/types/recipe';

export type UserRegisterProps = {
  email: string;
  password: string;
  username: string;
};

type RegisterResponse = {
  newUser: User;
};

export const register = async (data: UserRegisterProps): Promise<RegisterResponse> => {
  const res = await nextServer.post('/api/auth/register', data);
  return res.data;
};

export const login = async (data: RegisterLoginData) => {
  const res = await nextServer.post<User>(`/api/auth/login`, data);
  return res.data;
};

export const refreshSession = async () => {
  const { data } = await nextServer.post('/api/auth/refresh');
  return data;
};

export const getUserById = async (userId: string) => {
  const { data } = await nextServer.get(`/api/user/${userId}`);
  return data.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/api/auth/logout');
};

interface GetCategoriesHttpResponse {
  data: Category[]; // Відповідь містить масив категорій у властивості data
}
// ==========================================================================================
// getCategories : виконує запит для отримання колекції категорій із сервера.
// ==========================================================================================
// Структура запиту :

export async function getCategories(): Promise<GetCategoriesHttpResponse> {
  // Виконуємо HTTP-запит
  const response = await nextServer.get<GetCategoriesHttpResponse>('/api/categories');
  console.log('Fetch - GET :');
  console.log('response.data', response.data);
  // console.log('totalPages', response.data.totalPages);

  // Повертаємо значення notes та totalPages відповіді
  return response.data;
}

// Типізація відповіді Get-запиту від Axios - згідно структури бекенда :
interface GetIngredientsHttpResponse {
  data: Ingredient[]; // Відповідь містить масив категорій у властивості data
}
// ==========================================================================================
// getIngredients : виконує запит для отримання колекції інгредієнтів із сервера.
// ==========================================================================================
// Структура запиту :

export async function getIngredients(): Promise<GetIngredientsHttpResponse> {
  // Виконуємо HTTP-запит
  const response = await nextServer.get<GetIngredientsHttpResponse>('/api/ingredients');
  console.log('Fetch - GET :');
  console.log('response.data', response.data);

  // Повертаємо значення data відповіді
  return response.data;
}

// Типізація відповіді Get-запиту від Axios - колекція рецептів - згідно структури бекенда :
interface GetRecipesHttpResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  data: Recipe[]; // Відповідь містить масив рецептів у властивості data
}

// Типізація відповіді Get-запиту від Axios - один рецепт за Id - згідно структури бекенда :
interface GetRecipeHttpResponse {
  data: Recipe; // Відповідь містить один рецепт у властивості data
}

export async function getRecipes(
  page: number = 1,
  perPage: number = 12,
  search?: string,
  category?: string,
  ingredients?: string
): Promise<GetRecipesHttpResponse> {
  // Параметри запиту
  const options = {
    params: {
      page,
      perPage,
      search,
      category,
      ingredients,
    },
  };
  // Виконуємо HTTP-запит
  const response = await nextServer.get<GetRecipesHttpResponse>('/api/recipes', options);

  // Повертаємо значення data відповіді
  return response.data;
  // return {
  //   page: response.page,
  //   perPage: response.perPage,
  //   totalItems: totalItems,
  //   totalPages: totalPages,
  //   data: response.data,
  // };
}

// ==========================================================================================
// getRecipeById : виконує запит для отримання рецепта за його ID.
// ==========================================================================================
// Структура запиту :

export async function getRecipeById(recipeId: string): Promise<GetRecipeHttpResponse> {
  // Виконуємо HTTP-запит
  const response = await nextServer.get<GetRecipeHttpResponse>(`/api/recipes/${recipeId}`);

  // Повертаємо значення data відповіді
  return response.data;
}

// ==========================================================================================
// getMyRecipes : власні рецепти користувача (приватний маршрут /api/recipes/my)
// ==========================================================================================
export async function getMyRecipes(
  page: number = 1,
  perPage: number = 12
): Promise<GetRecipesHttpResponse> {
  try {
    const response = await nextServer.get<GetRecipesHttpResponse>(`/api/recipes/my`, {
      params: { page, perPage },
    });
    return response.data;
  } catch (error) {
    // Бекенд повертає 404, якщо у користувача ще немає рецептів.
    // Трактуємо це як порожній список, а не як помилку.
    if (isAxiosError(error) && error.response?.status === 404) {
      return { page, perPage, totalItems: 0, totalPages: 0, data: [] };
    }
    throw error;
  }
}

// ==========================================================================================
// getFavoriteRecipes : улюблені рецепти користувача (приватний маршрут /api/recipes/favorites)
// ==========================================================================================
export async function getFavoriteRecipes(
  page: number = 1,
  perPage: number = 12
): Promise<GetRecipesHttpResponse> {
  try {
    const response = await nextServer.get<GetRecipesHttpResponse>('/api/recipes/favorites', {
      params: { page, perPage },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      return { page, perPage, totalItems: 0, totalPages: 0, data: [] };
    }
    throw error;
  }
}
