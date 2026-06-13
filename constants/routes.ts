export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  AUTH: "/auth",
  RECIPE: (id: string) => `/recipes/${id}`,
  PROFILE: "/profile",
  ADD_RECIPE: "/add-recipe",
} as const;
