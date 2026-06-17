export type User = {
  _id: string;
  name: string;
  email: string;
  favorites: {
    _id: string;
    recipeId: string;
  }[];
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

export interface RegisterLoginData {
  email: string;
  password: string;
}
