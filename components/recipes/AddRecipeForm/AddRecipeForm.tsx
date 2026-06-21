'use client';

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
} from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import styles from "./AddRecipeForm.module.css";
import { validationSchema } from "./validationSchema";

import type { RecipeFormValues, Ingredient } from "@/types/recipe";

import IngredientsBlock from "../IngredientsBlock/IngredientsBlock";
import ImageUpload from "../ImageUpload/ImageUpload";

import {
  createRecipeApi,
  getCategoriesApi,
  getIngredientsApi,
} from "@/lib/api/recipes";

type Category = {
  _id: string;
  name: string;
};

const initialValues: RecipeFormValues = {
  name: "",
  descr: "",
  cookingTime: "",
  cals: "",
  category: "",
  ingredients: [],
  instruction: "",
  recipeImg: null,
};

export default function AddRecipeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cats, ings] = await Promise.all([
          getCategoriesApi(),
          getIngredientsApi(),
        ]);

        setCategories(cats);
        setIngredients(ings);
      } catch {
        toast.error("Failed to load data");
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (
    values: RecipeFormValues,
    helpers: FormikHelpers<RecipeFormValues>
  ) => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("descr", values.descr);
      formData.append("cookingTime", String(values.cookingTime));
      formData.append("category", values.category);
      formData.append("instruction", values.instruction);

      if (values.cals) {
        formData.append("cals", String(values.cals));
      }

      formData.append("ingredients", JSON.stringify(values.ingredients));

      if (values.recipeImg) {
        formData.append("recipeImg", values.recipeImg);
      }

      const recipe = await createRecipeApi(formData);

      toast.success("Recipe published successfully");

      router.push(`/recipes/${recipe._id}`);
    } catch {
      toast.error("Failed to publish recipe");
    } finally {
      setIsLoading(false);
      helpers.setSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
  <h2>Add Recipe</h2>

   <Field name="name" className={styles.input} />
    <ErrorMessage name="name" component="p" />

   <Field as="textarea" name="descr" className={styles.textarea} />
  <ErrorMessage name="descr" component="p" />

  <Field type="number" name="cookingTime" />

 <Field type="number" name="cals" />

  <Field as="select" name="category">
 <option value="">Select category</option>
 {categories.map((c) => (
    <option key={c._id} value={c._id}> {c.name}
  </option>
  ))}
 </Field>
 <ImageUpload setFieldValue={setFieldValue} />

  <IngredientsBlock
  ingredients={ingredients}
  values={values}
  setFieldValue={setFieldValue}
  />

 <Field as="textarea" name="instruction" />

 <button type="submit" disabled={isLoading}>
   {isLoading ? "Publishing..." : "Publish Recipe"}
</button>
 </Form>
  )}
  </Formik>
    </div>
  );
}