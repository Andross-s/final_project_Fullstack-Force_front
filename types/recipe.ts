export interface Recipe {
  _id: string;
  title: string;
  category: string;
  owner: string;
  area: string;
  instructions: string;
  description: string;
  thumb: string;
  time: string;
  ingredients: {
    id: string;
    measure: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
